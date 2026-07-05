"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";

interface NavLinkProps {
  href: string;
  label: string;
  isScrolled?: boolean;
}

export const NavLink: React.FC<NavLinkProps> = ({ href, label, isScrolled = false }) => {
  const pathname = usePathname();

  // Active route matching logic:
  // - If item href is "/" -> active only when pathname === "/"
  // - Else active when pathname === href OR pathname startsWith(`${href}/`)
  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      data-active={isActive ? "true" : undefined}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "relative py-2 text-sm font-semibold font-body transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest/40 rounded-md px-2",
        isScrolled
          ? (isActive ? "text-nav-scrolled-active" : "text-nav-scrolled-text/85 hover:text-nav-scrolled-hover")
          : (isActive ? "text-forest" : "text-charcoal/80 hover:text-forest")
      )}
    >
      <span className="relative z-10">{label}</span>
    </Link>
  );
};

export default NavLink;
