"use client";

import { useEffect, useState } from "react";

type IntroStage = "idle" | "drop" | "unfold" | "done";

export default function FirstLoadIntro() {
  const [hasSeenIntro] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return localStorage.getItem("eclipse-intro-seen") === "1";
  });
  const [shouldPlay, setShouldPlay] = useState(!hasSeenIntro);
  const [stage, setStage] = useState<IntroStage>(hasSeenIntro ? "done" : "idle");
  const [showBackdrop, setShowBackdrop] = useState(hasSeenIntro);

  useEffect(() => {
    if (hasSeenIntro) {
      return;
    }

    const body = document.body;

    body.classList.add("intro-playing");

    const enterId = window.setTimeout(() => setStage("drop"), 30);
    const unfoldId = window.setTimeout(() => {
      setStage("unfold");
      setShowBackdrop(true);
    }, 1050);
    const doneId = window.setTimeout(() => {
      setStage("done");
      setShouldPlay(false);
      body.classList.remove("intro-playing");
      body.classList.add("intro-reveal");
      localStorage.setItem("eclipse-intro-seen", "1");
    }, 2350);
    const cleanupRevealId = window.setTimeout(() => {
      body.classList.remove("intro-reveal");
    }, 3150);

    return () => {
      body.classList.remove("intro-playing", "intro-reveal");
      window.clearTimeout(enterId);
      window.clearTimeout(unfoldId);
      window.clearTimeout(doneId);
      window.clearTimeout(cleanupRevealId);
    };
  }, [hasSeenIntro]);

  return (
    <>
      <div className={`paper-memory ${showBackdrop ? "visible" : ""}`} aria-hidden="true" />
      {shouldPlay ? (
        <div className={`intro-overlay stage-${stage}`} aria-hidden="true">
          <div className="paper-sheet" />
        </div>
      ) : null}
    </>
  );
}
