"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/utils/cn";
import { styles } from "./styles";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export interface SliderImage {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

export interface ImageSliderProps {
  images: SliderImage[];
  autoplay?: boolean;
  autoplaySpeed?: number; // ms
  infinite?: boolean;
  showArrows?: boolean;
  showPagination?: boolean;
  showThumbnails?: boolean;
  className?: string;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  autoplay = true,
  autoplaySpeed = 5000,
  infinite = true,
  showArrows = true,
  showPagination = true,
  showThumbnails = true,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [[page, direction], setPage] = useState([0, 0]);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const shouldReduceMotion = useReducedMotion();

  // Handle wraps for page indexes
  const imageIndex = infinite
    ? (page % images.length + images.length) % images.length
    : Math.max(0, Math.min(page, images.length - 1));

  const paginate = useCallback(
    (newDirection: number) => {
      if (!infinite) {
        const nextIndex = currentIndex + newDirection;
        if (nextIndex >= 0 && nextIndex < images.length) {
          setCurrentIndex(nextIndex);
          setPage([nextIndex, newDirection]);
        }
      } else {
        const nextIndex = (currentIndex + newDirection + images.length) % images.length;
        setCurrentIndex(nextIndex);
        setPage([page + newDirection, newDirection]);
      }
    },
    [currentIndex, page, infinite, images.length]
  );

  const jumpTo = (index: number) => {
    const dir = index > currentIndex ? 1 : -1;
    setCurrentIndex(index);
    setPage([index, dir]);
  };

  // Autoplay loop
  useEffect(() => {
    if (!autoplay || isHovered) return;

    const timer = setInterval(() => {
      paginate(1);
    }, autoplaySpeed);

    return () => clearInterval(timer);
  }, [autoplay, autoplaySpeed, isHovered, paginate]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      paginate(-1);
    } else if (e.key === "ArrowRight") {
      paginate(1);
    }
  };

  // Swipe/Drag gesture handler thresholds
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  // Framer Motion variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Image gallery carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative w-full aspect-16/10 sm:aspect-16/9 bg-charcoal rounded-[32px] overflow-hidden focus:outline-hidden group select-none",
        styles.focusRing,
        className
      )}
    >
      {/* Slide Images Container */}
      <div className="relative w-full h-full">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.25 },
            }}
            drag={shouldReduceMotion ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
          >
            <Image
              src={images[imageIndex].src}
              alt={images[imageIndex].alt}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
              className="object-cover pointer-events-none"
            />
            {/* Soft gradient mask for text titles */}
            {(images[imageIndex].title || images[imageIndex].description) && (
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-charcoal/80 via-charcoal/30 to-transparent p-6 sm:p-10 flex flex-col gap-2 text-cream z-10">
                {images[imageIndex].title && (
                  <h3 className="text-xl sm:text-2xl font-heading font-bold leading-tight">
                    {images[imageIndex].title}
                  </h3>
                )}
                {images[imageIndex].description && (
                  <p className="text-xs sm:text-sm font-body text-cream/80 max-w-xl leading-relaxed">
                    {images[imageIndex].description}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Chevrons Navigation Arrows */}
      {showArrows && (
        <>
          <button
            onClick={() => paginate(-1)}
            aria-label="Previous slide"
            disabled={!infinite && currentIndex === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-cream/20 hover:bg-cream/40 border border-cream/20 text-cream backdrop-blur-xs transition-all duration-200 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 z-20 cursor-pointer disabled:pointer-events-none disabled:opacity-0 focus:outline-hidden"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => paginate(1)}
            aria-label="Next slide"
            disabled={!infinite && currentIndex === images.length - 1}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-cream/20 hover:bg-cream/40 border border-cream/20 text-cream backdrop-blur-xs transition-all duration-200 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 z-20 cursor-pointer disabled:pointer-events-none disabled:opacity-0 focus:outline-hidden"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Pagination dots */}
      {showPagination && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => jumpTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              aria-current={currentIndex === idx ? "true" : undefined}
              className={cn(
                "w-2 h-2 rounded-full cursor-pointer transition-all duration-250 focus:outline-hidden",
                currentIndex === idx ? "w-6 bg-cream shadow-xs" : "bg-cream/50 hover:bg-cream/85"
              )}
            />
          ))}
        </div>
      )}

      {/* Thumbnail Nav strip (optional overlay at bottom or external, kept overlay here if shown) */}
      {showThumbnails && (
        <div className="absolute right-4 bottom-4 hidden sm:flex items-center gap-1.5 p-1.5 rounded-2xl bg-charcoal/45 backdrop-blur-xs border border-cream/15 z-20 max-w-xs overflow-hidden">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => jumpTo(idx)}
              className={cn(
                "relative w-10 h-7 rounded-lg overflow-hidden border transition-all duration-200 shrink-0 cursor-pointer focus:outline-hidden",
                currentIndex === idx ? "border-[#F7DF7C]" : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              <Image src={img.src} alt={`Thumbnail ${idx}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
