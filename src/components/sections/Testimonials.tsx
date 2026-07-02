import React from "react";
import Image from "next/image";
import { TestimonialsProps } from "@/types";
import { Container } from "../ui/Container";
import { Quote } from "lucide-react";
import { SectionWrapper } from "../storytelling/SectionWrapper";

export const Testimonials: React.FC<TestimonialsProps> = ({
  title,
  subtitle,
  testimonials,
}) => {
  return (
    <SectionWrapper id="testimonials" bgColor="bg-cream" glowPosition="top-left">
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-accent text-charcoal-static font-heading text-xs font-bold uppercase tracking-wider mb-4">
            Community Voices
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal font-heading leading-tight mb-4">
            {title}
          </h2>
          <p className="text-base text-charcoal/70 leading-relaxed font-body max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col bg-cream border border-forest/15 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-md hover:border-forest/30 transition-all duration-300 relative group"
            >
              <div className="absolute top-6 right-6 text-forest/10 group-hover:text-forest/20 transition-colors duration-200">
                <Quote size={36} strokeWidth={2.5} />
              </div>
              <p className="text-sm sm:text-base text-charcoal/75 leading-relaxed font-body mb-8 italic relative z-10 flex-grow text-left">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-forest/10 mt-auto">
                <div className="relative h-10 w-10 rounded-full overflow-hidden shrink-0 border border-forest/10">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div className="flex flex-col min-w-0 text-left">
                  <span className="text-sm font-bold text-charcoal truncate">{testimonial.name}</span>
                  <span className="text-[11px] text-charcoal/50 truncate font-heading font-medium">
                    {testimonial.role} {testimonial.location ? `• ${testimonial.location}` : ""}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
};
