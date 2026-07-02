"use client";

import React from "react";
import { StatItemProps } from "@/types";
import { AnimatedCounter } from "./AnimatedCounter";

export const StatItem: React.FC<StatItemProps> = ({
  value,
  label,
  description,
}) => {
  // Parse numeric part and suffix (e.g. "10,000+" → target=10000, suffix="+")
  const raw = String(value).replace(/,/g, "");
  const numMatch = raw.match(/^(\d+(?:\.\d+)?)(.*)/);
  const numericTarget = numMatch ? parseFloat(numMatch[1]) : 0;
  const suffix = numMatch ? numMatch[2] : "";
  const isNumeric = numMatch !== null;

  return (
    <div className="flex flex-col items-center text-center p-6 w-full">
      <span className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-forest tracking-tight mb-3 leading-none font-heading">
        {isNumeric ? (
          <AnimatedCounter
            target={numericTarget}
            duration={2.2}
            suffix={suffix}
            formatting={numericTarget >= 1000}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-forest tracking-tight leading-none"
          />
        ) : (
          value
        )}
      </span>
      <span className="text-sm font-bold text-charcoal tracking-wider uppercase mb-2">
        {label}
      </span>
      {description && (
        <span className="text-xs sm:text-sm text-charcoal/60 leading-relaxed font-body">
          {description}
        </span>
      )}
    </div>
  );
};
