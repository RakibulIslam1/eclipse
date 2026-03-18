import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
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
  title: "Eclipse Academy",
  description: "Learning website with courses, mentors, team, and study room.",
  icons: {
    icon: "/brand/favicon.png?v=20260319",
    shortcut: "/brand/favicon.png?v=20260319",
    apple: "/brand/favicon.png?v=20260319",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} antialiased`}>
        <div className="bg-photo-layer" aria-hidden="true" />
        <div className="site-wrap">
          <header className="site-header">
            <nav className="top-nav">
              <Link href="/" className="brand" aria-label="Eclipse Academy home">
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
                <button type="button" className="profile-icon-btn" aria-label="Profile">
                  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M12 12.1a4.3 4.3 0 1 0-4.3-4.3 4.3 4.3 0 0 0 4.3 4.3Z" />
                    <path d="M4.5 20a7.5 7.5 0 0 1 15 0v.5h-15Z" />
                  </svg>
                </button>
                <Link href="/studyroom" className="studyroom-btn">
                  Study Room
                </Link>
              </div>
            </nav>
          </header>
          <main className="site-main">{children}</main>
        </div>
      </body>
    </html>
  );
}
