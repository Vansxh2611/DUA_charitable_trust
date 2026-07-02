"use client";

import React from "react";
import { cn } from "@/utils/cn";

interface AnimatedHeadingProps {
  title: string;
  className?: string;
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  title,
  className,
}) => {
  const words = title.split(" ");

  return (
    <h3
      className={cn(
        "text-4xl sm:text-5xl font-extrabold text-charcoal font-heading leading-tight flex flex-wrap gap-x-3 overflow-hidden py-1.5",
        className
      )}
    >
      {words.map((word, i) => (
        <span key={i} className="relative inline-block overflow-hidden select-none">
          <span 
            className="story-heading-word inline-block translate-y-[100%] opacity-0 will-change-transform"
          >
            {word}
          </span>
        </span>
      ))}
    </h3>
  );
};
export default AnimatedHeading;
