"use client";

import React, { useState } from "react";
import { FAQProps } from "@/types";
import { Container } from "../ui/Container";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/utils/cn";
import { SectionWrapper } from "../storytelling/SectionWrapper";

export const FAQ: React.FC<FAQProps> = ({
  title,
  subtitle,
  faqs,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number): void => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <SectionWrapper id="faq" bgColor="bg-cream" glowPosition="bottom-right" className="py-16">
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16">
          {/* Left: heading — no tag label */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-charcoal font-heading leading-tight mb-4">
              {title}
            </h2>
            <p className="text-base text-charcoal/70 leading-relaxed font-body">
              {subtitle}
            </p>
          </div>

          <div className="lg:col-span-7 w-full">
            <div className="flex flex-col gap-4">
              {faqs.map((faq, index) => {
                const isOpen = activeIndex === index;
                return (
                  <div
                    key={index}
                    className={cn(
                      "border border-forest/15 rounded-lg overflow-hidden bg-cream transition-all duration-300",
                      isOpen ? "border-forest bg-mint/20" : ""
                    )}
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      <span className="text-base sm:text-lg font-bold text-charcoal font-heading leading-snug">
                        {faq.question}
                      </span>
                      <span className="p-1 rounded-md bg-forest/5 text-forest shrink-0">
                        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                      </span>
                    </button>
                    <div
                      className={cn(
                        "grid transition-all duration-300 ease-in-out",
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="p-5 sm:p-6 pt-0! text-sm sm:text-base text-charcoal/70 leading-relaxed font-body text-left">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
};
