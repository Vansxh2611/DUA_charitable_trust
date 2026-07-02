"use client";

import React, { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { applyTextTransition } from "@/animations/textTransitions";
import { cn } from "@/utils/cn";

export interface RevealTextProps {
  children: React.ReactNode;
  className?: string;
  start?: string;
  end?: string;
}

export const RevealText: React.FC<RevealTextProps> = ({
  children,
  className,
  start = "top 85%",
  end = "bottom 20%",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const timeline = applyTextTransition(containerRef.current, { start, end });

    return () => {
      if (timeline.scrollTrigger) {
        timeline.scrollTrigger.kill();
      }
      timeline.kill();
    };
  }, [prefersReducedMotion, start, end]);

  return (
    <div
      ref={containerRef}
      className={cn("flex flex-col gap-4 text-left", className)}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        const element = child as React.ReactElement<{ className?: string; label?: string }>;
        
        // Automatically assign target hooks to paragraphs and buttons
        const isHeading = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(
          typeof element.type === "string" ? element.type : ""
        );
        const isButton = element.props.className?.includes("button") || element.type === "button" || element.props.label !== undefined;

        let childClass = "story-paragraph will-change-[transform,opacity] translate-y-10 opacity-0";
        if (isHeading) {
          childClass = ""; // Heading handles its own staging via AnimatedHeading
        } else if (isButton) {
          childClass = "story-button will-change-[transform,opacity] scale-95 opacity-0 inline-block w-fit";
        }

        return React.cloneElement(element, {
          ...element.props,
          className: cn(element.props.className, prefersReducedMotion ? "" : childClass),
        } as React.HTMLAttributes<HTMLElement>);
      })}
    </div>
  );
};
export default RevealText;
