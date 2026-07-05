"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLoading } from "@/context/LoadingContext";

export const InitialLoader: React.FC = () => {
  const { startReveal, completeLoading } = useLoading();
  const [isVisible, setIsVisible] = useState(true);
  const [stage, setStage] = useState<1 | 2 | 3 | 4 | 5 | 7>(1);

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // 1. Accessibility bypass for prefers-reduced-motion
    if (shouldReduceMotion) {
      document.body.style.overflow = "";
      startReveal();
      completeLoading();
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 0);
      return () => clearTimeout(timer);
    }

    // Prevent body scrolling during the loading phase
    document.body.style.overflow = "hidden";

    // 2. Stage Timings Sequence (Stages 1 to 5, 7)
    // Stage 1 (Pulse): 0ms - 450ms
    // Stage 2 (Expansion): 450ms - 1000ms
    const t2 = setTimeout(() => setStage(2), 450);

    // Stage 3 (Outline Progress): 1000ms - 2200ms
    const t3 = setTimeout(() => setStage(3), 1000);

    // Stage 4 (Fill & Golden Sweep): 2200ms - 3000ms
    const t4 = setTimeout(() => setStage(4), 2200);

    // Stage 5 (Mission Badges reveal): 3000ms - 4300ms
    const t5 = setTimeout(() => setStage(5), 3000);

    // Stage 7 (Reveal Exit Overlay): Starts at 4300ms
    const t7 = setTimeout(() => {
      setStage(7);
      startReveal(); // Triggers Hero & Navbar fades/slides

      // Complete unmount after overlay slide-up transition finishes (1.05s)
      const tUnmount = setTimeout(() => {
        setIsVisible(false);
        completeLoading(); // Launches floating leaf/flower elements in Hero
        document.body.style.overflow = "";
      }, 1050);

      return () => clearTimeout(tUnmount);
    }, 4300);

    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t7);
      document.body.style.overflow = "";
    };
  }, [startReveal, completeLoading, shouldReduceMotion]);

  // Cubic Bezier SVG Path Circle
  // Sized at R = 47.5 (perimeter = 298.45) to run exactly along the outer edge of the viewBox with 2.5% padding to prevent stroke clipping.
  // Kept constant at all times to prevent CPU redraw cost and guarantee 60 FPS compositor-only transitions.
  const pathCircle = "M 50,2.5 C 76.2,2.5 97.5,23.8 97.5,50 C 97.5,76.2 76.2,97.5 50,97.5 C 23.8,97.5 2.5,76.2 2.5,50 C 2.5,23.8 23.8,2.5 50,2.5 Z";

  // Glassmorphic Mission Badges Configurations (Stage 5)
  const badgesList = [
    { label: "📚 Education", pos: "right-1/2 bottom-1/2 mr-8 mb-8 md:mr-14 md:mb-14", floatX: [0, 4, 0], floatY: [0, -6, 0], delay: 0, dur: 4.5 },
    { label: "❤️ Healthcare", pos: "left-1/2 bottom-1/2 ml-8 mb-8 md:ml-14 md:mb-14", floatX: [0, -3, 0], floatY: [0, -8, 0], delay: 0.25, dur: 5.2 },
    { label: "🌱 Environment", pos: "right-1/2 top-1/2 mr-8 mt-8 md:mr-14 md:mt-14", floatX: [0, 5, 0], floatY: [0, -5, 0], delay: 0.5, dur: 4.8 },
    { label: "👧 Women Empowerment", pos: "left-1/2 top-1/2 ml-8 mt-8 md:ml-14 md:mt-14", floatX: [0, -4, 0], floatY: [0, -7, 0], delay: 0.75, dur: 5.5 },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "0vh" }}
          animate={stage === 7 ? { y: "-100vh" } : { y: "0vh" }}
          transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
          style={{ willChange: "transform", transformOrigin: "top" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-cream select-none pointer-events-auto"
        >
          {/* Main Logo Container */}
          <motion.div
            animate={stage === 7 ? { scale: 0.9, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-80 h-80 flex items-center justify-center"
          >
            {/* Ambient Glass Circular Backing for visual depth */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={stage >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.85, ease: "easeOut" }}
              className="absolute w-[124px] h-[124px] rounded-full bg-white/5 dark:bg-white/[0.02] backdrop-blur-xs border border-charcoal/[0.04] dark:border-white/[0.04] z-0 shadow-inner pointer-events-none"
            />

            {/* Logo Image wrapper: soft watermark at stages 1-3, solid at stage 4-7 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{
                opacity: stage >= 4 ? 1 : 0.25,
                scale: stage >= 4 ? 1 : 0.85,
                y: stage >= 2 ? 0 : 10,
              }}
              transition={{
                opacity: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
                scale: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
                y: { duration: 0.65, ease: "easeOut" },
              }}
              className="absolute w-[121px] h-[121px] rounded-full overflow-hidden z-10 flex items-center justify-center bg-white border border-charcoal/5 shadow-xs"
            >
              <Image
                src="/Dua Charitable Trust_LOGO_2026.jpg (3).jpeg"
                alt="Dua Logo Icon"
                fill
                className="object-cover p-0.5 rounded-full"
                sizes="121px"
                priority
              />

              {/* Golden Sheen light sweep overlay (sweeps in Stage 4) */}
              <AnimatePresence>
                {stage >= 4 && (
                  <motion.div
                    initial={{ x: "-120%" }}
                    animate={{ x: "160%" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.35, ease: "easeInOut", delay: 0.5 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 via-amber-100/30 via-white/40 to-transparent -skew-x-12 z-20 pointer-events-none"
                  />
                )}
              </AnimatePresence>
            </motion.div>

            {/* SVG Morphing Circle Ring (Stages 1-4) - Sized exactly at 128px (w-32) to align directly with logo image borders */}
            <motion.svg
              width="128"
              height="128"
              viewBox="0 0 100 100"
              className="absolute z-20 pointer-events-none w-32 h-32"
              animate={
                stage === 7
                  ? { scale: 0.9, opacity: 0 }
                  : stage === 1
                  ? { scale: [0.12, 0.14, 0.12], opacity: 0.6 }
                  : { scale: 1, opacity: 1, rotate: 360 }
              }
              transition={
                stage === 7
                  ? { duration: 0.4 }
                  : stage === 1
                  ? { duration: 1.25, repeat: Infinity, ease: "easeInOut" }
                  : {
                      scale: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 0.4 },
                      rotate: { duration: 3.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }
                    }
              }
            >
              {/* Ambient Back Glow (Stage 1-2) */}
              <motion.circle
                cx="50"
                cy="50"
                r={47.5}
                fill="none"
                stroke="#2C3E2B"
                strokeWidth="1.5"
                opacity={stage === 1 ? 0.2 : 0.05}
                className="blur-xs"
              />

              {/* Central Circle Path - Multi-segment Dash Draw (3 segments meeting at 100% solid circle) */}
              <motion.path
                d={pathCircle}
                initial={{ strokeDasharray: "15 84.48" }}
                animate={{
                  strokeDasharray: stage === 1 ? "15 84.48" : "99.48 0",
                  stroke: stage >= 4 ? "var(--forest, #2C3E2B)" : "rgba(44, 62, 43, 0.25)",
                  strokeWidth: 1.5,
                }}
                transition={{
                  strokeDasharray: { duration: 3.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 },
                  stroke: { duration: 0.5 },
                }}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </motion.svg>

            {/* Glassmorphic Mission Badges (Stage 5) */}
            {badgesList.map((badge, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  stage >= 5 && stage !== 7
                    ? {
                        opacity: 1,
                        scale: 1,
                        x: badge.floatX,
                        y: badge.floatY,
                      }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={
                  stage >= 5
                    ? {
                        opacity: { duration: 0.55, ease: "easeOut", delay: badge.delay },
                        scale: { type: "spring", stiffness: 90, damping: 14, delay: badge.delay },
                        x: { duration: badge.dur, repeat: Infinity, ease: "easeInOut", delay: badge.delay },
                        y: { duration: badge.dur, repeat: Infinity, ease: "easeInOut", delay: badge.delay },
                      }
                    : { duration: 0.25 }
                }
                className={`absolute ${badge.pos} flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-charcoal/10 bg-white/20 dark:bg-white/5 backdrop-blur-md shadow-xs select-none pointer-events-none text-charcoal/90 font-body text-[11px] sm:text-xs font-semibold whitespace-nowrap z-10`}
              >
                {badge.label}
              </motion.div>
            ))}
          </motion.div>

          {/* Thin Progress line (Stage 6) */}
          <motion.div
            animate={stage === 7 ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex flex-col items-center mt-2"
          >
            <div className="w-56 sm:w-64 h-[1.5px] bg-charcoal/10 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-sage to-forest"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4.0, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
