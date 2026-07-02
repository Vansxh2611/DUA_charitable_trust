"use client";

import React, { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { cn } from "@/utils/cn";

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  offset?: number; // Distance in pixels to move
  scrub?: boolean | number;
  start?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className,
  delay = 0,
  duration = 1.0,
  direction = "up",
  offset = 50,
  scrub = 1,
  start = "top 90%",
}) => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !elementRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    // Establish coordinates based on direction
    let xVal = 0;
    let yVal = 0;
    if (direction === "up") yVal = offset;
    if (direction === "down") yVal = -offset;
    if (direction === "left") xVal = offset;
    if (direction === "right") xVal = -offset;

    const tween = gsap.fromTo(
      elementRef.current,
      {
        opacity: 0,
        x: xVal,
        y: yVal,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        ease: "power2.out",
        delay,
        duration,
        scrollTrigger: {
          trigger: elementRef.current,
          start,
          end: "bottom 30%",
          scrub,
        },
      }
    );

    return () => {
      if (tween.scrollTrigger) {
        tween.scrollTrigger.kill();
      }
      tween.kill();
    };
  }, [prefersReducedMotion, delay, duration, direction, offset, scrub, start]);

  return (
    <div
      ref={elementRef}
      className={cn(
        "will-change-[transform,opacity]",
        prefersReducedMotion ? "opacity-100 translate-y-0" : "opacity-0",
        className
      )}
    >
      {children}
    </div>
  );
};
export default ScrollReveal;
