"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/utils/cn";
import { AnimatedCounter } from "./AnimatedCounter";

export interface ImpactStat {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  icon?: React.ReactNode;
  type?: "counter" | "circle" | "progress";
  progressValue?: number; // 0 to 100
  color?: "forest" | "gold" | "charcoal";
}

export interface ImpactCounterProps {
  stats: ImpactStat[];
  className?: string;
}

export const ImpactCounter: React.FC<ImpactCounterProps> = ({ stats, className }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const colorMap = {
    forest: {
      text: "text-forest",
      bg: "bg-forest",
      stroke: "stroke-forest",
      bgLight: "bg-forest/10",
    },
    gold: {
      text: "text-[#B38728]",
      bg: "bg-[#B38728]",
      stroke: "stroke-[#B38728]",
      bgLight: "bg-[#BF953F]/10",
    },
    charcoal: {
      text: "text-charcoal",
      bg: "bg-charcoal",
      stroke: "stroke-charcoal",
      bgLight: "bg-charcoal/10",
    },
  };

  return (
    <div
      ref={containerRef}
      className={cn("grid grid-cols-1 md:grid-cols-3 gap-8 w-full", className)}
    >
      {stats.map((stat, index) => {
        const theme = colorMap[stat.color || "forest"];
        const type = stat.type || "counter";
        const targetPercent = stat.progressValue || stat.value || 0;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center p-6 bg-cream border border-forest/10 rounded-[32px] shadow-xs"
          >
            {/* Stat Icon */}
            {stat.icon && (
              <div className={cn("p-4 rounded-2xl mb-4 text-forest", theme.bgLight)}>
                {stat.icon}
              </div>
            )}

            {/* Render Counter Stat */}
            {type === "counter" && (
              <div className="flex flex-col items-center">
                <AnimatedCounter
                  target={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  className={cn("text-4xl sm:text-5xl font-extrabold font-heading tracking-tight", theme.text)}
                />
                <span className="text-sm font-medium text-charcoal/60 mt-2 font-body">
                  {stat.label}
                </span>
              </div>
            )}

            {/* Render Radial Circle Stat */}
            {type === "circle" && (
              <div className="flex flex-col items-center">
                <div className="relative w-28 h-28 flex items-center justify-center mb-4 select-none">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {/* Background track circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      className="stroke-charcoal/5 fill-transparent"
                      strokeWidth="8"
                    />
                    {/* Animated foreground circle */}
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="40"
                      className={cn("fill-transparent", theme.stroke)}
                      strokeWidth="8"
                      strokeDasharray="251.2" // 2 * PI * r (r=40 -> 251.2)
                      initial={{ strokeDashoffset: 251.2 }}
                      animate={isInView ? { strokeDashoffset: 251.2 - (251.2 * targetPercent) / 100 } : { strokeDashoffset: 251.2 }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.1 }}
                      strokeLinecap="round"
                    />
                  </svg>
                  {/* Inside Circle Counter */}
                  <span className={cn("absolute text-xl font-bold font-heading", theme.text)}>
                    <AnimatedCounter target={targetPercent} suffix="%" />
                  </span>
                </div>
                <span className="text-sm font-medium text-charcoal/60 font-body">
                  {stat.label}
                </span>
              </div>
            )}

            {/* Render Progress Bar Stat */}
            {type === "progress" && (
              <div className="w-full flex flex-col items-center">
                <div className="flex justify-between items-center w-full mb-2">
                  <span className="text-xs font-semibold text-charcoal/50 font-body uppercase">
                    {stat.label}
                  </span>
                  <span className={cn("text-sm font-bold font-heading", theme.text)}>
                    <AnimatedCounter target={targetPercent} suffix="%" />
                  </span>
                </div>
                <div className="w-full h-3 bg-charcoal/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${targetPercent}%` } : { width: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.15 }}
                    className={cn("h-full rounded-full", theme.bg)}
                  />
                </div>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default ImpactCounter;
