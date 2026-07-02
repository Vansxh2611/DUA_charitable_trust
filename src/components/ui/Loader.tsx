import React from "react";
import { LoaderProps } from "@/types";
import { cn } from "@/utils/cn";

export const Loader: React.FC<LoaderProps> = ({ size = "md", className }) => {
  return (
    <div className={cn("flex items-center justify-center", className)} data-testid="loader">
      <div
        className={cn(
          "animate-spin rounded-full border-t-2 border-b-2 border-forest",
          size === "sm" && "h-6 w-6 border-t-2 border-b-2",
          size === "md" && "h-10 w-10 border-t-2 border-b-2",
          size === "lg" && "h-16 w-16 border-t-4 border-b-4"
        )}
      />
    </div>
  );
};
