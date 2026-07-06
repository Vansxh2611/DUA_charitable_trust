"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Magnetic } from "./index";

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [percent, setPercent] = useState(0);

  const { scrollYProgress } = useScroll();

  // Map scroll progress (0 to 1) to stroke dash offset (perimeter = 2 * PI * 16 = 100.53)
  const strokeDashoffset = useTransform(scrollYProgress, [0, 1], [100.53, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync scroll percentage for hover numeric display
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setPercent(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-50">
          <Magnetic strength={0.35}>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileTap={{ scale: 0.92 }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={scrollToTop}
              className="relative flex items-center justify-center w-12 h-12 rounded-full bg-cream border border-forest/10 shadow-md backdrop-blur-md cursor-pointer overflow-visible group"
              aria-label="Back to top"
            >
              {/* Soft Pulsing Ambient Glow Halo */}
              <div className="absolute inset-0 rounded-full bg-forest/5 blur-xs group-hover:bg-forest/10 transition-colors duration-300 scale-110 -z-10 animate-pulse" />

              {/* Circular SVG Scroll Progress Ring */}
              <svg
                width="48"
                height="48"
                viewBox="0 0 36 36"
                className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
              >
                {/* Background track circle */}
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="rgba(44, 62, 43, 0.08)"
                  strokeWidth="2.5"
                />
                {/* Active progress circle */}
                <motion.circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="var(--forest, #2C3E2B)"
                  strokeWidth="2.5"
                  strokeDasharray="100.53"
                  style={{ strokeDashoffset }}
                  strokeLinecap="round"
                />
              </svg>

              {/* Cross-fade between Arrow Icon and Scroll Percentage */}
              <AnimatePresence mode="wait">
                {isHovered ? (
                  <motion.span
                    key="percentage"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.2 }}
                    className="z-10 font-heading text-[11px] font-bold text-forest whitespace-nowrap select-none"
                  >
                    {percent}%
                  </motion.span>
                ) : (
                  <motion.svg
                    key="arrow"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--forest, #2C3E2B)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.2 }}
                    className="z-10"
                  >
                    <line x1="12" y1="19" x2="12" y2="5" />
                    <polyline points="5 12 12 5 19 12" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </motion.button>
          </Magnetic>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
