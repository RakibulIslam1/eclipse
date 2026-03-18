"use client";

import { useEffect, useState } from "react";

type IntroStage = "idle" | "drop" | "unfold" | "done";
const INTRO_KEY = "eclipse-intro-seen-v2";

const shouldForceIntro = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return new URLSearchParams(window.location.search).get("intro") === "1";
};

export default function FirstLoadIntro() {
  const [forceIntro] = useState(shouldForceIntro);
  const [hasSeenIntro] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    if (shouldForceIntro()) {
      return false;
    }

    return localStorage.getItem(INTRO_KEY) === "1";
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
      localStorage.setItem(INTRO_KEY, "1");

      if (forceIntro) {
        const url = new URL(window.location.href);
        url.searchParams.delete("intro");
        window.history.replaceState({}, "", url.pathname + url.search + url.hash);
      }
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
  }, [forceIntro, hasSeenIntro]);

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
