"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/utils/cn";

export interface TiltCardProps {
  intensity?: number; // max tilt degrees
  glare?: boolean; // render cursor glare
  scale?: number; // scale factor on hover
  children: React.ReactNode;
  className?: string;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  intensity = 15,
  glare = true,
  scale = 1.02,
  children,
  className,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if touch device on client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isTouch = window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;
      const id = requestAnimationFrame(() => {
        setIsMobile(isTouch);
      });
      return () => cancelAnimationFrame(id);
    }
  }, []);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [0, 1], [intensity, -intensity]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-intensity, intensity]), springConfig);

  // Glare coordinates
  const glareOpacity = useSpring(0, springConfig);
  const glareX = useTransform(x, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(y, [0, 1], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    x.set(clientX / width);
    y.set(clientY / height);
    glareOpacity.set(0.3);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
    glareOpacity.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative rounded-[32px] overflow-hidden select-none cursor-default",
        !isMobile && "perspective-[1000px]",
        className
      )}
    >
      <motion.div
        style={
          isMobile
            ? {}
            : {
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }
        }
        whileHover={isMobile ? { scale: 1.01 } : { scale }}
        transition={{ duration: 0.3 }}
        className="relative w-full h-full rounded-[inherit] overflow-hidden bg-cream border border-forest/10 shadow-xs"
      >
        {/* Child content container with 3D depth */}
        <div
          style={isMobile ? {} : { transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
          className="relative z-10 w-full h-full"
        >
          {children}
        </div>

        {/* Dynamic Sheen Glare */}
        {glare && !isMobile && (
          <motion.div
            style={{
              opacity: glareOpacity,
              background: `radial-gradient(circle 250px at ${glareX} ${glareY}, rgba(255, 255, 255, 0.25), transparent 70%)`,
            }}
            className="absolute inset-0 pointer-events-none z-20"
          />
        )}
      </motion.div>
    </div>
  );
};

export default TiltCard;
