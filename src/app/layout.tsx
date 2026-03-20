import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import LandingIntroGate from "@/components/LandingIntroGate";
import PullLightSwitch from "@/components/PullLightSwitch";
import "./globals.css";

const headingFont = Poppins({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const bodyFont = Poppins({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Eclipse Learners",
  description: "Learning website with courses, mentors, team, and study room.",
  icons: {
    icon: "/brand/favicon.png?v=20260319-1",
    shortcut: "/brand/favicon.png?v=20260319-1",
    apple: "/brand/favicon.png?v=20260319-1",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script id="intro-preload-state" strategy="beforeInteractive">
          {`
            (function () {
              try {
                var isHome = window.location.pathname === "/";
                if (!isHome) return;
                var nav = performance.getEntriesByType("navigation")[0];
                var navType = nav && nav.type;
                var shouldRun = false;
                if (navType === "reload") {
                  shouldRun = true;
                } else if (navType === "navigate") {
                  if (!document.referrer) {
                    shouldRun = true;
                  } else {
                    try {
                      shouldRun = new URL(document.referrer).origin !== window.location.origin;
                    } catch (error) {
                      shouldRun = true;
                    }
                  }
                }
                if (shouldRun) {
                  document.documentElement.classList.add("intro-pending");
                }
              } catch (error) {
                document.documentElement.classList.remove("intro-pending");
              }
            })();
          `}
        </Script>
      </head>
      <body className={`${headingFont.variable} ${bodyFont.variable} antialiased`}>
        <LandingIntroGate />
        <div className="bg-photo-layer" aria-hidden="true" />
        <PullLightSwitch />
        <div className="site-wrap">
          <header className="site-header">
            <nav className="top-nav">
              <Link href="/" className="brand" aria-label="Eclipse Learners home">
                <Image
                  src="/brand/navbar_logo.png"
                  alt="Eclipse"
                  width={360}
                  height={90}
                  className="brand-logo"
                  priority
                />
              </Link>
              <div className="nav-links nav-links-center">
                <Link href="/courses">Courses</Link>
                <Link href="/mentors">Mentors</Link>
                <Link href="/team">About Us</Link>
              </div>
              <div className="nav-links nav-links-right">
                <Link href="/studyroom" className="studyroom-btn">
                  Study Room
                </Link>
                <button type="button" className="profile-icon-btn" aria-label="Profile">
                  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M12 12.1a4.3 4.3 0 1 0-4.3-4.3 4.3 4.3 0 0 0 4.3 4.3Z" />
                    <path d="M4.5 20a7.5 7.5 0 0 1 15 0v.5h-15Z" />
                  </svg>
                </button>
              </div>
            </nav>
          </header>
          <main className="site-main">{children}</main>
        </div>
      </body>
    </html>
  );
}
