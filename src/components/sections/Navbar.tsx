"use client";

import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
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

  // Active underline geometry state
  const [activeRect, setActiveRect] = useState({ left: 0, width: 0 });
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  // Track pathname to reset activeSection on route change during render
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setActiveSection(null);
  }

  // Framer Motion useScroll for scroll state detection
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest >= 24);
  });

  // Home page sections scroll spy with guard to prevent rapid state changes
  useEffect(() => {
    if (pathname !== "/") return;

    const sections = ["our-focus", "seeds-of-change", "impact-stats", "featured-projects"];
    const sectionElements = sections
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sectionElements.length === 0) return;

    let scrollRafId: number;

    const handleScroll = () => {
      cancelAnimationFrame(scrollRafId);
      
      scrollRafId = requestAnimationFrame(() => {
        const scrollPosition = window.scrollY + window.innerHeight * 0.35; // 35% viewport threshold
        
        let currentSection: string | null = null;
        
        for (const el of sectionElements) {
          if (scrollPosition >= el.offsetTop) {
            currentSection = el.id;
          }
        }
        
        if (currentSection !== activeSection) {
          setActiveSection(currentSection);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      cancelAnimationFrame(scrollRafId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname, activeSection]);

  // Geometry measurement of the active item (offsetting px-2 link padding)
  const measure = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return;

    const active = nav.querySelector('[data-active="true"]') as HTMLElement;

    if (!active) {
      setActiveRect({ left: 0, width: 0 });
      return;
    }

    const navRect = nav.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();

    setActiveRect({
      left: activeRect.left - navRect.left + 8, // offset by 8px left padding
      width: activeRect.width - 16,            // subtract 16px total padding (8px left + 8px right)
    });
  }, []);

  // useLayoutEffect runs before paint to avoid any visible flicker
  useLayoutEffect(() => {
    const rafId = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(rafId);
  }, [pathname, activeSection, measure]);

  // ResizeObserver for the nav container to handle responsive/geometry shifts
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const observer = new ResizeObserver(() => {
      requestAnimationFrame(measure);
    });

    observer.observe(nav);

    // Re-measure active link elements after font loads
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => {
        requestAnimationFrame(measure);
      });
    }

    return () => {
      observer.disconnect();
    };
  }, [measure]);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-6 focus:left-6 focus:z-[60] bg-forest text-cream px-6 py-2.5 rounded-full font-heading font-bold shadow-md focus:outline-none focus:ring-2 focus:ring-forest/40"
      >
        Skip to content
      </a>

      {/* Header wrapper */}
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

          {/* Desktop Navigation Links - Spacing stabilized with constant gap-8 */}
          <nav
            ref={navRef}
            className="relative hidden md:flex items-center gap-8"
            aria-label="Main Navigation"
          >
            {navItems.map((item, index) => (
              <NavLink key={index} href={item.href} label={item.label} isScrolled={isScrolled} />
            ))}

            {/* Single persistent active underline glide indicator */}
            <motion.div
              className={cn(
                "absolute bottom-0 h-0.5 rounded-full transition-colors duration-300 pointer-events-none",
                isScrolled ? "bg-nav-scrolled-active" : "bg-forest"
              )}
              initial={false}
              transition={{
                duration: 0.3,
                ease: [0.215, 0.61, 0.355, 1], // easeOutCubic
              }}
              animate={{
                x: activeRect.left,
                width: activeRect.width,
                opacity: activeRect.width ? 1 : 0,
              }}
              style={{ originX: 0 }}
            />
          </nav>

          {/* Action Button & Theme Toggle */}
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

      {/* Mobile Drawer */}
      <MobileNavDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
};

export default Navbar;
