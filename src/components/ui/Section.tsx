import React from "react";
import { cn } from "@/utils/cn";

/* ── Section ─────────────────────────────────────────────────────────────── */
interface SectionProps {
  children: React.ReactNode;
  tone?: "light" | "dark" | "accent";
  size?: "sm" | "md" | "lg";
  id?: string;
  className?: string;
}

const sectionPadding = {
  sm: "py-12 md:py-16 lg:py-20",
  md: "py-16 md:py-24 lg:py-28",
  lg: "py-20 md:py-28 lg:py-32",
};

const sectionBg = {
  light:  "bg-cream",
  dark:   "bg-navy text-cream",
  accent: "bg-sage",
};

export const Section: React.FC<SectionProps> = ({
  children,
  tone = "light",
  size = "md",
  id,
  className,
}) => {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden",
        sectionPadding[size],
        sectionBg[tone],
        className
      )}
    >
      {children}
    </section>
  );
};

/* ── Prose ───────────────────────────────────────────────────────────────── */
interface ProseProps {
  children: React.ReactNode;
  size?: "sm" | "base" | "lg";
  muted?: boolean;
  centered?: boolean;
  className?: string;
}

const proseSizes = {
  sm:   "text-sm leading-relaxed",
  base: "text-base sm:text-lg leading-relaxed",
  lg:   "text-lg sm:text-xl leading-loose",
};

export const Prose: React.FC<ProseProps> = ({
  children,
  size = "base",
  muted = false,
  centered = false,
  className,
}) => {
  return (
    <div
      className={cn(
        "prose-premium",
        proseSizes[size],
        muted ? "text-charcoal/60" : "text-charcoal/75",
        centered && "mx-auto text-center",
        className
      )}
    >
      {children}
    </div>
  );
};
