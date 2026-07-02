"use client";

import React from "react";
import { cn } from "@/utils/cn";

export interface AnimatedHeadingProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4";
  className?: string;
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  text,
  as: Component = "h2",
  className,
}) => {
  const words = text.split(" ");

  return (
    <Component
      className={cn(
        "font-heading font-extrabold text-[#111827] leading-tight flex flex-wrap gap-x-2 select-none overflow-hidden py-1",
        className
      )}
    >
      {words.map((word, i) => (
        <span key={i} className="relative inline-block overflow-hidden pb-1">
          <span className="story-heading-word inline-block translate-y-[100%] opacity-0 will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
};
export default AnimatedHeading;
