import React from "react";
import MotionProvider from "./MotionProvider";
import LenisProvider from "./LenisProvider";
import { ThemeProvider } from "./ThemeProvider";

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <MotionProvider>
      <ThemeProvider>
        <LenisProvider>
          {children}
        </LenisProvider>
      </ThemeProvider>
    </MotionProvider>
  );
};

export default AppProviders;
