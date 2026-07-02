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
              "flex items-center gap-2 text-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-forest/40 rounded-md transition-transform duration-300 origin-left",
              isScrolled ? "scale-95" : "scale-100"
            )}
            aria-label={`${siteConfig.name} Home`}
          >
            <Image
              src="/logo-icon.png"
              alt={`${siteConfig.name} Logo`}
              width={28}
              height={28}
              className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
              priority
            />
            <div className="flex items-baseline gap-1.5">
              <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-charcoal leading-none">
                Dua
              </span>
              <span className="hidden sm:inline font-heading font-extrabold text-lg sm:text-xl tracking-tight text-charcoal leading-none">
                Charitable Trust
              </span>
            </div>
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
