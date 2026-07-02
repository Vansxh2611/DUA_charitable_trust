"use client";

import { useEffect, useRef } from "react";

export function useScrollLock(lock: boolean): void {
  const originalStyleRef = useRef<{
    overflow: string;
    paddingRight: string;
  }>({ overflow: "", paddingRight: "" });

  useEffect(() => {
    if (typeof document === "undefined") return;

    const body = document.body;

    if (lock) {
      // Calculate scrollbar width to avoid layout shifting
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      // Save original styles
      originalStyleRef.current = {
        overflow: body.style.overflow,
        paddingRight: body.style.paddingRight,
      };

      // Set styles
      body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      // Restore styles
      body.style.overflow = originalStyleRef.current.overflow;
      body.style.paddingRight = originalStyleRef.current.paddingRight;
    }

    return () => {
      body.style.overflow = originalStyleRef.current.overflow;
      body.style.paddingRight = originalStyleRef.current.paddingRight;
    };
  }, [lock]);
}

export default useScrollLock;
