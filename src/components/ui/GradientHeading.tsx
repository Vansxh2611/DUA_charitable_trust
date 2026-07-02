"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

export interface GradientHeadingProps {
  children: React.ReactNode;
  variant?: "hero" | "section" | "small";
  level?: 1 | 2 | 3 | 4;
  highlightWords?: string[];
  underline?: boolean;
  className?: string;
}

export const GradientHeading: React.FC<GradientHeadingProps> = ({
  children,
  variant = "section",
  level = 2,
  highlightWords = [],
  underline = false,
  className,
}) => {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;

  const sizeClasses = {
    hero: "text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight",
    section: "text-3xl sm:text-4xl font-bold tracking-tight leading-tight",
    small: "text-xl sm:text-2xl font-semibold tracking-normal",
  };

  // Helper to check if a word matches our highlight list
  const isHighlighted = (word: string) => {
    // Strip punctuation for matching
    const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();
    return highlightWords.some((w) => w.toLowerCase() === cleanWord);
  };

  const renderContent = () => {
    if (typeof children !== "string") {
      return children;
    }

    const words = children.split(" ");
    return words.map((word, index) => {
      const isLast = index === words.length - 1;
      const highlight = isHighlighted(word);

      return (
        <React.Fragment key={index}>
          {highlight ? (
            <span className="bg-linear-to-r from-[#B38728] via-[#F7DF7C] to-[#BF953F] bg-clip-text text-transparent inline-block font-heading">
              {word}
            </span>
          ) : (
            <span>{word}</span>
          )}
          {!isLast && " "}
        </React.Fragment>
      );
    });
  };

  return (
    <div className={cn("relative w-fit pb-2", className)}>
      <Tag className={cn("font-heading text-charcoal", sizeClasses[variant])}>
        {renderContent()}
      </Tag>

      {underline && (
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-0 right-0 h-[3px] bg-linear-to-r from-[#BF953F] via-[#F7DF7C] to-[#B38728] origin-left rounded-full"
        />
      )}
    </div>
  );
};

export default GradientHeading;
