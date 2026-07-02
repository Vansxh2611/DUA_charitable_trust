import { Variants } from "framer-motion";

// Premium transition ease curves
export const easeOutExpo = [0.16, 1, 0.3, 1];

export const fadeUp = (delay = 0, duration = 0.6): Variants => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration, ease: easeOutExpo },
  },
});

export const fadeDown = (delay = 0, duration = 0.6): Variants => ({
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration, ease: easeOutExpo },
  },
});

export const fadeLeft = (delay = 0, duration = 0.6): Variants => ({
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay, duration, ease: easeOutExpo },
  },
});

export const fadeRight = (delay = 0, duration = 0.6): Variants => ({
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay, duration, ease: easeOutExpo },
  },
});

export const scaleIn = (delay = 0, duration = 0.6): Variants => ({
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { delay, duration, ease: easeOutExpo },
  },
});

export const rotateIn = (delay = 0, duration = 0.6): Variants => ({
  hidden: { opacity: 0, rotate: -5, scale: 0.98 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { delay, duration, ease: easeOutExpo },
  },
});
