"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { m, useReducedMotion } from "framer-motion";
import { cn } from "@/utils/cn";

interface NavLinkProps {
  href: string;
  label: string;
}

export const NavLink: React.FC<NavLinkProps> = ({ href, label }) => {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

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
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "relative py-2 text-sm font-semibold font-body hover:text-forest transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest/40 rounded-md px-2",
        isActive ? "text-forest" : "text-charcoal/70"
      )}
    >
      <span className="relative z-10">{label}</span>
      {isActive && (
        <m.span
          layoutId="activeIndicator"
          className="absolute bottom-0 left-2 right-2 h-0.5 bg-gold-gradient rounded-full"
          transition={
            shouldReduceMotion
              ? { type: "tween", duration: 0 }
              : { type: "spring", stiffness: 380, damping: 30 }
          }
        />
      )}
    </Link>
  );
};

export default NavLink;
