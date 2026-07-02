"use client";

import React, { useState } from "react";
import Image from "next/image";
import { STORY_STEPS } from "@/constants/storyData";
import { cn } from "@/utils/cn";

export const StoryImage: React.FC = () => {
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});

  const handleLoad = (idx: number) => {
    setLoaded((prev) => ({ ...prev, [idx]: true }));
  };

  return (
    <div className="w-full h-full relative rounded-[32px] overflow-hidden shadow-premium border border-charcoal/5 bg-sage/10 select-none">
      {STORY_STEPS.map((step, idx) => (
        <div
          key={step.id}
          className={cn(
            `story-image-frame-${idx} absolute inset-0 w-full h-full will-change-[opacity,transform,filter]`,
            idx === 0 ? "opacity-100 z-10 scale-100 blur-0" : "opacity-0 z-0 scale-108 blur-[12px]"
          )}
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
        >
          {/* Shimmer Placeholder until decoded */}
          {!loaded[idx] && (
            <div className="absolute inset-0 bg-neutral-200 animate-pulse z-20" />
          )}

          <Image
            src={step.imageSrc}
            alt={step.imageAlt}
            fill
            className="object-cover pointer-events-none"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={idx <= 2} // Eager load the first 3 images for immediate interaction
            onLoad={() => handleLoad(idx)}
          />
          {/* Subtle cinematic gradient bottom overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent pointer-events-none z-10" />
        </div>
      ))}
    </div>
  );
};
export default StoryImage;
