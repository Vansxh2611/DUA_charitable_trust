"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageRoutes } from "@/types";
import { siteConfig } from "@/constants/data";
import { SocialIcons } from "@/components/ui/SocialIcons";

export const Footer: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Render skeletal content during server render to prevent hydration mismatches
  if (!mounted) {
    return (
      <footer
        className="bg-navy text-cream pt-16 pb-12 relative overflow-hidden border-t border-white/5"
        aria-label="Site Footer"
      >
        <Container>
          <div className="h-64" />
        </Container>
      </footer>
    );
  }

  return (
    <footer
      className="bg-navy text-cream pt-20 pb-12 relative overflow-hidden border-t border-white/5"
      aria-label="Site Footer"
    >
      {/* Ambient background glow for premium three-dimensional depth */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-forest/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle geometric grid line pattern overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none text-white"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-16 pb-16">
          {/* Column 1: Logo, description, and socials */}
          <div className="lg:col-span-4 flex flex-col items-start gap-5">
            <Link
              href={PageRoutes.HOME}
              className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest/40 rounded-md"
              aria-label={`${siteConfig.name} Home`}
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
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-sm text-cream/70 leading-relaxed font-body max-w-sm">
              {siteConfig.description}
            </p>
            <SocialIcons
              className="mt-2"
              iconClassName="bg-white/5 text-cream/80 hover:bg-forest hover:text-cream border border-white/5 transition-all duration-300"
            />
          </div>

          {/* Column 2: Explore */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <h3 className="text-xs font-bold text-cream/40 uppercase tracking-wider font-body">
              Explore
            </h3>
            <nav className="flex flex-col gap-3.5 text-sm font-semibold font-body" aria-label="Explore Links">
              <Link href={PageRoutes.HOME} className="text-cream/75 hover:text-forest transition-colors duration-200">
                Home
              </Link>
              <Link href={PageRoutes.ABOUT_US} className="text-cream/75 hover:text-forest transition-colors duration-200">
                About Us
              </Link>
              <Link href={PageRoutes.OUR_PROJECTS} className="text-cream/75 hover:text-forest transition-colors duration-200">
                Our Projects
              </Link>
              <Link href={PageRoutes.BLOG} className="text-cream/75 hover:text-forest transition-colors duration-200">
                Community Blog
              </Link>
            </nav>
          </div>

          {/* Column 3: Get Involved */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <h3 className="text-xs font-bold text-cream/40 uppercase tracking-wider font-body">
              Get Involved
            </h3>
            <nav className="flex flex-col gap-3.5 text-sm font-semibold font-body" aria-label="Get Involved Links">
              <Link href={PageRoutes.CONTACT} className="text-cream/75 hover:text-forest transition-colors duration-200">
                Volunteer
              </Link>
              <Link href={PageRoutes.DONATE} className="text-cream/75 hover:text-forest transition-colors duration-200">
                Donate Now
              </Link>
              <Link href={PageRoutes.CONTACT} className="text-cream/75 hover:text-forest transition-colors duration-200">
                Partner with Us
              </Link>
            </nav>
          </div>

          {/* Column 4: Contact Info */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <h3 className="text-xs font-bold text-cream/40 uppercase tracking-wider font-body">
              Contact Us
            </h3>
            <div className="flex flex-col gap-4 text-sm font-body text-cream/70">
              <p className="leading-relaxed">{siteConfig.address}</p>
              <div className="flex flex-col gap-1.5 font-semibold">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-cream/80 hover:text-forest transition-colors duration-200"
                >
                  {siteConfig.email}
                </a>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="text-cream/80 hover:text-forest transition-colors duration-200"
                >
                  {siteConfig.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom copyright and legal */}
        <div className="pt-8 border-t border-white/10 text-xs text-cream/40 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Nurturing Joyful Wisdom.</p>
          <div className="flex gap-6 font-semibold" aria-label="Privacy & Terms">
            <Link href="#" className="hover:text-cream transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-cream transition-colors duration-200">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
