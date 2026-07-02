import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export interface ImageTransitionOptions {
  scrub?: boolean | number;
  start?: string;
  end?: string;
}

/**
 * Creates a scroll-linked image reveal and exit timeline.
 * 0% -> 40%: Enter (y: 160px -> 0, scale: 0.94 -> 1, blur: 10px -> 0px)
 * 40% -> 60%: Focus/Stabilized normal state
 * 60% -> 100%: Exit (y: 0 -> -120px, scale: 1 -> 1.03, blur: 0px -> 4px, opacity: 1 -> 0.35)
 */
export function applyImageTransition(
  element: string | Element,
  trigger: string | Element,
  options: ImageTransitionOptions = {}
): gsap.core.Timeline {
  gsap.registerPlugin(ScrollTrigger);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: trigger,
      start: options.start || "top bottom",
      end: options.end || "bottom top",
      scrub: options.scrub !== undefined ? options.scrub : 1,
    },
  });

  // Total duration normalized to 1
  // 1) Enter Phase (0 to 0.4)
  tl.fromTo(
    element,
    {
      opacity: 0,
      y: 160,
      scale: 0.94,
      filter: "blur(10px)",
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      ease: "power2.out",
      duration: 0.4,
    }
  );

  // 2) Keep focus frame (0.4 to 0.6)
  tl.to(element, {
    duration: 0.2,
  });

  // 3) Exit Phase (0.6 to 1.0)
  tl.to(element, {
    y: -120,
    opacity: 0.35,
    scale: 1.03,
    filter: "blur(4px)",
    ease: "power2.in",
    duration: 0.4,
  });

  return tl;
}
export default applyImageTransition;
