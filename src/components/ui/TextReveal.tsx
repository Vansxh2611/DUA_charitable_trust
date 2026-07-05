"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/utils/cn";

export interface TextRevealProps {
  children: string;
  mode?: "chars" | "words";
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
  animate?: "visible" | "hidden";
}

export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  mode = "words",
  delay = 0,
  duration = 0.6,
  stagger = 0.03,
  className,
  animate = "visible",
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Fallback for prefers-reduced-motion to simplify accessibility
  if (shouldReduceMotion) {
    return <span className={className}>{children}</span>;
  }

  const words = children.split(" ");
  let charIndexCounter = 0;

  return (
    <span className={cn("relative inline", className)}>
      {/* 
        1. Selectable, copyable, and search-indexable real text.
        Rendered absolutely with opacity-0 to cover the visual spans and support selections.
      */}
      <span className="absolute inset-0 opacity-0 select-text pointer-events-auto z-10">
        {children}
      </span>

      {/* 
        2. Visual animated spans rendered in normal layout flow.
        Inherits parent typography, centering, and wrapping styles natively.
      */}
      <span aria-hidden="true" className="inline select-none pointer-events-none">
        {mode === "chars"
          ? words.map((word, wordIdx) => (
              <span key={wordIdx} className="inline-flex mr-[0.25em] overflow-hidden h-full">
                {word.split("").map((char, charIdx) => {
                  const currentIdx = charIndexCounter++;
                  return (
                    <motion.span
                      key={charIdx}
                      initial={{ y: "100%", opacity: 0 }}
                      animate={animate === "visible" ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
                      transition={{
                        duration,
                        ease: [0.16, 1, 0.3, 1], // easeOutExpo
                        delay: delay + currentIdx * stagger,
                      }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </span>
            ))
          : words.map((word, idx) => (
              <span key={idx} className="inline-block overflow-hidden mr-[0.25em] h-full">
                <motion.span
                  key={idx}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={animate === "visible" ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
                  transition={{
                    duration,
                    ease: [0.16, 1, 0.3, 1], // easeOutExpo
                    delay: delay + idx * stagger,
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
      </span>
    </span>
  );
};

export default TextReveal;
