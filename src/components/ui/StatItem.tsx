import React from "react";
import { StatItemProps } from "@/types";

export const StatItem: React.FC<StatItemProps> = ({
  value,
  label,
  icon,
  description,
}) => {
  return (
    <div className="flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-cream border border-forest/15 hover:border-forest/30 transition-all duration-300 shadow-sm hover:shadow-md">
      {icon && <div className="text-forest mb-4 p-3.5 rounded-full bg-mint/40">{icon}</div>}
      <span
        className="text-5xl sm:text-6xl font-normal text-forest tracking-tight mb-1 leading-none"
        style={{ fontFamily: "var(--font-display)", fontVariantNumeric: "tabular-nums" }}
      >
        {value}
      </span>
      <span className="text-sm font-bold text-charcoal font-heading tracking-wider uppercase mb-2">
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
