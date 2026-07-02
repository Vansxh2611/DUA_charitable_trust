"use client";

import React from "react";
import MotionProvider from "./MotionProvider";
import LenisProvider from "./LenisProvider";

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <MotionProvider>
      <LenisProvider>
        {children}
      </LenisProvider>
    </MotionProvider>
  );
};

export default AppProviders;
