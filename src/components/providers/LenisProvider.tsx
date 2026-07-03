"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const LenisContext = createContext<Lenis | null>(null);

export const LenisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    // 1. Check user preferences for reduced motion on mount
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Register ScrollTrigger to sync
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      infinite: false,
    });

    requestAnimationFrame(() => {
      setLenisInstance(lenis);
    });

    // 2. Sync ScrollTrigger updates on Lenis scroll
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // 3. Drive Lenis through GSAP Ticker for synchronized frame rates
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // 4. Sync hash page navigation scrolling
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const target = document.querySelector(hash);
        if (target) {
          lenis.scrollTo(target as HTMLElement);
        }
      }
    };
    window.addEventListener("hashchange", handleHashChange);

    // Initial check for loading with a hash
    const initialTimer = setTimeout(handleHashChange, 500);

    return () => {
      gsap.ticker.remove(tickerCallback);
      window.removeEventListener("hashchange", handleHashChange);
      clearTimeout(initialTimer);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  useEffect(() => {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenisInstance]);

  return (
    <LenisContext.Provider value={lenisInstance}>
      {children}
    </LenisContext.Provider>
  );
};

export function useLenis() {
  return useContext(LenisContext);
}

export default LenisProvider;
