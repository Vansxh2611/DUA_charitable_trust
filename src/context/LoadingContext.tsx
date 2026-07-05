"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";

interface LoadingContextType {
  isLoaded: boolean;      // True when the loader finishes its page content animation and starts sliding up
  isRevealed: boolean;    // True when the loader has fully slid up and exited the screen
  startReveal: () => void;
  completeLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoaded: false,
  isRevealed: false,
  startReveal: () => {},
  completeLoading: () => {},
});

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const startReveal = useCallback(() => setIsLoaded(true), []);
  const completeLoading = useCallback(() => setIsRevealed(true), []);

  const value = useMemo(() => ({
    isLoaded,
    isRevealed,
    startReveal,
    completeLoading
  }), [isLoaded, isRevealed, startReveal, completeLoading]);

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
export default LoadingContext;
