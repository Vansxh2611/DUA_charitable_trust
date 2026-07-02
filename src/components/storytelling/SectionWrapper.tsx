"use client";

import React, { useRef } from "react";
import { cn } from "@/utils/cn";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useGSAP } from "@/hooks/useGSAP";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  glowPosition?: "top-left" | "bottom-right" | "center" | "none";
  bgColor?: string; // custom background override
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  id,
  className,
  glowPosition = "none",
  bgColor = "bg-cream/40",
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Subtle background glow drift on scroll
  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current || !glowRef.current || glowPosition === "none") return;

    gsap.registerPlugin(ScrollTrigger);

    const tween = gsap.fromTo(
      glowRef.current,
      { y: -30, scale: 0.95 },
      {
        y: 30,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
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
  }, [prefersReducedMotion, glowPosition]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(
        "relative py-5 flex flex-col justify-center items-center overflow-hidden w-full select-none",
        bgColor,
        className
      )}
    >
      {/* 1) Subtle Grain/Noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 2) Ambient Glow Element */}
      {glowPosition !== "none" && (
        <div
          ref={glowRef}
          className={cn(
            "absolute rounded-full bg-gold/5 blur-[100px] w-[35vw] h-[35vw] pointer-events-none z-0 will-change-[transform,scale]",
            glowPosition === "top-left" && "top-[10%] left-[10%]",
            glowPosition === "bottom-right" && "bottom-[10%] right-[10%]",
            glowPosition === "center" && "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          )}
        />
      )}

      {/* 3) Main layout container slot */}
      <div className="w-full relative z-10">
        {children}
      </div>
    </section>
  );
};
export default SectionWrapper;
