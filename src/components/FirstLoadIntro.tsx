"use client";

import { useEffect, useRef, useState } from "react";

export default function FirstLoadIntro() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isIntroPlaying, setIsIntroPlaying] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const isHome = window.location.pathname === "/";
    const navEntry = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    const isHardLoad = navEntry?.type === "reload" || navEntry?.type === "navigate";

    return isHome && isHardLoad;
  });

  useEffect(() => {
    const body = document.body;

    if (isIntroPlaying) {
      body.classList.add("video-intro-playing");
      body.classList.remove("video-intro-done");
    } else {
      body.classList.add("video-intro-done");
      body.classList.remove("video-intro-playing");
    }

    return () => {
      body.classList.remove("video-intro-playing", "video-intro-done");
    };
  }, [isIntroPlaying]);

  const freezeAtLastFrame = () => {
    const video = videoRef.current;

    if (!video || Number.isNaN(video.duration) || !Number.isFinite(video.duration)) {
      return;
    }

    video.currentTime = Math.max(video.duration - 0.04, 0);
    video.pause();
    setIsIntroPlaying(false);
    document.body.classList.remove("video-intro-playing");
    document.body.classList.add("video-intro-done");
  };

  const handleLoadedMetadata = async () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (!isIntroPlaying) {
      freezeAtLastFrame();
      return;
    }

    video.currentTime = 0;

    try {
      await video.play();
    } catch {
      freezeAtLastFrame();
    }
  };

  return (
    <>
      <div className="bg-video-layer" aria-hidden="true">
        <video
          ref={videoRef}
          className="bg-video"
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={freezeAtLastFrame}
        >
          <source src="/bg/bg_vdo.mp4" type="video/mp4" />
        </video>
        <div className="bg-video-mask" />
      </div>
    </>
  );
}
