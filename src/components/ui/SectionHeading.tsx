import React from "react";
import { SectionHeadingProps } from "@/types";
import { cn } from "@/utils/cn";
import { Badge } from "./Badge";

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  badge,
  centered = false,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 max-w-3xl mb-10 sm:mb-12",
        centered ? "mx-auto text-center items-center" : "text-left items-start",
        className
      )}
    >
      {badge && <Badge label={badge} variant="info" className="w-fit" />}
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-charcoal font-heading leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-charcoal/65 leading-relaxed font-body">
          {subtitle}
        </p>
      )}
    </div>
  );
};
