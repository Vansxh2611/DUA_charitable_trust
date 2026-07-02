import { DependencyList } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

export function useGSAP(
  callback: () => void | (() => void),
  dependencies: DependencyList = []
): void {
  useIsomorphicLayoutEffect(() => {
    // Register ScrollTrigger client-side safely
    gsap.registerPlugin(ScrollTrigger);

    // Context scoping guarantees proper animation cleanup on unmount
    const ctx = gsap.context(callback);

    return () => {
      ctx.revert();
    };
  }, dependencies);
}

export default useGSAP;
