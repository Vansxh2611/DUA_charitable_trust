"use client";

import { useEffect, useState, useRef } from "react";

export function useScrollDirection() {
  const [direction, setDirection] = useState<"up" | "down">("down");
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    lastScrollY.current = window.pageYOffset;

    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      // Define a threshold (e.g. 5px) to ignore tiny movements
      const threshold = 5;
      const diff = Math.abs(scrollY - lastScrollY.current);

      if (diff > threshold) {
        const currentDirection = scrollY > lastScrollY.current ? "down" : "up";
        setDirection(currentDirection);
        lastScrollY.current = scrollY > 0 ? scrollY : 0;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return direction;
}
export default useScrollDirection;
