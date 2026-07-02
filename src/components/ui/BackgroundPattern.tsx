import React from "react";
import { PatternVariant } from "@/types";
import { cn } from "@/utils/cn";

interface BackgroundPatternProps {
  variant: PatternVariant;
  opacity?: number;
  className?: string;
}

export const BackgroundPattern: React.FC<BackgroundPatternProps> = ({
  variant,
  opacity = 1,
  className,
}) => {
  switch (variant) {
    case "leaf":
      return (
        <svg
          aria-hidden="true"
          className={cn("absolute inset-0 w-full h-full pointer-events-none text-forest/8", className)}
          style={{ opacity }}
        >
          <defs>
            <pattern id="pat-leaf" width="80" height="80" patternUnits="userSpaceOnUse">
              <path
                d="M30 20 C40 10, 50 10, 60 20 C50 30, 40 30, 30 20 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
              />
              <path d="M30 20 L50 20" fill="none" stroke="currentColor" strokeWidth="0.8" />
              <path
                d="M10 50 C20 40, 30 40, 40 50 C30 60, 20 60, 10 50 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
              />
              <path d="M10 50 L25 50" fill="none" stroke="currentColor" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pat-leaf)" />
        </svg>
      );

    case "circuit":
      return (
        <svg
          aria-hidden="true"
          className={cn("absolute inset-0 w-full h-full pointer-events-none text-white/10", className)}
          style={{ opacity }}
        >
          <defs>
            <pattern id="pat-circuit" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M10 10h40v30h30 M20 60h30v20" fill="none" stroke="currentColor" strokeWidth="0.8" />
              <circle cx="10" cy="10" r="2.5" fill="currentColor" />
              <circle cx="80" cy="40" r="2.5" fill="currentColor" />
              <circle cx="20" cy="60" r="2.5" fill="currentColor" />
              <circle cx="50" cy="80" r="2.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pat-circuit)" />
        </svg>
      );

    case "wave":
      return (
        <svg
          aria-hidden="true"
          className={cn("absolute inset-0 w-full h-full pointer-events-none text-charcoal/5", className)}
          style={{ opacity }}
        >
          <defs>
            <pattern id="pat-wave" width="80" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 Q 20 5, 40 20 T 80 20" fill="none" stroke="currentColor" strokeWidth="0.8" />
              <path
                d="M0 30 Q 20 15, 40 30 T 80 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeDasharray="2 2"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pat-wave)" />
        </svg>
      );

    case "doodle":
      return (
        <svg
          aria-hidden="true"
          className={cn("absolute inset-0 w-full h-full pointer-events-none text-charcoal/10", className)}
          style={{ opacity }}
        >
          <defs>
            <pattern id="pat-doodle" width="150" height="150" patternUnits="userSpaceOnUse">
              {/* Book */}
              <path d="M20 20h20v15h-20z M20 25h20" fill="none" stroke="currentColor" strokeWidth="0.8" />
              {/* Bulb */}
              <circle cx="80" cy="30" r="8" fill="none" stroke="currentColor" strokeWidth="0.8" />
              <path d="M77 38h6 M79 41h2" fill="none" stroke="currentColor" strokeWidth="0.8" />
              {/* Pencil */}
              <path d="M120 20l15 15-5 5-15-15z M130 18l3 3" fill="none" stroke="currentColor" strokeWidth="0.8" />
              {/* Cloud */}
              <path d="M25 85a8 8 0 0 1 12-4 10 10 0 0 1 18 2 8 8 0 0 1 6 8h-36z" fill="none" stroke="currentColor" strokeWidth="0.8" />
              {/* Gear */}
              <circle cx="85" cy="90" r="7" fill="none" stroke="currentColor" strokeWidth="0.8" />
              <path d="M85 80v3 M85 97v3 M75 90h3 M92 90h3" fill="none" stroke="currentColor" strokeWidth="0.8" />
              {/* Star */}
              <path d="M125 80l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z" fill="none" stroke="currentColor" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pat-doodle)" />
        </svg>
      );

    case "project-grid":
      return (
        <svg
          aria-hidden="true"
          className={cn("absolute inset-0 w-full h-full pointer-events-none", className)}
          style={{ opacity }}
        >
          <defs>
            <pattern id="pat-project-grid" width="120" height="120" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="60" height="60" fill="#f4f6f0" opacity="0.4" />
              <path d="M0 0 L60 60 L0 60 Z" fill="#fcf9e9" opacity="0.7" />
              <rect x="60" y="0" width="60" height="60" fill="#eef5f8" opacity="0.4" />
              <path d="M60 0 L120 0 L120 60 Z" fill="#e3edf3" opacity="0.6" />
              <rect x="0" y="60" width="60" height="60" fill="#f9f2f2" opacity="0.4" />
              <path d="M0 60 L60 120 L60 60 Z" fill="#f5e8e8" opacity="0.6" />
              <rect x="60" y="60" width="60" height="60" fill="#edf3ee" opacity="0.4" />
              <path d="M60 120 L120 120 L120 60 Z" fill="#deeae0" opacity="0.6" />
              <path d="M25 35 Q 30 25 35 25 Q 30 35 25 35 Z" fill="none" stroke="#2D5B45" strokeWidth="0.5" opacity="0.2" />
              <circle cx="90" cy="30" r="4" fill="none" stroke="#2D5B45" strokeWidth="0.5" opacity="0.2" />
              <path d="M25 90h10v8h-10z" fill="none" stroke="#2D5B45" strokeWidth="0.5" opacity="0.2" />
              <path d="M85 95 Q 90 85 95 95 Z" fill="none" stroke="#2D5B45" strokeWidth="0.5" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pat-project-grid)" />
        </svg>
      );

    default:
      return null;
  }
};
