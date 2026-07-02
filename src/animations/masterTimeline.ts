import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export interface MasterTimelineOptions {
  trigger: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean | string | HTMLElement;
  anticipatePin?: number;
  onUpdate?: (self: ScrollTrigger) => void;
}

/**
 * Creates a master timeline within a GSAP context wrapper
 * to simplify initialization and clean unmounting.
 */
export function createMasterTimeline(
  options: MasterTimelineOptions,
  scope?: React.RefObject<Element | null> | string | Element
): { timeline: gsap.core.Timeline; ctx: gsap.Context } {
  gsap.registerPlugin(ScrollTrigger);

  const ctx = gsap.context(() => {}, scope || undefined);

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: options.trigger,
      start: options.start || "top top",
      end: options.end || "+=100%",
      scrub: options.scrub !== undefined ? options.scrub : 1,
      pin: options.pin,
      anticipatePin: options.anticipatePin,
      onUpdate: options.onUpdate,
    },
  });

  return { timeline, ctx };
}
export default createMasterTimeline;
