"use client";

import React from "react";
import { STORY_STEPS } from "@/constants/storyData";

interface StoryProgressProps {
  activeStory: number;
}

export const StoryProgress: React.FC<StoryProgressProps> = ({ activeStory }) => {
  const currentFormatted = String(activeStory + 1).padStart(2, "0");
  const totalFormatted = String(STORY_STEPS.length).padStart(2, "0");

  return (
    <div className="flex items-center gap-4 text-xs font-heading font-bold select-none text-charcoal/60">
      <span>{currentFormatted}</span>

      {/* Progress Bar Rail */}
      <div className="w-24 h-[2px] bg-charcoal/10 rounded-full overflow-hidden relative">
        <div
          className="story-progress-bar absolute inset-y-0 left-0 right-0 bg-gold origin-left rounded-full scale-x-0 will-change-transform"
        />
      </div>

      <span>{totalFormatted}</span>
    </div>
  );
};
export default StoryProgress;
