import React from "react";
import { CTAProps } from "@/types";
import { Container } from "../ui/Container";
import { Heart, Users } from "lucide-react";
import { SectionWrapper } from "../storytelling/SectionWrapper";
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
    <SectionWrapper id="cta-footer" bgColor="bg-cream" glowPosition="top-left">
      <Container>
        <div className="w-full max-w-5xl mx-auto">
          <div className="bg-forest text-cream-static rounded-[40px] px-6 py-16 sm:p-20 text-center flex flex-col items-center shadow-premium relative overflow-hidden border border-white/5">
            {/* Ambient decorative glowing circles for premium aesthetic */}
            <div className="absolute -top-32 -left-32 w-80 h-80 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-sage/25 rounded-full blur-3xl pointer-events-none" />

            {/* Doodle background pattern for educational context */}
            <BackgroundPattern variant="doodle" opacity={0.12} className="text-cream-static" />

            {/* Dots texture overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#F7DF7C_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading leading-tight mb-6 text-cream-static max-w-2xl relative z-10">
              {title}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-cream-static/80 leading-relaxed font-body mb-10 max-w-xl relative z-10">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto relative z-10">
              {/* Primary Donation Button - Redesigned to stand out in gold gradient */}
              <Link
                href={primaryCtaLink}
                className="w-full sm:w-56 inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gold-gradient text-charcoal rounded-full font-heading font-extrabold text-sm shadow-gold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Heart size={16} className="fill-charcoal stroke-charcoal" />
                <span>{primaryCtaText}</span>
              </Link>

              {/* Secondary Volunteer Button - Transparent outline with smooth solid white hover */}
              <Link
                href={secondaryCtaLink}
                className="w-full sm:w-56 inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white/10 hover:bg-white text-cream-static hover:text-forest border border-cream-static/30 rounded-full font-heading font-bold text-sm shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cream-static/40"
              >
                <Users size={16} />
                <span>{secondaryCtaText}</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
};
