"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

function shouldRunIntroOnEntry(isHomePath: boolean) {
  if (!isHomePath) return false;
  const navigationEntry = performance.getEntriesByType("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined;
  const navigationType = navigationEntry?.type;
  if (navigationType === "reload") return true;
  if (navigationType === "navigate") {
    if (!document.referrer) return true;
    try {
      return new URL(document.referrer).origin !== window.location.origin;
    } catch {
      return true;
    }
  }
  return false;
}

export default function LandingIntroGate() {
  const pathname = usePathname();
  const hasInitialized = useRef(false);
  const hasFinished = useRef(false);
  const [showIntro, setShowIntro] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;
    const isHomePath = pathname === "/";
    const shouldShowIntro = shouldRunIntroOnEntry(isHomePath);
    if (!shouldShowIntro) {
      document.body.classList.remove("intro-active", "intro-will-run");
      document.body.classList.add("intro-done", "navbar-animate");
      return;
    }
    document.body.classList.add("intro-active", "intro-will-run");
    document.body.classList.remove("navbar-animate");
    setShowIntro(true);
  }, [pathname]);

  useEffect(() => {
    if (!showIntro) return;
    const video = videoRef.current;
    let finishTimer: number | null = null;

    const finishIntro = () => {
      if (hasFinished.current) return;
      hasFinished.current = true;
      if (finishTimer !== null) window.clearTimeout(finishTimer);
      setIsFading(true);
      window.setTimeout(() => {
        document.body.classList.remove("intro-active", "intro-will-run");
        document.body.classList.add("intro-done", "navbar-animate");
        setShowIntro(false);
      }, 520);
    };

    if (video) {
      const onEnded = () => finishIntro();
      const onError = () => finishIntro();
      video.addEventListener("ended", onEnded);
      video.addEventListener("error", onError);
      video.play().catch(() => finishIntro());
      finishTimer = window.setTimeout(() => {
        finishIntro();
      }, 18000);
      return () => {
        video.removeEventListener("ended", onEnded);
        video.removeEventListener("error", onError);
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
        src="/intro/intro.mp4"
        muted
        playsInline
        autoPlay
        preload="auto"
        poster="/intro/landing_vdo_poster.jpg"
      />
    </div>
  );
}
