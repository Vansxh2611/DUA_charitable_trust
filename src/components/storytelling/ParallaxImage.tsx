"use client";

import React, { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { cn } from "@/utils/cn";

export interface ParallaxImageProps {
  children: React.ReactNode;
  speed?: 0.8 | 0.5 | 0.3; // Speed multipliers: 0.8 for image, 0.5 for decor, 0.3 for glows
  className?: string;
}

export const ParallaxImage: React.FC<ParallaxImageProps> = ({
  children,
  speed = 0.8,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !containerRef.current || !elementRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    // Compute the offset based on speed (higher speed = less parallax shift)
    const parallaxOffset = (1 - speed) * 120; // range in pixels

    const tween = gsap.fromTo(
      elementRef.current,
      { y: -parallaxOffset },
      {
        y: parallaxOffset,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    return () => {
      if (tween.scrollTrigger) {
        tween.scrollTrigger.kill();
      }
      tween.kill();
    };
  }, [prefersReducedMotion, speed]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden w-full h-full", className)}
    >
      <div
        ref={elementRef}
        className="w-full h-full will-change-transform"
      >
        {children}
      </div>
    </div>
  );
};
export default ParallaxImage;
