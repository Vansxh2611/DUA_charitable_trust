"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/utils/cn";

export interface ImageRevealProps {
  src: string;
  alt: string;
  parallaxStrength?: number; // Parallax translation offset range in pixels
  delay?: number;
  duration?: number;
  className?: string;
  priority?: boolean;
}

export const ImageReveal: React.FC<ImageRevealProps> = ({
  src,
  alt,
  parallaxStrength = 0,
  delay = 0,
  duration = 1.2,
  className,
  priority = false,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // 1. Scroll-linked Parallax coordinates
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Safe mapping of vertical movement range
  const y = useTransform(scrollYProgress, [0, 1], [-parallaxStrength, parallaxStrength]);

  // 2. Reveal sweep using clipPath polygon masks
  const clipVariants = {
    hidden: {
      clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
    },
    visible: {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      transition: {
        delay,
        duration,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
      },
    },
  };

  // 3. Zoom scale animation on inner image container
  const zoomVariants = {
    hidden: {
      scale: 1.15,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay,
        duration,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden w-full h-full", className)}
    >
      {shouldReduceMotion ? (
        // Clean simplified opacity fade for accessibility users
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay, duration: 0.5 }}
          className="w-full h-full relative"
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />
        </motion.div>
      ) : (
        <motion.div
          variants={clipVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="w-full h-full relative"
        >
          <motion.div
            variants={zoomVariants}
            style={parallaxStrength > 0 ? { y, scale: 1.15 } : {}}
            className="w-full h-full relative"
          >
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ImageReveal;
