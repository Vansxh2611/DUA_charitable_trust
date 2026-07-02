"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { styles } from "./styles";

export type CardVariant = "default" | "glass" | "premium" | "outline";
export type AnimationDirection = "up" | "down" | "left" | "right" | "none";

export interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number; // seconds
  duration?: number; // seconds
  className?: string;
  variant?: CardVariant;
  hover?: boolean;
  animationDirection?: AnimationDirection;
  glow?: boolean;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  className,
  variant = "default",
  hover = true,
  animationDirection = "up",
  glow = false,
}) => {
  // Configurable scroll reveal direction coordinates
  const directionOffset = 40;
  const directionMap = {
    up: { y: directionOffset, x: 0 },
    down: { y: -directionOffset, x: 0 },
    left: { x: directionOffset, y: 0 },
    right: { x: -directionOffset, y: 0 },
    none: { x: 0, y: 0 },
  };

  const initialAnimation = {
    opacity: 0,
    ...directionMap[animationDirection],
  };

  const animateInView = {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
    },
  };

  // Hover animations using spring physics
  const hoverAnimation = hover
    ? {
        y: -8,
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }
    : {};

  const baseCardStyles = "relative rounded-[32px] overflow-hidden select-none cursor-default";

  const variantStyles = {
    default: "bg-cream border border-forest/10 shadow-xs text-charcoal",
    glass: cn(styles.glass.bg, styles.glass.border, "text-charcoal"),
    premium: "bg-charcoal text-cream border border-[#BF953F]/40 shadow-md",
    outline: "bg-transparent border border-charcoal/10 hover:border-charcoal/30 text-charcoal",
  };

  // Add shadow mapping for non-hover state
  const shadowMap = {
    default: "shadow-xs",
    glass: "shadow-xs",
    premium: "shadow-md",
    outline: "shadow-none",
  };

  const isPremium = variant === "premium";

  return (
    <motion.div
      initial={initialAnimation}
      whileInView={animateInView}
      whileHover={hoverAnimation}
      viewport={{ once: true, amount: 0.15 }}
      className={cn(
        baseCardStyles,
        variantStyles[variant],
        shadowMap[variant],
        "group",
        className
      )}
    >
      {/* Background glow effects */}
      {(glow || isPremium) && (
        <span className="absolute -inset-[1px] bg-linear-to-r from-[#BF953F] via-[#F7DF7C] to-[#B38728] rounded-[inherit] opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500 pointer-events-none z-0" />
      )}

      {/* Decorative top border for premium variant */}
      {isPremium && (
        <span className="absolute top-0 left-0 right-0 h-[3px] bg-linear-to-r from-[#BF953F] via-[#F7DF7C] to-[#B38728] z-10" />
      )}

      {/* Children content wrapper */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};

export default AnimatedCard;
