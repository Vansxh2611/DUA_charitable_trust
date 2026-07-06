"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/utils/cn";
import { Sparkles } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface SectionDividerProps {
  /**
   * Style variant.
   * SVG Layout variants: "wave", "curve", "blob", "diagonal", "liquid", "layered", "minimal", "organic"
   * Legacy line-divider variants: "premium", "decorative", "minimal-line"
   */
  variant?: "wave" | "curve" | "blob" | "diagonal" | "liquid" | "layered" | "minimal" | "organic" | "premium" | "decorative" | "minimal-line";
  
  /**
   * Vertically flip the SVG shape (true for bottom of section, false for top).
   */
  flip?: boolean;
  
  /**
   * Enable scroll/morph animations.
   */
  animate?: boolean;
  
  /**
   * Height of the layout SVG in pixels.
   */
  height?: number;
  
  /**
   * Primary color for the divider path.
   * Can be a Tailwind color class (e.g. "bg-cream", "mint") or hex/rgb/var/hsl code.
   */
  color?: string;
  
  /**
   * Background color of the SVG container.
   */
  bgColor?: string;
  
  /**
   * Parallax vertical offset multiplier (10px to 20px). Defaults to 0.15.
   */
  parallaxSpeed?: number;

  /**
   * Custom icon for legacy variants.
   */
  icon?: React.ReactNode;
  
  className?: string;
}

// Maps Tailwind background class names or custom strings to their respective CSS variables
const resolveColor = (colorStr?: string): string => {
  if (!colorStr) return "currentColor";
  if (
    colorStr.startsWith("#") ||
    colorStr.startsWith("rgb") ||
    colorStr.startsWith("var") ||
    colorStr.startsWith("hsl")
  ) {
    return colorStr;
  }
  const clean = colorStr.replace("bg-", "").replace("text-", "");
  switch (clean) {
    case "cream":
      return "var(--cream)";
    case "sage":
      return "var(--sage)";
    case "mint":
      return "var(--mint)";
    case "beige":
      return "var(--beige)";
    case "forest":
      return "var(--forest)";
    case "navy":
      return "var(--navy)";
    case "footer-bg":
      return "var(--footer-bg)";
    case "card-bg":
      return "var(--card-bg)";
    default:
      // Fallback: check if it's a CSS custom variable formatted as a tailwind color
      if (colorStr.includes("/")) {
        // Handle opacity, e.g. "mint/30" or "forest/10"
        const [base, opacity] = colorStr.split("/");
        const baseColor = resolveColor(base);
        if (baseColor.startsWith("var")) {
          // Wrap in color-mix if CSS variable
          return `color-mix(in srgb, ${baseColor} ${opacity}%, transparent)`;
        }
      }
      return colorStr;
  }
};

