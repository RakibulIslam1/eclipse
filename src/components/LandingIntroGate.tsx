"use client";

import { useEffect, useRef, useState } from "react";

const INTRO_KEY = "eclipse-landing-intro-played";

export default function LandingIntroGate() {
  const [showIntro, setShowIntro] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [canSkip, setCanSkip] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const alreadyPlayed = sessionStorage.getItem(INTRO_KEY) === "1";
    if (alreadyPlayed) {
      document.body.classList.add("intro-done");
      return;
    }
    document.body.classList.add("intro-active");
    setShowIntro(true);
  }, []);

  useEffect(() => {
    if (!showIntro) return;
    const video = videoRef.current;
    let finishTimer: number | null = null;

    const finishIntro = () => {
      if (finishTimer !== null) window.clearTimeout(finishTimer);
      setIsFading(true);
      sessionStorage.setItem(INTRO_KEY, "1");
      window.setTimeout(() => {
        document.body.classList.remove("intro-active");
        document.body.classList.add("intro-done");
        setShowIntro(false);
      }, 520);
    };

    if (video) {
      const onEnded = () => finishIntro();
      const onError = () => finishIntro();
      const onCanPlayThrough = () => setCanSkip(true);
      video.addEventListener("ended", onEnded);
      video.addEventListener("error", onError);
      video.addEventListener("canplaythrough", onCanPlayThrough);
      video.play().catch(() => finishIntro());
      // Lower fallback timeout for faster skip if video fails
      finishTimer = window.setTimeout(() => {
        finishIntro();
      }, 9000);
      return () => {
        video.removeEventListener("ended", onEnded);
        video.removeEventListener("error", onError);
        video.removeEventListener("canplaythrough", onCanPlayThrough);
        if (finishTimer !== null) window.clearTimeout(finishTimer);
      };
    }
  }, [showIntro]);

  if (!showIntro) return null;
  return (
    <div className={`landing-intro${isFading ? " fade-out" : ""}`} aria-hidden="true">
      <video
        ref={videoRef}
        className="landing-intro-video"
        src="/intro/landing_vdo.mp4"
        muted
        playsInline
        autoPlay
        preload="auto"
        poster="/intro/landing_vdo_poster.jpg"
        onClick={() => canSkip && !isFading && setIsFading(true)}
      />
    </div>
  );
}
