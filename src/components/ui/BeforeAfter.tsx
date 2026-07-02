"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/utils/cn";
import { styles } from "./styles";
import Image from "next/image";

export interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  initialPosition?: number; // 0 to 100
  className?: string;
}

export const BeforeAfter: React.FC<BeforeAfterProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  initialPosition = 50,
  className,
}) => {
  const [sliderPosition, setSliderPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number | string>("100%");

  // Track the actual container width reactively to prevent reading refs in render
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        requestAnimationFrame(() => {
          setContainerWidth(width);
        });
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Listen to global events for drag tracking to prevent stuttering outside container bounds
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  // Keyboard navigation adjusting slider position
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setSliderPosition((prev) => Math.max(0, prev - 5));
      e.preventDefault();
    } else if (e.key === "ArrowRight") {
      setSliderPosition((prev) => Math.min(100, prev + 5));
      e.preventDefault();
    } else if (e.key === "Home") {
      setSliderPosition(0);
      e.preventDefault();
    } else if (e.key === "End") {
      setSliderPosition(100);
      e.preventDefault();
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full aspect-16/10 sm:aspect-16/9 bg-charcoal rounded-[32px] overflow-hidden select-none",
        className
      )}
    >
      {/* 1. After Image (Background layer) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={afterImage}
          alt="After comparison"
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
          priority
          className="object-cover"
        />
        {afterLabel && (
          <span className="absolute bottom-4 right-4 px-3.5 py-1.5 text-xs font-semibold font-body bg-charcoal/70 text-cream rounded-xl border border-cream/15 backdrop-blur-xs select-none z-10">
            {afterLabel}
          </span>
        )}
      </div>

      {/* 2. Before Image (Clipped overlay container) */}
      <div
        style={{ width: `${sliderPosition}%` }}
        className="absolute inset-y-0 left-0 h-full overflow-hidden z-10"
      >
        {/* Outer dimensions must match parent exactly to prevent scaling issues */}
        <div className="absolute inset-0 w-full h-full aspect-16/10 sm:aspect-16/9" style={{ width: containerWidth }}>
          <Image
            src={beforeImage}
            alt="Before comparison"
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
            className="object-cover"
          />
          {beforeLabel && (
            <span className="absolute bottom-4 left-4 px-3.5 py-1.5 text-xs font-semibold font-body bg-forest/80 text-cream rounded-xl border border-cream/15 backdrop-blur-xs select-none">
              {beforeLabel}
            </span>
          )}
        </div>
      </div>

      {/* 3. Drag Handle Line and Button Slider */}
      <div
        style={{ left: `${sliderPosition}%` }}
        className="absolute inset-y-0 -ml-[1px] w-[2px] bg-cream/80 backdrop-blur-xs z-20 pointer-events-none"
      >
        <button
          role="slider"
          aria-label="Image comparison position"
          aria-valuenow={Math.round(sliderPosition)}
          aria-valuemin={0}
          aria-valuemax={100}
          onKeyDown={handleKeyDown}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-cream text-charcoal border border-forest/15 shadow-md cursor-grab active:cursor-grabbing pointer-events-auto focus:outline-hidden",
            isDragging ? "scale-105 cursor-grabbing" : "",
            styles.focusRing
          )}
        >
          {/* Arrow handles symbols */}
          <div className="flex gap-1 items-center justify-center text-forest">
            <span className="text-[10px] font-bold">◀</span>
            <span className="text-[10px] font-bold">▶</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default BeforeAfter;
