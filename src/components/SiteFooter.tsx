"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import darkModeLogo from "../../contents/images/eclipse_logo_drk-mode-01.png";

export default function SiteFooter() {
  const footerRef = useRef<HTMLElement | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const footerEl = footerRef.current;

    if (!footerEl) {
      return;
    }

    let wasVisible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !wasVisible) {
          wasVisible = true;
          setIsTyping(false);
          window.requestAnimationFrame(() => {
            setIsTyping(true);
          });
        } else if (!entry.isIntersecting) {
          wasVisible = false;
          setIsTyping(false);
        }
      },
      {
        threshold: 0.45,
      }
    );

    observer.observe(footerEl);
    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} className="site-footer" aria-label="Site footer">
      <div className="site-footer-inner">
        <div className="site-footer-grid">
          <section className="site-footer-block site-footer-brand-block">
            <div className="site-footer-brand" aria-label="Eclipse Learners">
              <Image
                src="/brand/navbar_logo.png"
                alt="Eclipse"
                width={360}
                height={90}
                className="site-footer-nav-logo site-footer-nav-logo-light"
              />
              <Image
                src={darkModeLogo}
                alt="Eclipse"
                width={360}
                height={90}
                className="site-footer-nav-logo site-footer-nav-logo-dark"
              />
            </div>
            <p
              className={`site-footer-tagline${isTyping ? " is-typing" : ""}`}
              aria-label="Master the Test, Eclipse the Rest"
            >
              <span className="site-footer-tagline-line site-footer-tagline-line-1">Master the Test,</span>
              <span className="site-footer-tagline-line site-footer-tagline-line-2">
                <span className="site-footer-tagline-eclipse">Eclipse</span> the Rest
              </span>
            </p>
          </section>

          <section className="site-footer-block site-footer-quick-block" aria-label="Quick links">
            <h3>Quick Links</h3>
            <nav className="site-footer-links">
              <Link href="/courses">Courses</Link>
              <Link href="/mentors">Mentors</Link>
              <Link href="/team">About Us</Link>
            </nav>
          </section>

          <section className="site-footer-block site-footer-social-block" aria-label="Social links">
            <h3>Social</h3>
            <div className="site-footer-links">
              <a href="#" aria-label="Open WhatsApp" target="_blank" rel="noreferrer">
                WhatsApp
              </a>
              <a href="#" aria-label="Open Facebook" target="_blank" rel="noreferrer">
                Facebook
              </a>
              <a href="#" aria-label="Open Instagram" target="_blank" rel="noreferrer">
                Instagram
              </a>
              <a href="#" aria-label="Open YouTube" target="_blank" rel="noreferrer">
                YouTube
              </a>
            </div>
          </section>

          <section className="site-footer-block site-footer-contact-block" aria-label="Contact us">
            <h3>Contact Us</h3>
            <p className="site-footer-contact">
              <span className="site-footer-contact-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.07 15.07 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.3 21 3 13.7 3 4a1 1 0 0 1 1-1h3.49a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.19 2.2Z" />
                </svg>
              </span>
              +8801750964611
            </p>
            <p className="site-footer-contact">
              <span className="site-footer-contact-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 2-8 5-8-5h16Zm0 12H4V8l8 5 8-5v10Z" />
                </svg>
              </span>
              eclipselearners@gmail.com
            </p>
            <p className="site-footer-contact">
              <span className="site-footer-contact-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2a7 7 0 0 0-7 7c0 4.57 5.24 11.95 6.13 13.18a1 1 0 0 0 1.74 0C13.76 20.95 19 13.57 19 9a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
                </svg>
              </span>
              Senpara Parbata Ln, Dhaka 1216
            </p>
          </section>
        </div>
        <p className="site-footer-meta">
          © {new Date().getFullYear()} Eclipse Learners. All rights reserved.
        </p>
      </div>
    </footer>
  );
}