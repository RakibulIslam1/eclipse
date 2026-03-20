"use client";

import { useEffect, useRef, useState } from "react";

const THEME_KEY = "eclipse-theme-mode";

export default function PullLightSwitch() {
  const [isDark, setIsDark] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const pullTimerRef = useRef<number | null>(null);

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
