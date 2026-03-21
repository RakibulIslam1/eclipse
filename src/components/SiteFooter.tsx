import Link from "next/link";
import Image from "next/image";
import darkModeLogo from "../../contents/images/eclipse_logo_drk-mode-01.png";

export default function SiteFooter() {
  return (
    <footer className="site-footer" aria-label="Site footer">
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
            <p className="site-footer-tagline">master the test , eclipse the rest!</p>
          </section>

          <section className="site-footer-block" aria-label="Quick links">
            <h3>Quick Links</h3>
            <nav className="site-footer-links">
              <Link href="/courses">Courses</Link>
              <Link href="/mentors">Mentors</Link>
              <Link href="/team">About Us</Link>
            </nav>
          </section>

          <section className="site-footer-block" aria-label="Social links">
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

          <section className="site-footer-block" aria-label="Contact us">
            <h3>Contact Us</h3>
            <p className="site-footer-contact">+8801750964611</p>
            <p className="site-footer-contact">eclipselearners@gmail.com</p>
          </section>
        </div>
        <p className="site-footer-meta">
          © {new Date().getFullYear()} Eclipse Learners. All rights reserved.
        </p>
      </div>
    </footer>
  );
}