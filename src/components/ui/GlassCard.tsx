"use client";

import React from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { cn } from "@/utils/cn";

export interface GlassCardProps {
  opacity?: number; // 0 to 1
  blur?: number; // blur value in px
  glow?: boolean; // enable mouse-follow spotlight
  border?: boolean; // render border
  gradientBorder?: boolean; // render premium border
  children: React.ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  opacity = 0.45,
  blur = 12,
  glow = true,
  border = true,
  gradientBorder = false,
  children,
  className,
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const styleObj: React.CSSProperties = {
    backgroundColor: `rgba(244, 246, 240, ${opacity})`, // Using cream theme color with opacity
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      style={styleObj}
      className={cn(
        "relative rounded-[32px] overflow-hidden group select-none cursor-default",
        border && !gradientBorder ? "border border-cream/30" : "",
        className
      )}
    >
      {/* Premium Gradient Border */}
      {border && gradientBorder && (
        <span className="absolute inset-0 block rounded-[inherit] p-[1px] bg-linear-to-b from-cream/40 via-cream/10 to-[#BF953F]/20 pointer-events-none [mask-image:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:xor] [webkit-mask-composite:xor] z-20" />
      )}

      {/* Mouse hover spotlight glow */}
      {glow && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                250px circle at ${mouseX}px ${mouseY}px,
                rgba(247, 223, 124, 0.15),
                transparent 80%
              )
            `,
          }}
        />
      )}

      {/* Content wrapper */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default GlassCard;
