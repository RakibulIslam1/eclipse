"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
};

const centerItems: NavItem[] = [
  { href: "/courses", label: "Courses" },
  { href: "/mentors", label: "Mentors" },
  { href: "/team", label: "About Us" },
];

const rightItems: NavItem[] = [{ href: "/studyroom", label: "Study Room" }];

export default function TopNavLinks() {
  const pathname = usePathname();
  const shouldHighlight = pathname !== "/";

  const isActive = (href: string) => shouldHighlight && pathname === href;

  return (
    <>
      <div className="nav-links nav-links-center">
        {centerItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={isActive(item.href) ? "active-nav-link" : undefined}
            aria-current={isActive(item.href) ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="nav-links nav-links-right">
        {rightItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`studyroom-btn${isActive(item.href) ? " active-nav-link" : ""}`}
            aria-current={isActive(item.href) ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
        <button type="button" className="profile-icon-btn" aria-label="Profile">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M12 12.1a4.3 4.3 0 1 0-4.3-4.3 4.3 4.3 0 0 0 4.3 4.3Z" />
            <path d="M4.5 20a7.5 7.5 0 0 1 15 0v.5h-15Z" />
          </svg>
        </button>
      </div>
    </>
  );
}
