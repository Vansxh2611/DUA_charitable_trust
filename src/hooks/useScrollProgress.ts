"use client";

import { RefObject } from "react";
import { useScroll, MotionValue } from "framer-motion";

export function useScrollProgress(ref: RefObject<HTMLElement | null>): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref as RefObject<HTMLElement>,
    offset: ["start start", "end end"],
  });
  return scrollYProgress;
}
export default useScrollProgress;
