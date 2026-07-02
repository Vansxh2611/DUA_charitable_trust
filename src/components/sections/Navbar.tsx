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

      {/* Floating fixed wrapper with safe-area notch support */}
      <div
        className="fixed left-0 right-0 z-50 px-4 w-full pointer-events-none"
        style={{ top: "calc(env(safe-area-inset-top, 0px) + 1rem)" }}
      >
        <header
          className={cn(
            "mx-auto w-full max-w-6xl pointer-events-auto transition-all duration-300 ease-in-out border rounded-2xl md:rounded-[1.5rem]",
            isScrolled ? "py-2.5 px-6" : "py-4 px-6 md:px-8",
            isScrolledOrNotHome
              ? "bg-sage/80 backdrop-blur-xl border-charcoal/10 shadow-premium"
              : "bg-transparent border-transparent shadow-none"
          )}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className={cn(
                "flex items-center gap-2 text-forest focus:outline-none focus-visible:ring-2 focus-visible:ring-forest/40 rounded-md transition-transform duration-300 origin-left",
                isScrolled ? "scale-95" : "scale-100"
              )}
              aria-label={`${siteConfig.name} Home`}
            >
              <svg
                className="w-7 h-7 text-charcoal fill-none stroke-current"
                viewBox="0 0 32 32"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <circle cx="16" cy="16" r="14" />
                <path
                  d="M16 24V14 M16 16c0-3 3-5 6-5 M16 18c0-3-3-5-6-5"
                  strokeLinecap="round"
                />
              </svg>
              <span className="font-heading font-bold text-lg sm:text-xl tracking-tight text-charcoal">
                {siteConfig.name}
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
      </div>

      {/* Mobile Drawer Overlay and Content */}
      <MobileNavDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
};

export default Navbar;
