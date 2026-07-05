import React from "react";
import MotionProvider from "./MotionProvider";
import LenisProvider from "./LenisProvider";
import { ThemeProvider } from "./ThemeProvider";
import { LoadingProvider } from "@/context/LoadingContext";

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <LoadingProvider>
      <MotionProvider>
        <ThemeProvider>
          <LenisProvider>
            {children}
          </LenisProvider>
        </ThemeProvider>
      </MotionProvider>
    </LoadingProvider>
  );
};

export default AppProviders;
