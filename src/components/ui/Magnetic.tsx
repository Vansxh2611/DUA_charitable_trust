"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/utils/cn";

export interface MagneticProps {
  children: React.ReactNode;
  strength?: number; // Distance multiplier for magnetic attraction (e.g. 0.3)
  className?: string;
}

export const Magnetic: React.FC<MagneticProps> = ({ children, strength = 0.35, className }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Monitor device layout interaction capabilities
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        "ontouchstart" in window || navigator.maxTouchPoints > 0
      );
    };
    checkTouch();
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (shouldReduceMotion || isTouchDevice || !ref.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Relative displacement offsets from the component's midpoint
    const offsetX = clientX - centerX;
    const offsetY = clientY - centerY;

    x.set(offsetX * strength);
    y.set(offsetY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Immediate pass-through layout for touch screens or reduced motion requests
  if (shouldReduceMotion || isTouchDevice) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative inline-block", className)}
    >
      <motion.div
        style={{ x: springX, y: springY }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Magnetic;
