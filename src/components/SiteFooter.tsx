import Link from "next/link";
import Image from "next/image";
import eclipseWordmark from "../../contents/images/eclipse_txt_light-mode-01.png";

export default function SiteFooter() {
  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="site-footer-grid">
        <section className="site-footer-block">
          <Image
            src={eclipseWordmark}
            alt="Eclipse wordmark"
            width={220}
            height={64}
            className="site-footer-logo"
          />
          <h2 className="site-footer-title">Eclipse Learners</h2>
          <p className="site-footer-copy">
            Smart learning flows built for curious students and bold mentors.
          </p>
          <p className="site-footer-meta">
            © {new Date().getFullYear()} Eclipse Learners. All rights reserved.
          </p>
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
          </div>
        </section>

        <section className="site-footer-block">
          <h3>Contact</h3>
          <p className="site-footer-contact">hello@eclipselearners.com</p>
          <p className="site-footer-copy">Dhaka • Remote-first learning support</p>
        </section>
      </div>
    </footer>
  );
}