import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export interface TextTransitionOptions {
  scrub?: boolean | number;
  start?: string;
  end?: string;
}

/**
 * Applies scroll-linked text stagger reveals to heading words,
 * paragraphs, and button components inside a container.
 */
export function applyTextTransition(
  container: string | Element,
  options: TextTransitionOptions = {}
): gsap.core.Timeline {
  gsap.registerPlugin(ScrollTrigger);

  const containerEl = typeof container === "string" ? document.querySelector(container) : container;
  if (!containerEl) return gsap.timeline();

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: containerEl,
      start: options.start || "top 85%",
      end: options.end || "bottom 20%",
      scrub: options.scrub !== undefined ? options.scrub : 1,
    },
  });

  // Stagger words in headings
  const headingWords = containerEl.querySelectorAll(".story-heading-word");
  if (headingWords.length > 0) {
    tl.fromTo(
      headingWords,
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        stagger: 0.08,
        ease: "power4.out",
        duration: 0.6,
      }
    );
  }

  // Paragraph reveal
  const paragraphs = containerEl.querySelectorAll(".story-paragraph");
  if (paragraphs.length > 0) {
    tl.fromTo(
      paragraphs,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: "power2.out",
        duration: 0.5,
      },
      headingWords.length > 0 ? "-=0.35" : 0
    );
  }

  // Action Buttons scale-up
  const buttons = containerEl.querySelectorAll(".story-button");
  if (buttons.length > 0) {
    tl.fromTo(
      buttons,
      { scale: 0.95, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        ease: "back.out(1.5)",
        duration: 0.4,
      },
      "-=0.25"
    );
  }

  return tl;
}
export default applyTextTransition;
