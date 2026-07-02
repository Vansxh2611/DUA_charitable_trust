"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { m, useReducedMotion } from "framer-motion";
import { cn } from "@/utils/cn";
import { seedsIntro, seedsItems } from "@/constants/seedsOfChange";
import { Container } from "../ui/Container";

export const SeedsOfChange: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants for card fades/slides
  const cardVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 },
    visible: shouldReduceMotion
      ? { opacity: 1 }
      : { opacity: 1, y: 0 },
  };

  // Wash variants to theme color classes mapping (made more saturated/darker as requested)
  const washClasses = {
    sage: "bg-gradient-to-br from-sage/30 via-sage/65 to-sage/45",
    mint: "bg-gradient-to-br from-mint/30 via-mint/65 to-mint/45",
    beige: "bg-gradient-to-br from-beige/35 via-beige/75 to-beige/50",
    cream: "bg-gradient-to-br from-cream via-sage/30 to-cream",
  };

  return (
    <section className="py-20 bg-[#FAF9F5] relative overflow-hidden" aria-labelledby="seeds-section-title">
      <Container>
        <div className="flex flex-col gap-10 sm:gap-12 md:gap-16 max-w-6xl mx-auto">
          {/* Top Intro Card */}
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn(
              "relative bg-gradient-to-br from-cream via-sage/10 to-cream p-8 sm:p-12 md:p-14 rounded-[2rem] border border-charcoal/10 shadow-soft overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6",
              "hover:shadow-card hover:-translate-y-0.5 transition-all duration-300"
            )}
          >
            {/* Watercolor paper wash overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.7)_0%,transparent_75%)]"
              aria-hidden="true"
            />

            <div className="max-w-2xl relative z-10">
              <h2
                id="seeds-section-title"
                className="text-3xl sm:text-4xl font-extrabold tracking-tight text-charcoal font-heading leading-tight mb-3"
              >
                {seedsIntro.title}
              </h2>
              <p className="text-sm sm:text-base text-charcoal/70 leading-relaxed font-body">
                {seedsIntro.description}
              </p>
            </div>

            <div className="relative z-10 shrink-0">
              <Link
                href={seedsIntro.buttonHref}
                className="inline-flex items-center justify-center px-6 py-3 bg-accent/20 border border-accent/30 text-charcoal hover:bg-accent/30 rounded-full font-heading font-extrabold text-sm shadow-xs hover:shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest/40"
              >
                {seedsIntro.buttonLabel}
              </Link>
            </div>
          </m.div>

          {/* alternating row items */}
          <div className="flex flex-col gap-8 sm:gap-10">
            {seedsItems.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={item.id} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                  {/* Image Tile - Always first in DOM so it stacks first on mobile */}
                  <m.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={cardVariants}
                    transition={{ duration: 0.5, ease: "easeOut", delay: shouldReduceMotion ? 0 : 0.1 }}
                    className={cn(
                      "relative h-[260px] sm:h-[300px] lg:h-[320px] rounded-[2rem] overflow-hidden border border-charcoal/10 shadow-soft",
                      isEven ? "lg:order-1" : "lg:order-2",
                      "hover:shadow-card hover:-translate-y-0.5 transition-all duration-300"
                    )}
                  >
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                      priority={index === 0}
                    />
                    {/* Barely visible gradient overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/15 via-transparent to-transparent pointer-events-none z-10" />
                  </m.div>

                  {/* Text Tile */}
                  <m.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={cardVariants}
                    transition={{ duration: 0.5, ease: "easeOut", delay: shouldReduceMotion ? 0 : 0.2 }}
                    className={cn(
                      "relative p-8 sm:p-12 md:p-14 rounded-[2rem] overflow-hidden border border-charcoal/10 shadow-soft flex flex-col justify-center items-start",
                      isEven ? "lg:order-2" : "lg:order-1",
                      washClasses[item.wash],
                      "hover:shadow-card hover:-translate-y-0.5 transition-all duration-300"
                    )}
                  >
                    {/* Watercolor paper wash overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.7)_0%,transparent_75%)]"
                      aria-hidden="true"
                    />

                    <div className="relative z-10 w-full">
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-charcoal font-heading leading-tight mb-4">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-charcoal/70 leading-relaxed font-body mb-6">
                        {item.description}
                      </p>
                      <Link
                        href={item.href}
                        className="inline-flex items-center text-sm font-bold font-body text-forest hover:text-charcoal transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest/40 rounded px-1 -ml-1"
                      >
                        Learn More
                      </Link>
                    </div>
                  </m.div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SeedsOfChange;
