"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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
      {/* Fixed header — detaches, shrinks, and floats on scroll */}
      <header
        className={cn(
          "fixed z-50 transition-all duration-300 ease-in-out",
          isScrolled
            ? "top-3 left-5 right-5 rounded-2xl bg-nav-scrolled-bg backdrop-blur-xl shadow-lg border border-card-border/20"
            : "top-0 left-0 right-0 w-full border-b border-transparent bg-transparent shadow-none"
        )}
      >
        <div
          className={cn(
            "mx-auto w-full flex items-center justify-between transition-all duration-300",
            isScrolled ? "px-5 py-2.5 max-w-full" : "px-6 py-4 md:py-5 max-w-[90rem]"
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className={cn(
              "flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest/40 rounded-md transition-all duration-300 origin-left",
              isScrolled ? "scale-92" : "scale-100"
            )}
            aria-label={`${siteConfig.name} Home`}
          >
            {/* Rounded Brand Logo Image Icon */}
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden shrink-0 border border-charcoal/10 self-center">
              <Image
                src="/Dua Charitable Trust_LOGO_2026.jpg (3).jpeg"
                alt="Dua Logo Icon"
                fill
                className="object-cover"
                sizes="48px"
                priority
              />
            </div>
            <span className={cn(
              "font-heading font-extrabold text-lg sm:text-xl tracking-tight transition-colors duration-300",
              isScrolled ? "text-nav-scrolled-text" : "text-charcoal"
            )}>
              Dua <span className="hidden sm:inline">Charitable Trust</span>
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
              <NavLink key={index} href={item.href} label={item.label} isScrolled={isScrolled} />
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
                className={cn(
                  "bg-transparent rounded-full transition-all duration-300 shadow-none font-bold",
                  isScrolled
                    ? "border-nav-scrolled-text/30 text-nav-scrolled-text hover:bg-nav-scrolled-text hover:text-[#FAF8F3]!"
                    : "border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-cream"
                )}
                aria-label="Get Involved - Make a donation"
              />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={cn(
                "md:hidden p-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest/40 rounded-full cursor-pointer flex items-center justify-center",
                isScrolled
                  ? "text-nav-scrolled-text hover:text-nav-scrolled-hover"
                  : "text-charcoal hover:text-forest"
              )}
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
