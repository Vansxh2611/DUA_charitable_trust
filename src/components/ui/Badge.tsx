import React from "react";
import { BadgeProps } from "@/types";
import { cn } from "@/utils/cn";

export const Badge: React.FC<BadgeProps> = ({ label, variant = "default", className }) => {
  const styles = {
    default: "bg-charcoal/10 text-charcoal/80",
    success: "bg-forest/15 text-forest",
    warning: "bg-amber-500/15 text-amber-800",
    info: "bg-mint text-forest border border-forest/20",
    orange: "bg-warmOrange/15 text-warmOrange",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wider font-heading",
        styles[variant],
        className
      )}
    >
      {label}
    </span>
  );
};
