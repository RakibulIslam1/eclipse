"use client";
import { useEffect } from "react";

export default function NavbarAnimator() {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.body.classList.add("navbar-animate");
    }, 60);
    return () => clearTimeout(timer);
  }, []);
  return null;
}
