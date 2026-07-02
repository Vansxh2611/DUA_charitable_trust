"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { Sparkles } from "lucide-react";

export interface SectionDividerProps {
  variant?: "minimal" | "premium" | "decorative";
  icon?: React.ReactNode;
  animate?: boolean;
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  variant = "premium",
  icon,
  animate = true,
  className,
}) => {
  const lineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const centerVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { delay: 0.4, duration: 0.5, type: "spring", stiffness: 200, damping: 15 },
    },
  };

  const currentIcon = icon || <Sparkles className="w-4 h-4 text-[#B38728]" />;

  return (
    <div className={cn("relative flex items-center justify-center my-12 w-full select-none", className)}>
      {variant === "minimal" && (
        <div className="flex items-center w-full max-w-lg">
          <motion.div
            variants={animate ? lineVariants : undefined}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="h-[1px] bg-charcoal/10 flex-grow origin-right"
          />
          <motion.div
            variants={animate ? centerVariants : undefined}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="w-2 h-2 mx-4 rounded-full bg-linear-to-r from-[#BF953F] to-[#B38728]"
          />
          <motion.div
            variants={animate ? lineVariants : undefined}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="h-[1px] bg-charcoal/10 flex-grow origin-left"
          />
        </div>
      )}

      {variant === "premium" && (
        <div className="flex items-center w-full max-w-2xl">
          <motion.div
            variants={animate ? lineVariants : undefined}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="h-[1px] bg-linear-to-l from-charcoal/20 via-charcoal/5 to-transparent flex-grow origin-right"
          />
          <motion.div
            variants={animate ? centerVariants : undefined}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex items-center justify-center p-2.5 mx-4 rounded-full bg-cream border border-[#BF953F]/30 shadow-xs"
          >
            {currentIcon}
          </motion.div>
          <motion.div
            variants={animate ? lineVariants : undefined}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="h-[1px] bg-linear-to-r from-charcoal/20 via-charcoal/5 to-transparent flex-grow origin-left"
          />
        </div>
      )}

      {variant === "decorative" && (
        <div className="flex flex-col items-center gap-1.5 w-full max-w-md">
          <div className="flex items-center w-full">
            <motion.div
              variants={animate ? lineVariants : undefined}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="h-[1px] bg-linear-to-l from-charcoal/15 to-transparent flex-grow origin-right"
            />
            <motion.div
              variants={animate ? centerVariants : undefined}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mx-3 text-[#B38728] flex items-center justify-center"
            >
              {currentIcon}
            </motion.div>
            <motion.div
              variants={animate ? lineVariants : undefined}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="h-[1px] bg-linear-to-r from-charcoal/15 to-transparent flex-grow origin-left"
            />
          </div>
          {/* Subtle bottom decorative leaf/dot pattern */}
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#BF953F]/40" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#BF953F]/70" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#BF953F]/40" />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SectionDivider;
