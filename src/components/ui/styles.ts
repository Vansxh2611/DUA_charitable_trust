/**
 * Shared Design System Primitives & Token Mapping
 * Reusable classes to ensure visual consistency across all components.
 */
export const styles = {
  // Focus rings matching accessibility guidelines
  focusRing: "focus-visible:ring-2 focus-visible:ring-forest/40 focus-visible:outline-hidden",

  // Shadow tokens
  shadow: {
    sm: "shadow-xs border border-charcoal/5",
    md: "shadow-sm border border-charcoal/10",
    lg: "shadow-md border border-charcoal/15",
    premium: "shadow-[0_10px_30px_rgba(27,34,30,0.04),0_1px_8px_rgba(27,34,30,0.02)] border border-forest/10",
    premiumHover: "hover:shadow-[0_20px_40px_rgba(27,34,30,0.08),0_1px_15px_rgba(27,34,30,0.03)]",
  },

  // Glassmorphic backgrounds (Light / Premium)
  glass: {
    bg: "bg-cream/45 backdrop-blur-md",
    border: "border border-cream/30",
    glow: "shadow-[0_0_40px_rgba(247,223,124,0.15)]",
  },

  // Gold theme styles
  gold: {
    text: "bg-linear-to-r from-[#B38728] via-[#F7DF7C] to-[#BF953F] bg-clip-text text-transparent",
    bg: "bg-linear-to-r from-[#BF953F] via-[#F7DF7C] to-[#B38728]",
    border: "border border-[#BF953F]/30",
    glow: "shadow-[0_0_20px_rgba(191,149,63,0.15)]",
  },

  // Transition settings
  transition: "transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1)",
  transitionFast: "transition-all duration-200 ease-in-out",
};

export default styles;
