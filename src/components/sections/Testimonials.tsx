import React from "react";
import Image from "next/image";
import { TestimonialsProps } from "@/types";
import { Container } from "../ui/Container";
import { Quote } from "lucide-react";
import { SectionWrapper } from "../storytelling/SectionWrapper";
import { cn } from "@/utils/cn";

export const Testimonials: React.FC<TestimonialsProps> = ({
  title,
  subtitle,
  testimonials,
}) => {
  return (
    <SectionWrapper id="testimonials" bgColor="bg-cream" glowPosition="top-left">
      <Container size="xl">
        {/* Section heading — no tag label */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-charcoal font-heading leading-tight mb-4">
            {title}
          </h2>
          <p className="text-base text-charcoal/70 leading-relaxed font-body max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-col divide-y divide-card-border/60">
          {testimonials.map((testimonial, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center py-12 first:pt-0 last:pb-0 w-full max-w-4xl mx-auto"
              >
                {/* Photo Side */}
                <div
                  className={cn(
                    "relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 shrink-0 border border-card-border overflow-hidden rounded-lg",
                    isEven ? "md:order-1" : "md:order-2"
                  )}
                >
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="256px"
                  />
                </div>

                {/* Content Side */}
                <div
                  className={cn(
                    "flex flex-col text-left flex-grow max-w-2xl",
                    isEven ? "md:order-2" : "md:order-1"
                  )}
                >
                  <Quote size={32} className="text-forest/15 mb-4 shrink-0" strokeWidth={2} />

                  <p className="text-base sm:text-lg md:text-xl text-charcoal/80 leading-relaxed font-body italic mb-5">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  <div>
                    <span className="block text-base font-extrabold text-charcoal font-heading">
                      {testimonial.name}
                    </span>
                    <span className="block text-xs text-muted-text font-bold uppercase tracking-widest mt-1">
                      {testimonial.role} {testimonial.location ? `• ${testimonial.location}` : ""}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </SectionWrapper>
  );
};
