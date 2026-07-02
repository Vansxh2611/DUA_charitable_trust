"use client";

import React from "react";
import { useStory } from "@/context/StoryContext";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";

export const StoryControls: React.FC = () => {
  const { activeStep, stepsCount, scrollToStep } = useStory();

  const handlePrev = () => {
    if (activeStep > 0) {
      scrollToStep(activeStep - 1);
    }
  };

  const handleNext = () => {
    if (activeStep < stepsCount - 1) {
      scrollToStep(activeStep + 1);
    }
  };

  return (
    <div className="flex gap-2 items-center" aria-label="Story navigation controls">
      <button
        onClick={handlePrev}
        disabled={activeStep === 0}
        className={cn(
          "p-2 rounded-full border border-charcoal/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest cursor-pointer",
          activeStep === 0 
            ? "opacity-40 cursor-not-allowed" 
            : "hover:bg-charcoal/5 text-charcoal"
        )}
        aria-label="Previous story"
      >
        <ChevronUp size={16} />
      </button>

      <button
        onClick={handleNext}
        disabled={activeStep === stepsCount - 1}
        className={cn(
          "p-2 rounded-full border border-charcoal/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest cursor-pointer",
          activeStep === stepsCount - 1 
            ? "opacity-40 cursor-not-allowed" 
            : "hover:bg-charcoal/5 text-charcoal"
        )}
        aria-label="Next story"
      >
        <ChevronDown size={16} />
      </button>
    </div>
  );
};
export default StoryControls;
