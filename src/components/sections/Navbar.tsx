"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { Menu } from "lucide-react";
import { cn } from "@/utils/cn";
import { navItems, siteConfig } from "@/constants/navigation";
import { NavLink } from "./NavLink";
import { MobileNavDrawer } from "./MobileNavDrawer";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Framer Motion useScroll for low overhead scroll listening
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest >= 24);
  });

  // Background/glass transitions when scrolled OR when not on homepage
  const isScrolledOrNotHome = isScrolled || pathname !== "/";

  return (
    <>
      {/* Premium hallmark: Keyboard-accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-6 focus:left-6 focus:z-[60] bg-forest text-cream px-6 py-2.5 rounded-full font-heading font-bold shadow-md focus:outline-none focus:ring-2 focus:ring-forest/40"
      >
        Skip to content
      </a>

      {/* Full-width fixed header — floats + rounds on scroll */}
      <header
        className={cn(
          "fixed z-50 transition-all duration-500 ease-in-out",
          isScrolled
            ? "top-3 left-5 right-5 rounded-2xl bg-cream/80 backdrop-blur-xl shadow-lg border border-card-border"
            : "top-0 left-0 right-0 w-full border-b border-card-border bg-sage/95 backdrop-blur-md shadow-xs"
        )}
      >
        <div
          className={cn(
            "mx-auto w-full flex items-center justify-between transition-all duration-300",
            isScrolled ? "px-5 py-3 max-w-full" : "px-6 max-w-[90rem] py-4 md:py-5"
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              "flex items-baseline gap-1 text-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-forest/40 rounded-md transition-transform duration-300 origin-left",
              isScrolled ? "scale-95" : "scale-100"
            )}
            aria-label={`${siteConfig.name} Home`}
          >
            {/* 8-Spoke Wheel Flower Logo SVG */}
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7 text-charcoal fill-none stroke-current self-center mr-1.5"
              viewBox="0 0 32 32"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="2.5" />
              <circle cx="16" cy="16" r="3" fill="currentColor" />
              <path
                d="M16 3v26 M3 16h26 M6.8 6.8l18.4 18.4 M6.8 25.2L25.2 6.8"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-charcoal">
              Dua
            </span>
            <span className="hidden sm:inline font-body font-normal text-xs sm:text-sm text-muted-text ml-1">
              Charitable Trust
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className={cn(
              "hidden md:flex items-center transition-all duration-300",
              isScrolled ? "gap-6" : "gap-8"
            )}
            aria-label="Main Navigation"
          >
            {navItems.map((item, index) => (
              <NavLink key={index} href={item.href} label={item.label} />
            ))}
          </nav>

          {/* Desktop Action Buttons & Theme Toggle */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            <div className="hidden md:block">
              <Button
                label="Get Involved"
                variant="outline"
                size={isScrolled ? "sm" : "md"}
                href={siteConfig.donateLink}
                className="bg-transparent border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-cream rounded-full transition-all duration-300 shadow-none font-bold"
                aria-label="Get Involved - Make a donation"
              />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-charcoal hover:text-forest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest/40 rounded-full cursor-pointer flex items-center justify-center"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label="Open navigation menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay and Content */}
      <MobileNavDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
};

export default Navbar;
