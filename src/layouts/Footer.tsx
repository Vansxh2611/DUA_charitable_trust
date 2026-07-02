"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageRoutes } from "@/types";

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frameId);
  }, []);

  const isAboutPage = pathname === PageRoutes.ABOUT_US;
  const isProjectsPage = pathname === PageRoutes.OUR_PROJECTS;
  const isBlogPage = pathname === PageRoutes.BLOG;

  // Render content only after mounting to prevent hydration mismatches
  if (!mounted) {
    return (
      <footer className="bg-navy text-cream pt-16 pb-12 relative overflow-hidden border-t border-white/5" aria-label="Site Footer">
        <Container>
          <div className="h-48" />
        </Container>
      </footer>
    );
  }

  return (
    <footer className="bg-navy text-cream pt-16 pb-12 relative overflow-hidden border-t border-white/5" aria-label="Site Footer">
      {/* Subtle geometric grid line pattern overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-5 pointer-events-none text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        aria-hidden="true"
      >
        <defs>
          <pattern id="footer-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M0 40h40V0" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#footer-grid)" />
      </svg>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12">
          {/* Logo and Description Column */}
          <div className="md:col-span-6 flex flex-col gap-4">
            <Link
              href={PageRoutes.HOME}
              className="flex items-center gap-2 text-forest focus:outline-none w-fit"
              aria-label="CogniBloom Collective Home"
            >
              {/* Sprout Circle Icon */}
              <svg
                className="w-7 h-7 text-forest fill-none stroke-current"
                viewBox="0 0 32 32"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <circle cx="16" cy="16" r="14" />
                <path d="M16 24V14 M16 16c0-3 3-5 6-5 M16 18c0-3-3-5-6-5" strokeLinecap="round" />
              </svg>
              <span className="font-heading font-bold text-lg sm:text-xl text-cream tracking-tight">
                {isAboutPage || isProjectsPage || isBlogPage ? "CogniBloom Collective" : "CogniBloom"}
              </span>
            </Link>
            <p className="text-sm text-cream/70 leading-relaxed font-body max-w-sm">
              {isAboutPage
                ? "© 2024 CogniBloom Collective. Nurturing Joyful Wisdom."
                : isProjectsPage
                  ? "Nurturing Joyful Wisdom through inclusive, community-driven educational initiatives."
                  : isBlogPage
                    ? "Nurturing Joyful Wisdom through contemporary, inclusive educational initiatives."
                    : "An Inspiring platform bringing educational missions to life. Join us in nurturing joyful wisdom."}
            </p>
          </div>

          {/* Navigation Links Column */}
          {isAboutPage ? (
            <>
              <div className="md:col-span-3 flex flex-col gap-4">
                <h3 className="text-xs font-bold text-cream/50 uppercase tracking-wider font-body">Organization</h3>
                <nav className="flex flex-col gap-2.5 text-sm" aria-label="Organization Links">
                  <Link href={PageRoutes.ABOUT_US} className="hover:text-forest transition-colors">Mission</Link>
                  <Link href={PageRoutes.CONTACT} className="hover:text-forest transition-colors">Volunteer</Link>
                  <Link href={PageRoutes.CONTACT} className="hover:text-forest transition-colors">Contact Us</Link>
                </nav>
              </div>
              <div className="md:col-span-3 flex flex-col gap-4">
                <h3 className="text-xs font-bold text-cream/50 uppercase tracking-wider font-body">Legal</h3>
                <nav className="flex flex-col gap-2.5 text-sm" aria-label="Legal Links">
                  <Link href="#" className="hover:text-forest transition-colors">Privacy Policy</Link>
                  <Link href="#" className="hover:text-forest transition-colors">Terms of Service</Link>
                </nav>
              </div>
            </>
          ) : isProjectsPage ? (
            <>
              <div className="md:col-span-3 flex flex-col gap-4">
                <h3 className="text-xs font-bold text-cream/50 uppercase tracking-wider font-body">Explore</h3>
                <nav className="flex flex-col gap-2.5 text-sm" aria-label="Explore Links">
                  <Link href={PageRoutes.ABOUT_US} className="hover:text-forest transition-colors">Mission</Link>
                  <Link href={PageRoutes.CONTACT} className="hover:text-forest transition-colors">Volunteer</Link>
                  <Link href={PageRoutes.CONTACT} className="hover:text-forest transition-colors">Contact Us</Link>
                </nav>
              </div>
              <div className="md:col-span-3 flex flex-col gap-4">
                <h3 className="text-xs font-bold text-cream/50 uppercase tracking-wider font-body">Legal</h3>
                <nav className="flex flex-col gap-2.5 text-sm" aria-label="Legal Links">
                  <Link href="#" className="hover:text-forest transition-colors">Privacy Policy</Link>
                  <Link href="#" className="hover:text-forest transition-colors">Terms of Service</Link>
                </nav>
              </div>
            </>
          ) : isBlogPage ? (
            <>
              <div className="md:col-span-3 flex flex-col gap-4">
                <nav className="flex flex-col gap-2.5 text-sm mt-8" aria-label="Blog Center Links">
                  <Link href={PageRoutes.ABOUT_US} className="hover:text-forest transition-colors">Mission</Link>
                  <Link href={PageRoutes.CONTACT} className="hover:text-forest transition-colors">Contact Us</Link>
                  <Link href={PageRoutes.CONTACT} className="hover:text-forest transition-colors">Volunteer</Link>
                </nav>
              </div>
              <div className="md:col-span-3 flex flex-col gap-4">
                <nav className="flex flex-col gap-2.5 text-sm mt-8" aria-label="Blog Legal Links">
                  <Link href="#" className="hover:text-forest transition-colors">Privacy Policy</Link>
                  <Link href="#" className="hover:text-forest transition-colors">Terms of Service</Link>
                </nav>
              </div>
            </>
          ) : (
            // Home Page Footer: Logo/Desc + Legal column (Privacy Policy, Terms of Service, Contact Us)
            <div className="md:col-span-6 flex flex-col gap-4">
              <h3 className="text-xs font-bold text-cream/50 uppercase tracking-wider font-body">Legal</h3>
              <nav className="flex flex-col gap-2.5 text-sm" aria-label="Home Footer Links">
                <Link href="#" className="hover:text-forest transition-colors">Privacy Policy</Link>
                <Link href="#" className="hover:text-forest transition-colors">Terms of Service</Link>
                <Link href={PageRoutes.CONTACT} className="hover:text-forest transition-colors">Contact Us</Link>
              </nav>
            </div>
          )}
        </div>

        {/* Footer Bottom copyright */}
        <div className="pt-8 border-t border-white/10 text-center text-xs text-cream/40 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2024 CogniBloom Collective. Nurturing Joyful Wisdom.</p>
        </div>
      </Container>
    </footer>
  );
};
