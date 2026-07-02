"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";
import { cn } from "@/utils/cn";

export interface AnimatedCounterProps {
  target: number;
  duration?: number; // in seconds
  delay?: number; // in seconds
  prefix?: string;
  suffix?: string;
  decimals?: number;
  formatting?: boolean;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  duration = 2,
  delay = 0,
  prefix = "",
  suffix = "",
  decimals = 0,
  formatting = true,
  className,
}) => {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, target, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
      onUpdate: (latest) => {
        setCount(latest);
      },
    });

    return () => controls.stop();
  }, [isInView, target, duration, delay]);

  const formatNumber = (num: number): string => {
    const rounded = num.toFixed(decimals);
    
    if (!formatting) return rounded;

    const parts = rounded.split(".");
    // Format integer part with commas
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\n))/g, ",");
    return parts.join(".");
  };

  return (
    <span ref={containerRef} className={cn("font-heading font-bold select-none", className)}>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
