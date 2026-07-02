"use client";

import React, { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { applyTextTransition } from "@/animations/textTransitions";
import { applyImageTransition } from "@/animations/imageTransitions";
import { cn } from "@/utils/cn";

export interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  triggerHook?: string;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  id,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Locate and animate all images
      const images = containerRef.current?.querySelectorAll(".story-image-target");
      images?.forEach((image) => {
        applyImageTransition(image, containerRef.current!);
      });

      // 2. Locate and animate all text blocks
      const textContainers = containerRef.current?.querySelectorAll(".story-text-container");
      textContainers?.forEach((textContainer) => {
        applyTextTransition(textContainer);
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      id={id}
      className={cn("w-full relative", className)}
    >
      {children}
    </div>
  );
};
export default AnimatedSection;
