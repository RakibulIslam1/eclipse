"use client";

import { usePathname } from "next/navigation";
import SiteFooter from "@/components/SiteFooter";

export default function RouteAwareFooter() {
  const pathname = usePathname();

  if (pathname === "/studyroom") {
    return null;
  }

  return <SiteFooter />;
}