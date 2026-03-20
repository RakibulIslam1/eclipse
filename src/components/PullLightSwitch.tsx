"use client";

import { useEffect, useRef, useState } from "react";

const THEME_KEY = "eclipse-theme-mode";

export default function PullLightSwitch() {
  const [isDark, setIsDark] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const pullTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const button = buttonRef.current;

    if (!button) {
      return;
    }

    const OVERLAP_PX = 18;
    let headerEl: HTMLElement | null = null;
    let resizeObserver: ResizeObserver | null = null;

    const syncAnchorToNavbar = () => {
      headerEl = document.querySelector(".site-header") as HTMLElement | null;

      if (!headerEl) {
        return;
      }

      const headerBottom = headerEl.getBoundingClientRect().bottom;
      const switchTop = Math.max(0, Math.round(headerBottom - OVERLAP_PX));
      button.style.setProperty("--switch-top", `${switchTop}px`);
    };

    syncAnchorToNavbar();
    headerEl = document.querySelector(".site-header") as HTMLElement | null;
    if (headerEl) {
      resizeObserver = new ResizeObserver(syncAnchorToNavbar);
      resizeObserver.observe(headerEl);
    }

    window.addEventListener("scroll", syncAnchorToNavbar, { passive: true });
    window.addEventListener("resize", syncAnchorToNavbar);
    window.addEventListener("orientationchange", syncAnchorToNavbar);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", syncAnchorToNavbar);
      window.removeEventListener("resize", syncAnchorToNavbar);
      window.removeEventListener("orientationchange", syncAnchorToNavbar);
    };
  }, []);

  useEffect(() => {
    const button = buttonRef.current;

    if (!button) {
      return;
    }

    const radius = 250;
    const maxTilt = 6;
    let rafId: number | null = null;
    let targetTilt = 0;
    let targetWave = 0;
    let currentTilt = 0;
    let currentWave = 0;
    let isPointerActive = false;

    const computeTarget = (x: number, y: number) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + Math.min(rect.height * 0.68, 95);
      const dx = x - centerX;
      const dy = y - centerY;
      const distance = Math.hypot(dx, dy);

      if (distance >= radius) {
        targetTilt = 0;
        targetWave = 0;
        isPointerActive = false;
        return;
      }

      const proximity = (radius - distance) / radius;
      targetTilt = (dx / radius) * maxTilt * proximity;
      targetWave = Math.max(0, proximity * 1.1);
      isPointerActive = true;
    };

    const animateToTarget = () => {
      const smoothFactor = 0.14;
      currentTilt += (targetTilt - currentTilt) * smoothFactor;
      currentWave += (targetWave - currentWave) * smoothFactor;

      button.style.setProperty("--cursor-tilt", `${currentTilt.toFixed(3)}deg`);
      button.style.setProperty("--cursor-wave", `${currentWave.toFixed(3)}`);
      button.classList.toggle("is-following", isPointerActive || Math.abs(currentTilt) > 0.08 || currentWave > 0.08);

      const remaining = Math.abs(targetTilt - currentTilt) + Math.abs(targetWave - currentWave);
      if (remaining > 0.01 || Math.abs(currentTilt) > 0.01 || currentWave > 0.01) {
        rafId = window.requestAnimationFrame(animateToTarget);
      } else {
        currentTilt = targetTilt;
        currentWave = targetWave;
        button.style.setProperty("--cursor-tilt", `${currentTilt.toFixed(3)}deg`);
        button.style.setProperty("--cursor-wave", `${currentWave.toFixed(3)}`);
        rafId = null;
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      computeTarget(event.clientX, event.clientY);

      if (rafId === null) {
        rafId = window.requestAnimationFrame(animateToTarget);
      }
    };

    const clearOffset = () => {
      targetTilt = 0;
      targetWave = 0;
      isPointerActive = false;

      if (rafId === null) {
        rafId = window.requestAnimationFrame(animateToTarget);
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", clearOffset);

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", clearOffset);
      clearOffset();
    };
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY);
    const prefersDark = stored === "dark";

    document.body.classList.toggle("theme-dark", prefersDark);
    setIsDark(prefersDark);

    return () => {
      if (pullTimerRef.current !== null) {
        window.clearTimeout(pullTimerRef.current);
      }
    };
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    document.body.classList.toggle("theme-dark", nextDark);
    localStorage.setItem(THEME_KEY, nextDark ? "dark" : "light");

    setIsPulling(true);
    if (pullTimerRef.current !== null) {
      window.clearTimeout(pullTimerRef.current);
    }
    pullTimerRef.current = window.setTimeout(() => {
      setIsPulling(false);
    }, 260);
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      className={`pull-switch${isDark ? " dark" : ""}${isPulling ? " is-pulling" : ""}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      onClick={toggleTheme}
      title={isDark ? "Pull to switch light mode" : "Pull to switch dark mode"}
    >
      <span className="pull-switch-body" aria-hidden="true">
        <span className="pull-switch-cord" />
        <span className="pull-switch-handle" />
        <span className="pull-switch-glow" />
      </span>
    </button>
  );
}
