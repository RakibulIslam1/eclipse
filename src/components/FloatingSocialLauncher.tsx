"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const MOBILE_BREAKPOINT = 720;
const HOME_SCROLL_TRIGGER = 140;

const SOCIAL_LINKS = {
  whatsapp: "#",
  facebook: "#",
  instagram: "#",
};

function getCanShowOnRoute(pathname: string, isMobile: boolean, y: number, maxScroll: number) {
  if (isMobile) {
    return true;
  }

  if (pathname !== "/") {
    return true;
  }

  if (maxScroll <= 20) {
    return true;
  }

  return y > HOME_SCROLL_TRIGGER;
}

export default function FloatingSocialLauncher() {
  const pathname = usePathname();
  const launcherRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [canHoverExpand, setCanHoverExpand] = useState(false);
  const [isIntroBlocking, setIsIntroBlocking] = useState(true);
  const [isVisibleByScroll, setIsVisibleByScroll] = useState(false);

  useEffect(() => {
    const evaluateViewport = () => {
      const mobile = window.innerWidth <= MOBILE_BREAKPOINT;
      const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

      setIsMobile((prev) => (prev !== mobile ? mobile : prev));
      setCanHoverExpand((prev) => (prev !== canHover ? canHover : prev));
    };

    const evaluateVisibility = () => {
      const mobile = window.innerWidth <= MOBILE_BREAKPOINT;
      const maxScroll =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const canShow = getCanShowOnRoute(pathname, mobile, window.scrollY, maxScroll);

      setIsVisibleByScroll((prev) => (prev !== canShow ? canShow : prev));
    };

    const onScroll = () => {
      if (rafRef.current !== null) {
        return;
      }

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        evaluateVisibility();
      });
    };

    evaluateViewport();
    evaluateVisibility();
    window.addEventListener("resize", evaluateViewport);
    window.addEventListener("resize", evaluateVisibility);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener("resize", evaluateViewport);
      window.removeEventListener("resize", evaluateVisibility);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    const checkIntroClasses = () => {
      const root = document.documentElement;
      const body = document.body;
      const blocked =
        root.classList.contains("intro-pending") ||
        body.classList.contains("intro-active") ||
        body.classList.contains("intro-will-run");

      setIsIntroBlocking(blocked);
    };

    checkIntroClasses();

    const observer = new MutationObserver(checkIntroClasses);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setIsExpanded(false);
  }, [pathname]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!launcherRef.current) {
        return;
      }

      if (!launcherRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("keydown", handleEscape);

    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const isVisible = !isIntroBlocking && isVisibleByScroll;

  const openOnHover = () => {
    if (!canHoverExpand) {
      return;
    }

    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsExpanded(true);
  };

  const closeOnHoverLeave = () => {
    if (!canHoverExpand) {
      return;
    }

    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = window.setTimeout(() => {
      setIsExpanded(false);
      closeTimerRef.current = null;
    }, 120);
  };

  return (
    <div
      ref={launcherRef}
      className={`social-launcher${isExpanded ? " is-expanded" : ""}${isVisible ? " is-visible" : ""}${
        isMobile ? " is-mobile" : ""
      }`}
      onMouseEnter={openOnHover}
      onMouseLeave={closeOnHoverLeave}
    >
      <div className="social-stack" aria-label="Social links">
        <a
          href={SOCIAL_LINKS.whatsapp}
          className="social-fab social-whatsapp"
          target="_blank"
          rel="noreferrer"
          aria-label="Open WhatsApp"
          title="WhatsApp"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.52 3.48A11.86 11.86 0 0 0 12.02 0C5.5 0 .2 5.3.2 11.82c0 2.09.55 4.13 1.58 5.93L0 24l6.43-1.68a11.85 11.85 0 0 0 5.59 1.43h.01c6.52 0 11.82-5.3 11.82-11.82a11.72 11.72 0 0 0-3.33-8.45ZM12.03 21.7a9.83 9.83 0 0 1-5.01-1.37l-.36-.21-3.82 1 1.02-3.72-.24-.38a9.82 9.82 0 0 1-1.51-5.2c0-5.41 4.4-9.82 9.82-9.82a9.75 9.75 0 0 1 6.96 2.88 9.75 9.75 0 0 1 2.87 6.95c0 5.41-4.41 9.82-9.83 9.82Zm5.39-7.34c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.94 1.15-.17.2-.35.22-.65.08-.3-.15-1.25-.46-2.38-1.46a8.82 8.82 0 0 1-1.65-2.05c-.18-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.57-.49-.5-.66-.5h-.57c-.2 0-.52.08-.8.38-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.08 4.48.7.3 1.25.48 1.68.62.7.22 1.33.19 1.83.12.56-.08 1.75-.72 2-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.56-.34Z" />
          </svg>
        </a>
        <a
          href={SOCIAL_LINKS.facebook}
          className="social-fab social-facebook"
          target="_blank"
          rel="noreferrer"
          aria-label="Open Facebook"
          title="Facebook"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.03 4.39 11.03 10.13 11.93v-8.43H7.08v-3.5h3.05V9.41c0-3.03 1.79-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.26h3.32l-.53 3.5h-2.79V24C19.61 23.1 24 18.1 24 12.07Z" />
          </svg>
        </a>
        <a
          href={SOCIAL_LINKS.instagram}
          className="social-fab social-instagram"
          target="_blank"
          rel="noreferrer"
          aria-label="Open Instagram"
          title="Instagram"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm9.13 1.5a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 6.86a5.14 5.14 0 1 1 0 10.28 5.14 5.14 0 0 1 0-10.28Zm0 1.8a3.34 3.34 0 1 0 0 6.68 3.34 3.34 0 0 0 0-6.68Z" />
          </svg>
        </a>
      </div>

      <button
        type="button"
        className="social-main-btn"
        aria-expanded={isExpanded}
        aria-label="Toggle social links"
        title="Message us"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6 2 10.94c0 2.56 1.2 4.87 3.13 6.5V22l4.28-2.36c.83.22 1.7.34 2.59.34 5.52 0 10-4 10-8.94C22 6 17.52 2 12 2Zm-.15 11.24H8.22a.88.88 0 0 1 0-1.76h3.63a.88.88 0 0 1 0 1.76Zm3.93-3.58H8.22a.88.88 0 0 1 0-1.76h7.56a.88.88 0 0 1 0 1.76Z" />
        </svg>
      </button>
    </div>
  );
}