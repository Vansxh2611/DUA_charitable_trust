"use client";

import React, { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface TemplateProps {
  children: React.ReactNode;
}

export default function Template({ children }: TemplateProps) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // 1. Reset scroll to top on mount if not navigating to an anchor hash link
    if (typeof window !== "undefined" && !window.location.hash) {
      window.scrollTo(0, 0);
    }

    // 2. Trigger ScrollTrigger layout calculation refresh once DOM render settles
    const rafId = requestAnimationFrame(() => {
      import("gsap/ScrollTrigger")
        .then(({ ScrollTrigger }) => {
          ScrollTrigger.refresh();
        })
        .catch(() => {
          // Guard for environments where GSAP is not loaded
        });
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  const pageTransitionVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageTransitionVariants}
    >
      {children}
    </motion.div>
  );
}
