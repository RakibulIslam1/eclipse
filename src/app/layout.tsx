import type { Metadata } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

const headingFont = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const bodyFont = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Eclipse Academy",
  description: "Learning website with courses, mentors, team, and study room.",
  icons: {
    icon: "/brand/favicon.png",
    shortcut: "/brand/favicon.png",
    apple: "/brand/favicon.png",
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
                  width={248}
                  height={62}
                  className="brand-logo"
                  priority
                />
              </Link>
              <div className="nav-links nav-links-center">
                <Link href="/courses">Courses</Link>
                <Link href="/mentors">Mentors</Link>
                <Link href="/team">Team</Link>
              </div>
              <div className="nav-links nav-links-right">
                <Link href="/studyroom">Study Room</Link>
              </div>
            </nav>
          </header>
          <main className="site-main">{children}</main>
        </div>
      </body>
    </html>
  );
}
