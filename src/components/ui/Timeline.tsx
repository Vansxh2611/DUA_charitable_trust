"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/utils/cn";
import { Calendar } from "lucide-react";

export interface TimelineItem {
  id: string | number;
  title: string;
  subtitle?: string;
  date: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

export interface TimelineProps {
  items: TimelineItem[];
  orientation?: "vertical" | "horizontal";
  variant?: "default" | "premium" | "outline";
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({
  items,
  orientation = "vertical",
  variant = "premium",
  className,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Track scroll progress across the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25, restDelta: 0.001 });

  const isHorizontal = orientation === "horizontal";

  const dotColorClass = {
    default: "bg-forest border-cream",
    premium: "bg-[#B38728] border-cream shadow-xs",
    outline: "bg-cream border-forest",
  };

  const cardBorderClass = {
    default: "bg-cream border-forest/15",
    premium: "bg-cream border-forest/15 hover:border-[#BF953F]/40 shadow-xs",
    outline: "bg-transparent border border-charcoal/20",
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full",
        isHorizontal ? "flex flex-col md:flex-row gap-6 md:gap-4 overflow-x-auto md:pb-8" : "flex flex-col gap-12",
        className
      )}
    >
      {/* 1. Vertical Layout */}
      {!isHorizontal && (
        <>
          {/* Timeline background guide line */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[2px] bg-charcoal/5 -translate-x-1/2 pointer-events-none" />

          {/* Animated active progress indicator line */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[2px] bg-linear-to-b from-[#BF953F] via-[#F7DF7C] to-[#B38728] -translate-x-1/2 pointer-events-none z-10"
          />

          {items.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={item.id}
                className="relative flex flex-col md:flex-row w-full items-start md:justify-between"
              >
                {/* Timeline connection center node dot */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full border-2 -translate-x-1/2 z-20 flex items-center justify-center bg-cream shadow-sm pointer-events-none">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className={cn("w-3.5 h-3.5 rounded-full", dotColorClass[variant])}
                  />
                </div>

                {/* Left card spacing / Layout */}
                <div
                  className={cn(
                    "w-full md:w-[45%] pl-12 md:pl-0 flex flex-col",
                    isLeft ? "md:text-right md:items-end" : "md:opacity-0 md:pointer-events-none md:select-none"
                  )}
                >
                  {isLeft && (
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className={cn("p-6 rounded-[28px] border shadow-xs text-left", cardBorderClass[variant])}
                    >
                      <div className="flex items-center gap-2 mb-2 text-forest font-semibold text-sm">
                        {item.icon || <Calendar className="w-4 h-4" />}
                        <span>{item.date}</span>
                      </div>
                      <h3 className="text-xl font-heading font-bold text-charcoal mb-1">
                        {item.title}
                      </h3>
                      {item.subtitle && (
                        <h4 className="text-sm font-semibold text-charcoal/50 mb-3">
                          {item.subtitle}
                        </h4>
                      )}
                      <div className="text-sm leading-relaxed text-charcoal/70 font-body">
                        {item.content}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Mid spacing helper */}
                <div className="hidden md:block w-[5%]" />

                {/* Right card spacing / Layout */}
                <div
                  className={cn(
                    "w-full md:w-[45%] pl-12 md:pl-0 flex flex-col",
                    !isLeft ? "md:text-left md:items-start" : "md:opacity-0 md:pointer-events-none md:select-none"
                  )}
                >
                  {!isLeft && (
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className={cn("p-6 rounded-[28px] border shadow-xs text-left", cardBorderClass[variant])}
                    >
                      <div className="flex items-center gap-2 mb-2 text-forest font-semibold text-sm">
                        {item.icon || <Calendar className="w-4 h-4" />}
                        <span>{item.date}</span>
                      </div>
                      <h3 className="text-xl font-heading font-bold text-charcoal mb-1">
                        {item.title}
                      </h3>
                      {item.subtitle && (
                        <h4 className="text-sm font-semibold text-charcoal/50 mb-3">
                          {item.subtitle}
                        </h4>
                      )}
                      <div className="text-sm leading-relaxed text-charcoal/70 font-body">
                        {item.content}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            );
          })}
        </>
      )}

      {/* 2. Horizontal Layout (stacks vertically on mobile, layout row on desktop) */}
      {isHorizontal && (
        <div className="flex flex-col md:flex-row gap-8 md:gap-0 w-full relative pt-0 md:pt-16">
          {/* Horizontal timeline guide line */}
          <div className="hidden md:block absolute left-4 right-4 top-6 h-[2px] bg-charcoal/5 pointer-events-none" />

          {items.map((item, index) => {
            return (
              <div key={item.id} className="relative flex flex-col md:flex-1 items-start pl-8 md:pl-0 md:px-4">
                {/* Horizontal dot connect node */}
                <div className="absolute left-0 md:left-1/2 top-1.5 md:top-6 w-8 h-8 rounded-full border-2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center bg-cream shadow-sm pointer-events-none">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className={cn("w-3.5 h-3.5 rounded-full", dotColorClass[variant])}
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={cn("p-6 rounded-[28px] border shadow-xs w-full text-left", cardBorderClass[variant])}
                >
                  <div className="flex items-center gap-2 mb-2 text-forest font-semibold text-sm">
                    {item.icon || <Calendar className="w-4 h-4" />}
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-lg font-heading font-bold text-charcoal mb-1">
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <h4 className="text-xs font-semibold text-charcoal/50 mb-3">
                      {item.subtitle}
                    </h4>
                  )}
                  <div className="text-xs leading-relaxed text-charcoal/70 font-body">
                    {item.content}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Timeline;
