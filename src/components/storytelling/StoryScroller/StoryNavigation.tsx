"use client";

import React from "react";
import { STORY_STEPS } from "@/constants/storyData";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

interface StoryNavigationProps {
  activeStory: number;
  scrollToStep: (index: number) => void;
}

export const StoryNavigation: React.FC<StoryNavigationProps> = ({
  activeStory,
  scrollToStep,
}) => {
  return (
    <nav
      className="hidden lg:flex flex-col gap-6 border-l-2 border-charcoal/10 pl-6 py-4 relative select-none"
      aria-label="Story Chapters navigation"
    >
      {STORY_STEPS.map((step, idx) => {
        const isActive = idx === activeStory;

        return (
          <button
            key={step.id}
            onClick={() => scrollToStep(idx)}
            className={cn(
              "text-left flex flex-col gap-1 transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 rounded-lg p-1 w-full max-w-[180px] cursor-pointer",
              isActive ? "text-charcoal" : "text-charcoal/40 hover:text-charcoal/70"
            )}
            aria-current={isActive ? "step" : undefined}
          >
            <span className="text-[10px] font-heading font-extrabold tracking-widest uppercase block">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <span className="text-xs font-semibold font-body tracking-wide block truncate">
              {step.title}
            </span>
          </button>
        );
      })}

      {/* Floating active highlight indicator bar */}
      <motion.div
        animate={{ y: activeStory * 58 }} // Align index offset to button layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="absolute left-[-2px] top-4 w-[2px] h-10 bg-gold rounded-full"
      />
    </nav>
  );
};
export default StoryNavigation;
