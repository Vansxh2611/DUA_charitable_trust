"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { useGSAP } from "@/hooks/useGSAP";
import { useReducedMotion } from "framer-motion";
import ScrollTrigger from "gsap/ScrollTrigger";

export interface StickyScrollStep {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export interface StickyScrollSectionProps {
  steps: StickyScrollStep[];
  className?: string;
}

export const StickyScrollSection: React.FC<StickyScrollSectionProps> = ({ steps, className }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftPanelRef = useRef<HTMLDivElement | null>(null);
  const stepsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shouldReduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  // Monitor loading completions to recalculate GSAP measurements
  const [imagesLoaded, setImagesLoaded] = useState(0);

  useEffect(() => {
    if (imagesLoaded >= steps.length) {
      // Trigger a ScrollTrigger recalculation once all imagery height settles
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }
  }, [imagesLoaded, steps.length]);

  // Active step transitions using GSAP ScrollTrigger context wrapper
  useGSAP(() => {
    // Completely disable GSAP scroll linking if prefers-reduced-motion is active
    if (shouldReduceMotion) return;

    // Track scrolling Narrative Steps (runs on all viewports, updating index)
    stepsRefs.current.forEach((stepEl, idx) => {
      if (!stepEl) return;
      ScrollTrigger.create({
        trigger: stepEl,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => {
          if (self.isActive) {
            setActiveStep(idx);
          }
        },
      });
    });
  }, [shouldReduceMotion]);

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex flex-col md:flex-row w-full bg-cream border-t border-b border-forest/5",
        className
      )}
    >
      {/* 
        Left Side: Sticky Media Display Panel.
        On mobile, it scrolls naturally. On desktop, it is sticky.
      */}
      <div
        ref={leftPanelRef}
        className={cn(
          "w-full md:w-1/2 overflow-hidden z-20",
          shouldReduceMotion
            ? "h-[250px] md:h-[450px] md:sticky md:top-24 rounded-3xl"
            : "h-[300px] md:sticky md:top-24 md:h-[calc(100vh-120px)] flex items-center justify-center p-4 md:p-12"
        )}
      >
        <div className="w-full h-full relative rounded-3xl overflow-hidden shadow-xs border border-forest/10 bg-sage/20">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={cn(
                "absolute inset-0 transition-all duration-700 ease-in-out",
                shouldReduceMotion
                  ? activeStep === idx ? "opacity-100 scale-100 z-10" : "opacity-0 scale-98 z-0"
                  : activeStep === idx ? "opacity-100 scale-100 translate-y-0 z-10" : "opacity-0 scale-95 translate-y-4 z-0"
              )}
            >
              <Image
                src={step.imageSrc}
                alt={step.imageAlt}
                fill
                priority={idx === 0}
                onLoad={handleImageLoad}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* 
        Right Side: Narrative Scrolling Texts.
        Each step takes sufficient viewport space to trigger boundaries.
      */}
      <div className="w-full md:w-1/2 flex flex-col px-6 md:px-16 pb-16 md:pb-0 z-10">
        {steps.map((step, idx) => (
          <div
            key={idx}
            ref={(el) => {
              stepsRefs.current[idx] = el;
            }}
            className={cn(
              "flex flex-col justify-center min-h-[30vh] md:min-h-screen py-16 md:py-20 transition-all duration-500 text-left",
              activeStep === idx
                ? "opacity-100 translate-x-0"
                : "opacity-45 -translate-x-2 md:opacity-20"
            )}
          >
            <span className="text-xs font-bold font-heading uppercase tracking-wider text-forest/75 mb-3 block">
              Step {idx + 1}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-charcoal font-heading leading-tight mb-4">
              {step.title}
            </h3>
            <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed font-body">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StickyScrollSection;
