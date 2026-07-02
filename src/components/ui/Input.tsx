import React, { forwardRef } from "react";
import { InputProps, TextAreaProps } from "@/types";
import { cn } from "@/utils/cn";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-charcoal/85 font-heading">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full px-4 py-3 rounded-full border border-charcoal/25 bg-cream/50 text-charcoal text-sm transition-all placeholder:text-charcoal/40 focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/30 disabled:opacity-50",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/30",
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-red-600 font-medium px-2">{error}</span>}
        {!error && helperText && <span className="text-xs text-charcoal/50 px-2">{helperText}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-charcoal/85 font-heading">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={cn(
            "w-full px-4 py-3 rounded-2xl border border-charcoal/25 bg-cream/50 text-charcoal text-sm transition-all placeholder:text-charcoal/40 focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/30 disabled:opacity-50 min-h-[120px] resize-y",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/30",
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-red-600 font-medium px-2">{error}</span>}
        {!error && helperText && <span className="text-xs text-charcoal/50 px-2">{helperText}</span>}
      </div>
    );
  }
);
TextArea.displayName = "TextArea";
