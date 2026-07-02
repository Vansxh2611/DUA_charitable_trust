"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, siteConfig } from "@/constants/data";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import { cn } from "@/utils/cn";
import { PageRoutes } from "@/types";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const firstFocusableRef = useRef<HTMLAnchorElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = (): void => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = (): void => {
    setMobileMenuOpen(false);
  };

  // Close on route change
  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      closeMobileMenu();
    });
    return () => cancelAnimationFrame(frameId);
  }, [pathname]);

  // ESC key and Body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMobileMenu();
      }
      if (e.key === "Tab" && mobileMenuOpen && menuRef.current) {
        const focusables = menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, textarea, [tabindex="0"]'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        firstFocusableRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-sage border-b border-charcoal/5 h-[72px] flex items-center shadow-xs">
      <Container>
        <div className="flex items-center justify-between">
          <Link
            href={PageRoutes.HOME}
            className="flex items-center gap-2 text-forest focus:outline-none"
            onClick={closeMobileMenu}
            aria-label="CogniBloom Collective Home"
          >
            {/* Sprout Circle Icon */}
            <svg
              className="w-7 h-7 text-charcoal fill-none stroke-current"
              viewBox="0 0 32 32"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <circle cx="16" cy="16" r="14" />
              <path d="M16 24V14 M16 16c0-3 3-5 6-5 M16 18c0-3-3-5-6-5" strokeLinecap="round" />
            </svg>
            <span className="font-heading font-bold text-lg sm:text-xl tracking-tight text-charcoal">
              {siteConfig.name}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={index}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "text-sm font-semibold font-body hover:text-charcoal transition-colors relative py-1 focus:outline-none",
                    isActive ? "text-charcoal font-extrabold" : "text-charcoal/70"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-charcoal rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <Button
              label="Get Involved"
              variant="outline"
              size="sm"
              href={PageRoutes.DONATE}
              className="bg-transparent border border-charcoal/30 text-charcoal hover:bg-charcoal hover:text-cream rounded-full px-6 py-2 font-bold transition-all duration-300 shadow-none"
              aria-label="Get Involved - Make a donation"
            />
          </div>

          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-charcoal hover:text-forest focus:outline-none cursor-pointer"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {mobileMenuOpen && (
        <div
          ref={menuRef}
          className="md:hidden fixed inset-x-0 top-[72px] bottom-0 bg-sage/98 backdrop-blur-md z-40 flex flex-col p-6 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          <nav className="flex flex-col gap-6 mb-8 mt-4">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={index}
                  ref={index === 0 ? firstFocusableRef : undefined}
                  href={item.href}
                  onClick={closeMobileMenu}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "text-lg font-bold font-heading py-2 border-b border-charcoal/10 focus:outline-none",
                    isActive ? "text-charcoal" : "text-charcoal/80"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto">
            <Button
              label="Get Involved"
              variant="outline"
              size="lg"
              href={PageRoutes.DONATE}
              onClick={closeMobileMenu}
              className="w-full text-center py-4 bg-transparent border border-charcoal/30 text-charcoal hover:bg-charcoal hover:text-white transition-colors rounded-full font-bold"
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
