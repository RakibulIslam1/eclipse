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

    const radius = 320;
    const maxOffset = 24;
    let rafId: number | null = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isPointerActive = false;

    const computeTarget = (x: number, y: number) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + Math.min(rect.height * 0.68, 95);
      const dx = x - centerX;
      const dy = y - centerY;
      const distance = Math.hypot(dx, dy);

      if (distance >= radius) {
        targetX = 0;
        targetY = 0;
        isPointerActive = false;
        return;
      }

      const proximity = (radius - distance) / radius;
      targetX = (dx / radius) * maxOffset * proximity;
      targetY = (dy / radius) * maxOffset * proximity;
      isPointerActive = true;
    };

    const animateToTarget = () => {
      const smoothFactor = 0.16;
      currentX += (targetX - currentX) * smoothFactor;
      currentY += (targetY - currentY) * smoothFactor;

      button.style.setProperty("--follow-x", `${currentX.toFixed(2)}px`);
      button.style.setProperty("--follow-y", `${currentY.toFixed(2)}px`);
      button.classList.toggle("is-following", isPointerActive || Math.hypot(currentX, currentY) > 0.4);

      const remaining = Math.hypot(targetX - currentX, targetY - currentY);
      if (remaining > 0.04 || Math.hypot(currentX, currentY) > 0.04) {
        rafId = window.requestAnimationFrame(animateToTarget);
      } else {
        currentX = targetX;
        currentY = targetY;
        button.style.setProperty("--follow-x", `${currentX.toFixed(2)}px`);
        button.style.setProperty("--follow-y", `${currentY.toFixed(2)}px`);
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
      targetX = 0;
      targetY = 0;
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
