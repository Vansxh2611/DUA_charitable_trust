"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@/hooks/useGSAP";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { applyImageTransition } from "@/animations/imageTransitions";
import { cn } from "@/utils/cn";

export interface RevealImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  aspectRatio?: string; // e.g. "aspect-video" or "aspect-[4/3]"
}

export const RevealImage: React.FC<RevealImageProps> = ({
  src,
  alt,
  className,
  containerClassName,
  priority = false,
  aspectRatio = "aspect-video",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageWrapperRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !containerRef.current || !imageWrapperRef.current) return;

    const timeline = applyImageTransition(imageWrapperRef.current, containerRef.current);

    return () => {
      if (timeline.scrollTrigger) {
        timeline.scrollTrigger.kill();
      }
      timeline.kill();
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full overflow-hidden rounded-[32px] border border-[#111827]/5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] select-none",
        aspectRatio,
        containerClassName
      )}
    >
      <div
        ref={imageWrapperRef}
        className={cn(
          "relative w-full h-full will-change-[transform,opacity,filter]",
          prefersReducedMotion ? "opacity-100" : "opacity-0 scale-94 blur-[10px] translate-y-[160px]"
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={cn("object-cover", className)}
          priority={priority}
        />
      </div>
    </div>
  );
};
export default RevealImage;
