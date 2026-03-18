"use client";

import { useEffect, useRef, useState } from "react";

const INTRO_START_OFFSET = 0.5;
const INTRO_PLAYBACK_RATE = 1.08;
const INTRO_MAX_WAIT_MS = 12000;

export default function FirstLoadIntro() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const finishedRef = useRef(false);
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

  const completeIntro = () => {
    if (finishedRef.current) {
      return;
    }

    finishedRef.current = true;
    setIsIntroPlaying(false);
    document.body.classList.remove("video-intro-playing");
    document.body.classList.add("video-intro-done");
  };

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

  useEffect(() => {
    if (!isIntroPlaying) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      completeIntro();
    }, INTRO_MAX_WAIT_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isIntroPlaying]);

  const freezeAtLastFrame = () => {
    const video = videoRef.current;

    if (!video || Number.isNaN(video.duration) || !Number.isFinite(video.duration)) {
      completeIntro();
      return;
    }

    const targetTime = Math.max(video.duration - 0.001, INTRO_START_OFFSET);
    const finalizeFreeze = () => {
      video.pause();
      video.removeEventListener("seeked", finalizeFreeze);
      completeIntro();
    };

    video.addEventListener("seeked", finalizeFreeze, { once: true });
    video.currentTime = targetTime;
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

    video.currentTime = Math.min(INTRO_START_OFFSET, Math.max(video.duration - 0.001, 0));
    video.playbackRate = INTRO_PLAYBACK_RATE;

    try {
      await video.play();
    } catch {
      completeIntro();
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
          onCanPlay={handleLoadedMetadata}
          onEnded={freezeAtLastFrame}
          onError={completeIntro}
        >
          <source src="/bg/bg_vdo.mp4" type="video/mp4" />
        </video>
        <div className="bg-video-mask" />
      </div>
    </>
  );
}
