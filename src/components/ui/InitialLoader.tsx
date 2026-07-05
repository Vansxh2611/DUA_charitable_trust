"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";

export const InitialLoader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Prevent scrolling on the body while loading
    document.body.style.overflow = "hidden";

    // Progress timer
    const duration = 2800; // 2.8 seconds loading time (optimal sweet spot)
    const intervalTime = 30; // update every 30ms
    const totalSteps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min((currentStep / totalSteps) * 100, 100);
      setProgress(nextProgress);

      if (currentStep >= totalSteps) {
        clearInterval(timer);
        // Settle state
        setTimeout(() => {
          setIsVisible(false);
          // Restore body scrolling after fadeout completes (0.9s duration)
          setTimeout(() => {
            document.body.style.overflow = "";
          }, 900);
        }, 500);
      }
    }, intervalTime);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-cream select-none pointer-events-auto"
        >
          {/* Logo Brand Container */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center mb-6"
          >
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border border-charcoal/10 shadow-sm bg-white flex items-center justify-center">
              <Image
                src="/Dua Charitable Trust_LOGO_2026.jpg (3).jpeg"
                alt="Dua Logo Icon"
                fill
                className="object-cover"
                sizes="80px"
                priority
              />
            </div>
            <h1 className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-charcoal mt-3 flex items-center justify-center gap-1.5">
              Dua <span className="text-forest">Charitable Trust</span>
            </h1>
          </motion.div>

          {/* Plant Growth SVG Animation */}
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-24 h-24 text-forest drop-shadow-[0_4px_12px_rgba(47,62,46,0.15)]">
              {/* Dirt / Ground Line */}
              <motion.path
                d="M 20 80 Q 50 78 80 80"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.35 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />

              {/* Seed (Stage 1) - Visible early, shrinks as sprout grows */}
              <motion.circle
                cx="50"
                cy="79"
                r="4.5"
                fill="#C89B52" // Gold/Sage color seed
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: progress < 30 ? 1 : Math.max(1 - (progress - 30) / 40, 0),
                  opacity: progress < 50 ? 1 : Math.max(1 - (progress - 50) / 30, 0)
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Stem/Trunk (Stage 2) - Animates pathLength as progress increases to 60% */}
              <motion.path
                d="M 50 79 Q 50 60 48 45"
                stroke="currentColor"
                strokeWidth="3.5"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: progress / 70 }}
                transition={{ duration: 0.1, ease: "linear" }}
              />

              {/* Left Leaf (Stage 3) - Sprouts at 40% progress */}
              <motion.path
                d="M 49 62 C 40 58 38 48 48 50 C 48 50 49 56 49 62"
                fill="currentColor"
                initial={{ scale: 0, originX: 0.49, originY: 0.62 }}
                animate={{ scale: progress >= 40 ? Math.min((progress - 40) / 40, 1.1) : 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}
              />

              {/* Right Leaf (Stage 3) - Sprouts at 55% progress */}
              <motion.path
                d="M 49.5 54 C 58 50 60 40 51 42 C 51 42 50 48 49.5 54"
                fill="currentColor"
                initial={{ scale: 0, originX: 0.495, originY: 0.54 }}
                animate={{ scale: progress >= 55 ? Math.min((progress - 55) / 35, 1.1) : 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}
              />

              {/* Top Bud / Small Canopy (Stage 4) - Sprouts at 75% progress */}
              <motion.path
                d="M 48 45 C 44 38 52 28 54 36 C 54 36 50 42 48 45"
                fill="currentColor"
                initial={{ scale: 0, originX: 0.48, originY: 0.45 }}
                animate={{ scale: progress >= 75 ? Math.min((progress - 75) / 25, 1.25) : 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 8 }}
              />
            </svg>
          </div>

          {/* Progress Bar Container */}
          <div className="flex flex-col items-center mt-6 w-56">
            <div className="w-full h-1.5 bg-charcoal/10 rounded-full overflow-hidden relative shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-sage to-forest shadow-[0_0_8px_rgba(86,98,70,0.3)]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
              />
            </div>
            {/* Subtle percentage counter */}
            <span className="font-body text-[10px] text-muted-text/75 mt-2 font-bold tracking-widest uppercase">
              {Math.round(progress)}% Loaded
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
