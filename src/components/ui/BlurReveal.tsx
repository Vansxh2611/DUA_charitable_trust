"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/utils/cn";

export interface BlurRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  blur?: number;
  className?: string;
}

export const BlurReveal: React.FC<BlurRevealProps> = ({
  children,
  delay = 0,
  duration = 0.8,
  blur = 12,
  className,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const blurRevealVariants = {
    hidden: {
      opacity: 0,
      filter: shouldReduceMotion ? "blur(0px)" : `blur(${blur}px)`,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay,
        duration,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={blurRevealVariants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

export default BlurReveal;
