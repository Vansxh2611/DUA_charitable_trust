"use client";

import { useEffect, useState } from "react";
import { MotionValue } from "framer-motion";

export function useActiveStory(progress: MotionValue<number>, stepsCount: number): number {
  const [activeStory, setActiveStory] = useState(0);

  useEffect(() => {
    const unsubscribe = progress.on("change", (val) => {
      // Divide progress (0 to 1) into equal intervals based on stepsCount
      const stepIndex = Math.min(
        stepsCount - 1,
        Math.floor(val * stepsCount)
      );
      // Clamp index to prevent index out of bounds
      const clampedIndex = Math.max(0, stepIndex);
      setActiveStory(clampedIndex);
    });

    return () => unsubscribe();
  }, [progress, stepsCount]);

  return activeStory;
}
export default useActiveStory;
