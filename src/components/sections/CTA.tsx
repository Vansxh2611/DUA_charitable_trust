import React from "react";
import { CTAProps } from "@/types";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Heart, Users } from "lucide-react";
import { SectionWrapper } from "../storytelling/SectionWrapper";

export const CTA: React.FC<CTAProps> = ({
  title,
  description,
  primaryCtaText,
  primaryCtaLink,
  secondaryCtaText,
  secondaryCtaLink,
}) => {
  return (
    <SectionWrapper id="cta-footer" bgColor="bg-[#FAF9F5]" glowPosition="top-left">
      <Container>
        <div className="w-full max-w-5xl mx-auto">
          <div className="bg-forest text-cream rounded-[40px] px-6 py-12 sm:p-16 text-center flex flex-col items-center shadow-md relative overflow-hidden">
            {/* Dots texture overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#F7DF7C_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading leading-tight mb-4 text-cream max-w-2xl relative z-10">
              {title}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-cream/80 leading-relaxed font-body mb-8 max-w-xl relative z-10">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto relative z-10">
              <Button
                label={primaryCtaText}
                variant="secondary"
                size="lg"
                href={primaryCtaLink}
                icon={<Heart size={16} className="fill-current" />}
                iconPosition="left"
                className="w-full sm:w-56"
              />
              <Button
                label={secondaryCtaText}
                variant="outline"
                size="lg"
                href={secondaryCtaLink}
                icon={<Users size={16} />}
                iconPosition="left"
                className="w-full sm:w-56 border-cream text-cream hover:bg-cream hover:text-forest"
              />
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
};
