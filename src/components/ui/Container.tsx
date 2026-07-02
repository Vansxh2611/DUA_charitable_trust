import React from "react";
import { ContainerProps } from "@/types";
import { cn } from "@/utils/cn";

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  clean = false,
  size = "default",
}) => {
  const sizeClasses = {
    default: "max-w-6xl",
    wide: "max-w-7xl",
    xl: "max-w-[90rem]",
  };

  return (
    <div
      className={cn(
        "w-full",
        !clean ? cn("mx-auto px-4 sm:px-6 lg:px-8", sizeClasses[size]) : "",
        className
      )}
    >
      {children}
    </div>
  );
};
