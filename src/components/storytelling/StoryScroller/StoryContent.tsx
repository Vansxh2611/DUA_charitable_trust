"use client";

import React from "react";
import { STORY_STEPS } from "@/constants/storyData";
import { AnimatedHeading } from "./AnimatedHeading";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/utils/cn";

export const StoryContent: React.FC = () => {
  return (
    <div className="relative w-full min-h-[360px] md:min-h-[400px]">
      {STORY_STEPS.map((step, idx) => (
        <div
          key={step.id}
          className={cn(
            `story-content-block-${idx} absolute inset-0 w-full flex flex-col gap-5 text-left will-change-[opacity,transform]`,
            idx === 0 ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
          )}
        >
          {/* Badge Eyebrow */}
          <div className={`story-badge-${idx} will-change-[opacity,transform]`}>
            <span className="badge-gold">
              {step.badge}
            </span>
          </div>

          {/* Heading with line mask reveal */}
          <AnimatedHeading title={step.title} className={`story-heading-container-${idx}`} />

          {/* Subtitle / Description */}
          <p
            className={cn(
              `story-description-${idx} text-base text-charcoal/70 leading-relaxed font-body max-w-md will-change-[opacity,transform]`,
              idx !== 0 && "translate-y-[30px] opacity-0"
            )}
          >
            {step.description}
          </p>

          {/* Action CTA Button */}
          <div
            className={cn(
              `story-button-${idx} pt-3 will-change-[opacity,transform]`,
              idx !== 0 && "scale-[0.95] opacity-0"
            )}
          >
            <Button
              label={step.buttonText}
              variant="primary"
              size="md"
              icon={<ArrowRight size={16} />}
              iconPosition="right"
              href={step.buttonLink}
              className="bg-navy hover:bg-forest text-white"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
export default StoryContent;
