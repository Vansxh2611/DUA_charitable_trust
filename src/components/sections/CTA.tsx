// CTA component for newsletter / involvement actions
import React from "react";
import { CTAProps } from "@/types";
import { BackgroundPattern } from "../ui/BackgroundPattern";
import Link from "next/link";

export const CTA: React.FC<CTAProps> = ({
  title,
  description,
  primaryCtaText,
  primaryCtaLink,
  secondaryCtaText,
  secondaryCtaLink,
}) => {
  return (
    <section id="cta-footer" className="relative bg-cream py-5">
      <div className="w-full px-5">
        <div
          className="relative bg-footer-bg bg-cover bg-center text-white py-16 px-8 sm:px-12 md:px-16 rounded-lg overflow-hidden border border-card-border shadow-md"
          style={{ backgroundImage: "url('/cta-bg.jpg')" }}
        >
          {/* Subtle dark overlay for readability on lighter watercolor background */}
          <div className="absolute inset-0 bg-black/25 mix-blend-multiply pointer-events-none" />
          {/* Ambient decorative glowing circles */}
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

          <BackgroundPattern variant="doodle" opacity={0.04} className="text-white" />

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 relative z-10 w-full">
            <div className="max-w-3xl text-left">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight font-heading leading-tight mb-4 text-white!">
                {title}
              </h2>
              <p className="text-sm sm:text-base text-white/85 leading-relaxed font-body">
                {description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-start lg:justify-end w-full lg:w-auto shrink-0">
              {/* Primary — text only, no icon */}
              <Link
                href={primaryCtaLink}
                className="w-full sm:w-52 inline-flex items-center justify-center px-6 py-4 bg-accent text-[#0a142f] hover:bg-accent-dark transition-all duration-300 font-heading font-extrabold text-sm rounded-lg shadow-sm"
              >
                {primaryCtaText}
              </Link>

              {/* Secondary — text only, no icon */}
              <Link
                href={secondaryCtaLink}
                className="w-full sm:w-52 inline-flex items-center justify-center px-6 py-4 bg-white/10 hover:bg-white text-white hover:text-[#0a142f] border border-white/20 transition-all duration-300 font-heading font-bold text-sm rounded-lg"
              >
                {secondaryCtaText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
