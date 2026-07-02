"use client";

import React, { createContext, useContext } from "react";
import { MotionValue } from "framer-motion";

export interface StoryContextType {
  activeStep: number;
  progress: MotionValue<number>;
  direction: "up" | "down";
  isReducedMotion: boolean;
  stepsCount: number;
  scrollToStep: (index: number) => void;
}

export const StoryContext = createContext<StoryContextType | null>(null);

export const useStory = () => {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error("useStory must be used within a StoryProvider");
  }
  return context;
};

interface StoryProviderProps {
  children: React.ReactNode;
  activeStep: number;
  progress: MotionValue<number>;
  direction: "up" | "down";
  isReducedMotion: boolean;
  stepsCount: number;
  scrollToStep: (index: number) => void;
}

export const StoryProvider: React.FC<StoryProviderProps> = ({
  children,
  activeStep,
  progress,
  direction,
  isReducedMotion,
  stepsCount,
  scrollToStep,
}) => {
  return (
    <StoryContext.Provider
      value={{
        activeStep,
        progress,
        direction,
        isReducedMotion,
        stepsCount,
        scrollToStep,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};
