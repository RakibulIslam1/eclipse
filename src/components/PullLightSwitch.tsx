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

    const radius = 220;
    const maxOffset = 16;
    let rafId: number | null = null;
    let latestX = 0;
    let latestY = 0;

    const applyOffset = (x: number, y: number) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + Math.min(rect.height * 0.68, 95);
      const dx = x - centerX;
      const dy = y - centerY;
      const distance = Math.hypot(dx, dy);

      if (distance >= radius) {
        button.style.setProperty("--follow-x", "0px");
        button.style.setProperty("--follow-y", "0px");
        button.classList.remove("is-following");
        return;
      }

      const proximity = (radius - distance) / radius;
      const tx = (dx / radius) * maxOffset * proximity;
      const ty = (dy / radius) * maxOffset * proximity;

      button.style.setProperty("--follow-x", `${tx.toFixed(2)}px`);
      button.style.setProperty("--follow-y", `${ty.toFixed(2)}px`);
      button.classList.add("is-following");
    };

    const flush = () => {
      rafId = null;
      applyOffset(latestX, latestY);
    };

    const onPointerMove = (event: PointerEvent) => {
      latestX = event.clientX;
      latestY = event.clientY;

      if (rafId === null) {
        rafId = window.requestAnimationFrame(flush);
      }
    };

    const clearOffset = () => {
      button.style.setProperty("--follow-x", "0px");
      button.style.setProperty("--follow-y", "0px");
      button.classList.remove("is-following");
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
