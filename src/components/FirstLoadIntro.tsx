"use client";

import { useEffect, useState } from "react";

type IntroStage = "idle" | "drop" | "unfold" | "done";

export default function FirstLoadIntro() {
  const [shouldPlay, setShouldPlay] = useState(false);
  const [stage, setStage] = useState<IntroStage>("idle");
  const [showBackdrop, setShowBackdrop] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const forceIntro = params.get("intro") === "1";
    const isHome = window.location.pathname === "/";

    if (!isHome) {
      return;
    }

    const navEntry = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    const isReloadOnHome = navEntry?.type === "reload";

    // Auto intro only when the browser actually reloads on home.
    if (!forceIntro && !isReloadOnHome) {
      return;
    }

    const body = document.body;

    const bootId = window.setTimeout(() => {
      body.classList.add("intro-playing");
      setShouldPlay(true);
      setStage("idle");
    }, 0);
    const enterId = window.setTimeout(() => setStage("drop"), 70);
    const unfoldId = window.setTimeout(() => {
      setStage("unfold");
      setShowBackdrop(true);
    }, 1130);
    const doneId = window.setTimeout(() => {
      setStage("done");
      setShouldPlay(false);
      body.classList.remove("intro-playing");
      body.classList.add("intro-reveal");

      if (forceIntro) {
        const url = new URL(window.location.href);
        url.searchParams.delete("intro");
        window.history.replaceState({}, "", url.pathname + url.search + url.hash);
      }
    }, 2600);
    const cleanupRevealId = window.setTimeout(() => {
      body.classList.remove("intro-reveal");
    }, 3400);

    return () => {
      body.classList.remove("intro-playing", "intro-reveal");
      window.clearTimeout(bootId);
      window.clearTimeout(enterId);
      window.clearTimeout(unfoldId);
      window.clearTimeout(doneId);
      window.clearTimeout(cleanupRevealId);
    };
  }, []);

  return (
    <>
      <div className={`paper-memory ${showBackdrop ? "visible" : ""}`} aria-hidden="true" />
      {shouldPlay ? (
        <div className={`intro-overlay stage-${stage}`} aria-hidden="true">
          <div className="paper-bundle">
            <span className="ribbon ribbon-x" />
            <span className="ribbon ribbon-y" />
            <span className="fold fold-top" />
            <span className="fold fold-bottom" />
            <span className="fold fold-left" />
            <span className="fold fold-right" />
            <span className="seam seam-x" />
            <span className="seam seam-y" />
            <div className="paper-core" />
          </div>
        </div>
      ) : null}
    </>
  );
}
