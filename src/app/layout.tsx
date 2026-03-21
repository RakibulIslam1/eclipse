import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import darkModeLogo from "../../contents/images/eclipse_logo_drk-mode-01.png";
import DesktopViewportScaler from "@/components/DesktopViewportScaler";
import LandingIntroGate from "@/components/LandingIntroGate";
import PullLightSwitch from "@/components/PullLightSwitch";
import TopNavLinks from "@/components/TopNavLinks";
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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function () {
              try {
                var root = document.documentElement;
                var isHome = window.location.pathname === "/";
                var nav = performance.getEntriesByType("navigation")[0];
                var navType = nav && nav.type;
                var shouldRun = false;

                if (isHome) {
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
                }

                if (shouldRun) {
                  root.classList.add("intro-pending");
                } else {
                  root.classList.add("app-shell-ready");
                }
              } catch (error) {
                document.documentElement.classList.add("app-shell-ready");
              }
            })();`,
          }}
        />
      </head>
      <body className={`${headingFont.variable} ${bodyFont.variable} antialiased`}>
        <DesktopViewportScaler />
        <LandingIntroGate />
        <PullLightSwitch />
        <div className="desktop-stage">
          <div className="desktop-shell">
            <div className="bg-photo-layer" aria-hidden="true" />
            <div className="site-wrap">
              <header className="site-header">
                <nav className="top-nav">
                  <Link href="/" className="brand" aria-label="Eclipse Learners home">
                    <Image
                      src="/brand/navbar_logo.png"
                      alt="Eclipse"
                      width={360}
                      height={90}
                      className="brand-logo brand-logo-light"
                      priority
                    />
                    <Image
                      src={darkModeLogo}
                      alt="Eclipse"
                      width={360}
                      height={90}
                      className="brand-logo brand-logo-dark"
                      priority
                    />
                  </Link>
                  <TopNavLinks />
                </nav>
              </header>
              <main className="site-main">{children}</main>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
