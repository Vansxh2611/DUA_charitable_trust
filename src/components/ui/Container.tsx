import React from "react";
import { ContainerProps } from "@/types";
import { cn } from "@/utils/cn";

export const Container: React.FC<ContainerProps> = ({ children, className, clean = false }) => {
  return (
    <div
      className={cn(
        "w-full",
        !clean ? "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" : "",
        className
      )}
    >
      {children}
    </div>
  );
};
