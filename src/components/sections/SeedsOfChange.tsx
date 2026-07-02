"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { m, useReducedMotion, Variants } from "framer-motion";
import { cn } from "@/utils/cn";
import { seedsIntro, seedsItems } from "@/constants/seedsOfChange";
import { Container } from "../ui/Container";

const SeedsTextReveal: React.FC<{
  title: string;
  description: string;
  href: string;
  textContainer: Variants;
  textItem: Variants;
}> = ({ title, description, href, textContainer, textItem }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = React.useState(false);

  React.useEffect(() => {
    if (!ref.current) return;

    let observer: IntersectionObserver;
    const timer = setTimeout(() => {
      observer = new IntersectionObserver(
        ([entry]) => {
          setIsInView(entry.isIntersecting);
        },
        { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
      );
      if (ref.current) {
        observer.observe(ref.current);
      }
    }, 150);

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <m.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={textContainer}
      className="relative z-10 w-full text-left"
    >
      <div className="overflow-hidden">
        <m.h3
          variants={textItem}
          style={{ willChange: "transform, opacity" }}
          className="text-2xl sm:text-3xl font-extrabold text-charcoal font-heading leading-tight mb-4"
        >
          {title}
        </m.h3>
      </div>
      
      <div className="overflow-hidden">
        <m.p
          variants={textItem}
          style={{ willChange: "transform, opacity" }}
          className="text-sm sm:text-base text-charcoal/70 leading-relaxed font-body mb-6"
        >
          {description}
        </m.p>
      </div>

      <div className="overflow-hidden">
        <m.div 
          variants={textItem}
          style={{ willChange: "transform, opacity" }}
        >
          <Link
            href={href}
            className="inline-flex items-center text-sm font-bold font-body text-forest hover:text-charcoal transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest/40 rounded px-1 -ml-1"
          >
            Learn More
          </Link>
        </m.div>
      </div>
    </m.div>
  );
};

export const SeedsOfChange: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants for text reveal
  const textContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const textItem = {
    hidden: { 
      opacity: 0, 
      x: shouldReduceMotion ? 0 : -24 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.9, 
        ease: [0.22, 1, 0.36, 1] // smooth easeOutQuart
      }
    },
  };

  // Wash variants to theme color classes mapping (made more saturated/darker as requested)
  const washClasses = {
    sage: "bg-gradient-to-br from-sage/30 via-sage/65 to-sage/45",
    mint: "bg-gradient-to-br from-mint/30 via-mint/65 to-mint/45",
    beige: "bg-gradient-to-br from-beige/35 via-beige/75 to-beige/50",
    cream: "bg-gradient-to-br from-cream via-sage/30 to-cream",
  };

  return (
    <section className="py-5 bg-cream relative overflow-hidden" aria-labelledby="seeds-section-title">
      <Container size="xl">
        <div className="flex flex-col gap-10 sm:gap-12 md:gap-16 w-full">
          {/* Top Intro Card - Static */}
          <div
            className={cn(
              "relative bg-gradient-to-br from-cream via-sage/10 to-cream p-8 sm:p-12 md:p-14 rounded-lg border border-charcoal/10 shadow-soft overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6",
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
                className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-charcoal font-heading leading-tight mb-3"
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
                className="inline-flex items-center justify-center px-6 py-3 bg-accent/20 border border-accent/30 text-charcoal hover:bg-accent/30 rounded-lg font-heading font-extrabold text-sm shadow-xs hover:shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest/40"
              >
                {seedsIntro.buttonLabel}
              </Link>
            </div>
          </div>

          {/* alternating row items */}
          <div className="flex flex-col gap-8 sm:gap-10">
            {seedsItems.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={item.id} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                  {/* Image Tile - Static */}
                  <div
                    className={cn(
                      "relative min-h-[320px] sm:min-h-[360px] lg:min-h-[400px] rounded-lg overflow-hidden border border-charcoal/10 shadow-soft w-full",
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
                  </div>

                  {/* Text Tile - Static Container */}
                  <div
                    className={cn(
                      "relative p-8 sm:p-12 md:p-14 min-h-[320px] sm:min-h-[360px] lg:min-h-[400px] rounded-lg overflow-hidden border border-charcoal/10 shadow-soft flex flex-col justify-center items-start w-full",
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

                    {/* Staggered text reveal container */}
                    <SeedsTextReveal
                      title={item.title}
                      description={item.description}
                      href={item.href}
                      textContainer={textContainer}
                      textItem={textItem}
                    />
                  </div>
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
