"use client";

import { useEffect } from "react";

const DESKTOP_SHELL_WIDTH = 1280;

export default function DesktopViewportScaler() {
  useEffect(() => {
    const root = document.documentElement;

    const syncDesktopScale = () => {
      const viewportWidth = Math.max(window.innerWidth, 1);
      const viewportHeight = Math.max(window.innerHeight, 1);
      const scale = Math.min(1, viewportWidth / DESKTOP_SHELL_WIDTH);
      const scaledHeight = viewportHeight / scale;

      root.style.setProperty("--desktop-scale", scale.toFixed(5));
      root.style.setProperty("--desktop-shell-width", `${DESKTOP_SHELL_WIDTH}px`);
      root.style.setProperty("--desktop-shell-height", `${scaledHeight.toFixed(2)}px`);
    };

    syncDesktopScale();
    window.addEventListener("resize", syncDesktopScale);
    window.addEventListener("orientationchange", syncDesktopScale);

    return () => {
      window.removeEventListener("resize", syncDesktopScale);
      window.removeEventListener("orientationchange", syncDesktopScale);
      root.style.removeProperty("--desktop-scale");
      root.style.removeProperty("--desktop-shell-width");
      root.style.removeProperty("--desktop-shell-height");
    };
  }, []);

  return null;
}