export const SectionDivider: React.FC<SectionDividerProps> = ({
  variant = "curve",
  flip = false,
  animate = true,
  height = 100,
  color = "cream",
  bgColor = "transparent",
  parallaxSpeed = 0.15,
  icon,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Scroll tracking for subtle parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Subtle vertical offset parallax shift (-15px to 15px)
  const yParallax = useTransform(
    scrollYProgress,
    [0, 1],
    [flip ? 15 : -15, flip ? -15 : 15]
  );
  
  const y = prefersReducedMotion || !animate ? 0 : yParallax;

  const resolvedColor = resolveColor(color);
  const resolvedBgColor = resolveColor(bgColor);

  // SVG dimensions
  const viewBox = "0 0 1440 120";

  // --- Path geometries for morph animations ---
  const paths = {
    wave: {
      initial: "M0,120 C240,120 480,120 720,120 C960,120 1200,120 1440,120 L1440,120 L0,120 Z",
      animate: "M0,90 C240,40 480,140 720,80 C960,20 1200,130 1440,65 L1440,120 L0,120 Z",
    },
    curve: {
      initial: "M0,120 Q720,120 1440,120 L1440,120 L0,120 Z",
      animate: "M0,120 Q720,20 1440,120 L1440,120 L0,120 Z",
    },
    blob: {
      initial: "M0,120 C360,120 540,120 720,120 C900,120 1080,120 1440,120 L1440,120 L0,120 Z",
      animate: "M0,120 C360,120 500,28 720,28 C940,28 1080,120 1440,120 L1440,120 L0,120 Z",
    },
    diagonal: {
      initial: "M0,120 L1440,120 L1440,120 L0,120 Z",
      animate: "M0,120 L1440,25 L1440,120 L0,120 Z",
    },
    liquid: {
      initial: "M0,120 C240,120 480,120 720,120 C960,120 1200,120 1440,120 L1440,120 L0,120 Z",
      animate: "M0,110 C200,110 320,15 480,15 C640,15 780,110 960,110 C1140,110 1240,35 1440,110 L1440,120 L0,120 Z",
    },
    layered: {
      // Background Wave
      back: {
        initial: "M0,120 C240,120 480,120 720,120 C960,120 1200,120 1440,120 L1440,120 L0,120 Z",
        animate: "M0,95 C240,55 480,135 720,85 C960,35 1200,115 1440,75 L1440,120 L0,120 Z",
      },
      // Foreground Wave
      front: {
        initial: "M0,120 C240,120 480,120 720,120 C960,120 1200,120 1440,120 L1440,120 L0,120 Z",
        animate: "M0,105 C300,135 540,65 780,105 C1020,145 1200,55 1440,90 L1440,120 L0,120 Z",
      }
    },
    minimal: {
      initial: "M0,60 Q720,60 1440,60",
      animate: "M0,60 Q720,25 1440,60",
    },
    organic: {
      initial: "M0,120 C240,120 480,120 720,120 C840,120 960,120 1080,120 C1200,120 1320,120 1440,120 L1440,120 L0,120 Z",
      animate: "M0,120 C180,120 280,35 480,35 C640,35 800,90 960,90 C1120,90 1260,15 1440,15 L1440,120 L0,120 Z",
    }
  };

  // --- Framer Motion variants ---
  const pathVariants = (pathObj: { initial: string; animate: string }) => ({
    hidden: { d: pathObj.initial },
    visible: {
      d: pathObj.animate,
      transition: {
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
      },
    },
  });

  const blobVariants = {
    hidden: { scale: 0.96, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.0,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const centerVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { delay: 0.4, duration: 0.5, type: "spring", stiffness: 200, damping: 15 },
    },
  };

  // -------------------------------------------------------------
  // LEGACY INLINE LINE-DIVIDERS (premium, decorative, minimal-line)
  // For backwards compatibility on details pages and showcase.
  // -------------------------------------------------------------
  const isLegacy = variant === "premium" || variant === "decorative" || variant === "minimal-line";

  if (isLegacy) {
    const currentIcon = icon || <Sparkles className="w-4 h-4 text-[#B38728]" />;
    
    return (
      <div className={cn("relative flex items-center justify-center my-12 w-full select-none", className)}>
        {variant === "minimal-line" && (
          <div className="flex items-center w-full max-w-lg">
            <motion.div
              variants={animate ? lineVariants : undefined}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="h-[1px] bg-charcoal/10 flex-grow origin-right"
            />
            <motion.div
              variants={animate ? centerVariants : undefined}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="w-2 h-2 mx-4 rounded-full bg-linear-to-r from-[#BF953F] to-[#B38728]"
            />
            <motion.div
              variants={animate ? lineVariants : undefined}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="h-[1px] bg-charcoal/10 flex-grow origin-left"
            />
          </div>
        )}

        {variant === "premium" && (
          <div className="flex items-center w-full max-w-2xl">
            <motion.div
              variants={animate ? lineVariants : undefined}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="h-[1px] bg-linear-to-l from-charcoal/20 via-charcoal/5 to-transparent flex-grow origin-right"
            />
            <motion.div
              variants={animate ? centerVariants : undefined}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex items-center justify-center p-2.5 mx-4 rounded-full bg-cream border border-[#BF953F]/30 shadow-xs"
            >
              {currentIcon}
            </motion.div>
            <motion.div
              variants={animate ? lineVariants : undefined}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="h-[1px] bg-linear-to-r from-charcoal/20 via-charcoal/5 to-transparent flex-grow origin-left"
            />
          </div>
        )}

        {variant === "decorative" && (
          <div className="flex flex-col items-center gap-1.5 w-full max-w-md">
            <div className="flex items-center w-full">
              <motion.div
                variants={animate ? lineVariants : undefined}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="h-[1px] bg-linear-to-l from-charcoal/15 to-transparent flex-grow origin-right"
              />
              <motion.div
                variants={animate ? centerVariants : undefined}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="mx-3 text-[#B38728] flex items-center justify-center"
              >
                {currentIcon}
              </motion.div>
              <motion.div
                variants={animate ? lineVariants : undefined}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="h-[1px] bg-linear-to-r from-charcoal/15 to-transparent flex-grow origin-left"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#BF953F]/40" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#BF953F]/70" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#BF953F]/40" />
            </motion.div>
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------
  // NEW PREMIUM FULL-WIDTH SVG dividers
  // -------------------------------------------------------------
  
  // Custom transform style for vertical and/or horizontal flipping
  const flipStyle = flip ? { transform: "scaleY(-1)" } : undefined;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full z-20 pointer-events-none overflow-hidden select-none",
        className
      )}
      style={{
        height: `${height}px`,
        backgroundColor: resolvedBgColor,
        ...flipStyle,
      }}
    >
      <motion.div
        className="w-full h-full"
        style={{ y }} // GPU accelerated parallax translation
      >
        {/* --- Minimal Separator Arc Line --- */}
        {variant === "minimal" && (
          <svg
            className="w-full h-full"
            viewBox={viewBox}
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              variants={animate && !prefersReducedMotion ? pathVariants(paths.minimal) : undefined}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              d={animate && !prefersReducedMotion ? paths.minimal.initial : paths.minimal.animate}
              stroke={resolvedColor}
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        )}

        {/* --- Smooth Curve Arch --- */}
        {variant === "curve" && (
          <svg
            className="w-full h-full"
            viewBox={viewBox}
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              variants={animate && !prefersReducedMotion ? pathVariants(paths.curve) : undefined}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              d={animate && !prefersReducedMotion ? paths.curve.initial : paths.curve.animate}
              fill={resolvedColor}
            />
          </svg>
        )}

        {/* --- Wave Divider --- */}
        {variant === "wave" && (
          <svg
            className="w-full h-full"
            viewBox={viewBox}
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              variants={animate && !prefersReducedMotion ? pathVariants(paths.wave) : undefined}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              d={animate && !prefersReducedMotion ? paths.wave.initial : paths.wave.animate}
              fill={resolvedColor}
            />
          </svg>
        )}

        {/* --- Organic Blob Divider --- */}
        {variant === "blob" && (
          <motion.svg
            className="w-full h-full"
            viewBox={viewBox}
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            variants={animate && !prefersReducedMotion ? blobVariants : undefined}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.path
              variants={animate && !prefersReducedMotion ? pathVariants(paths.blob) : undefined}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              d={animate && !prefersReducedMotion ? paths.blob.initial : paths.blob.animate}
              fill={resolvedColor}
            />
          </motion.svg>
        )}

        {/* --- Diagonal Cut Divider --- */}
        {variant === "diagonal" && (
          <svg
            className="w-full h-full"
            viewBox={viewBox}
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              variants={animate && !prefersReducedMotion ? pathVariants(paths.diagonal) : undefined}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              d={animate && !prefersReducedMotion ? paths.diagonal.initial : paths.diagonal.animate}
              fill={resolvedColor}
            />
          </svg>
        )}

        {/* --- Liquid transition divider --- */}
        {variant === "liquid" && (
          <svg
            className="w-full h-full"
            viewBox={viewBox}
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              variants={animate && !prefersReducedMotion ? pathVariants(paths.liquid) : undefined}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              d={animate && !prefersReducedMotion ? paths.liquid.initial : paths.liquid.animate}
              fill={resolvedColor}
            />
          </svg>
        )}

        {/* --- Layered Staggered Wave Divider --- */}
        {variant === "layered" && (
          <svg
            className="w-full h-full"
            viewBox={viewBox}
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background layered wave (semi-transparent) */}
            <motion.path
              variants={animate && !prefersReducedMotion ? pathVariants(paths.layered.back) : undefined}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              d={animate && !prefersReducedMotion ? paths.layered.back.initial : paths.layered.back.animate}
              fill={resolvedColor}
              opacity={0.35}
            />
            {/* Foreground layered wave (solid color) */}
            <motion.path
              variants={animate && !prefersReducedMotion ? pathVariants(paths.layered.front) : undefined}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              d={animate && !prefersReducedMotion ? paths.layered.front.initial : paths.layered.front.animate}
              fill={resolvedColor}
              opacity={1}
            />
          </svg>
        )}

        {/* --- Abstract Organic Shape --- */}
        {variant === "organic" && (
          <svg
            className="w-full h-full"
            viewBox={viewBox}
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              variants={animate && !prefersReducedMotion ? pathVariants(paths.organic) : undefined}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              d={animate && !prefersReducedMotion ? paths.organic.initial : paths.organic.animate}
              fill={resolvedColor}
            />
          </svg>
        )}
      </motion.div>
    </div>
  );
};

export default SectionDivider;
