"use client";

import React, { useRef } from "react";
import { Sun, Moon } from "lucide-react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTheme } from "../providers/ThemeProvider";
import { flushSync } from "react-dom";

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  // Track pointer coordinates from onPointerDown
  const pointerCoords = useRef<{ x: number; y: number } | null>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    pointerCoords.current = { x: e.clientX, y: e.clientY };
  };

  const runCanvasRipple = (nextTheme: "light" | "dark", x: number, y: number, maxRadius: number) => {
    // Resolve old theme wash background color from CSS theme variables
    const docStyle = getComputedStyle(document.documentElement);
    const lightBg = docStyle.getPropertyValue("--light-bg").trim() || "#F9F8F3";
    const darkBg = docStyle.getPropertyValue("--dark-bg").trim() || "#141E15";
    const oldColor = theme === "light" ? lightBg : darkBg;

    // Create and scale fixed fullscreen canvas overlay
    const canvas = document.createElement("canvas");
    canvas.id = "theme-ripple-canvas";
    canvas.style.position = "fixed";
    canvas.style.inset = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.zIndex = "999999";
    canvas.style.pointerEvents = "none";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setTheme(nextTheme);
      canvas.remove();
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Switch the theme state in React immediately so the DOM updates underneath
    setTheme(nextTheme);

    let startTime: number | null = null;
    const duration = 650; // slightly faster for responsiveness

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing: easeOutCubic
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentRadius = maxRadius * easeOutCubic;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw the old background color covering the screen
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = oldColor;
      ctx.fillRect(0, 0, width, height);

      // 2. Erase a circular path from the overlay to reveal the new theme underneath
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, currentRadius, 0, Math.PI * 2);
      ctx.fill();

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        canvas.remove();
      }
    };

    requestAnimationFrame(animate);
  };

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = theme === "light" ? "dark" : "light";

    // 1. Reduced Motion Accessibility Check
    if (shouldReduceMotion) {
      setTheme(nextTheme);
      pointerCoords.current = null;
      return;
    }

    // 2. Determine animation coordinates origin
    let x = 0;
    let y = 0;

    if (pointerCoords.current && (pointerCoords.current.x !== 0 || pointerCoords.current.y !== 0)) {
      x = pointerCoords.current.x;
      y = pointerCoords.current.y;
    } else {
      // Keyboard interaction or fallback: use center of button
      const rect = e.currentTarget.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }
    pointerCoords.current = null; // Reset coordinates

    const width = window.innerWidth;
    const height = window.innerHeight;
    const maxRadius = Math.hypot(
      Math.max(x, width - x),
      Math.max(y, height - y)
    );

    // 3. Check if browser supports View Transitions API
    const docWithTransition = document as unknown as {
      startViewTransition?: (callback: () => void) => void;
    };
    if (!docWithTransition.startViewTransition) {
      runCanvasRipple(nextTheme, x, y, maxRadius);
      return;
    }

    // 4. Set CSS custom properties on documentElement for View Transition keyframe interpolation
    document.documentElement.style.setProperty("--ripple-x", `${x}px`);
    document.documentElement.style.setProperty("--ripple-y", `${y}px`);
    document.documentElement.style.setProperty("--ripple-r", `${maxRadius}px`);

    docWithTransition.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
      });
    });
  };

  return (
    <button
      onClick={handleToggle}
      onPointerDown={handlePointerDown}
      className="p-2.5 text-charcoal hover:text-forest bg-charcoal/5 hover:bg-charcoal/10 rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-forest/40 transition-colors relative flex items-center justify-center w-10 h-10"
      aria-label="Toggle theme color"
      aria-pressed={theme === "dark"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "light" ? (
          <m.div
            key="sun"
            initial={{ scale: 0.5, rotate: -45, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.5, rotate: 45, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-5 h-5 flex items-center justify-center text-charcoal"
          >
            <Sun size={20} className="stroke-[2.5]" />
          </m.div>
        ) : (
          <m.div
            key="moon"
            initial={{ scale: 0.5, rotate: 45, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.5, rotate: -45, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-5 h-5 flex items-center justify-center text-charcoal"
          >
            <Moon size={20} className="stroke-[2.5]" />
          </m.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
