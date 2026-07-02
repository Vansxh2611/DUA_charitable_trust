"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export interface TestimonialData {
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number; // 1 to 5
  company?: string;
  logo?: string; // Optional logo path
}

export interface TestimonialSliderProps {
  testimonials: TestimonialData[];
  autoplay?: boolean;
  interval?: number; // ms
  className?: string;
}

export const TestimonialSlider: React.FC<TestimonialSliderProps> = ({
  testimonials,
  autoplay = true,
  interval = 6000,
  className,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1: left, 1: right
  const [isHovered, setIsHovered] = useState(false);

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const jumpTo = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  useEffect(() => {
    if (!autoplay || isHovered) return;

    const timer = setInterval(() => {
      handleNext();
    }, interval);

    return () => clearInterval(timer);
  }, [autoplay, interval, isHovered, handleNext]);

  const current = testimonials[activeIndex];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "50%" : "-50%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "50%" : "-50%",
      opacity: 0,
    }),
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative w-full max-w-2xl mx-auto p-6 sm:p-10 rounded-[32px] bg-cream border border-forest/10 shadow-xs flex flex-col gap-6 select-none overflow-hidden text-center items-center justify-center cursor-default",
        className
      )}
    >
      {/* Decorative Gold top border */}
      <span className="absolute top-0 left-0 right-0 h-[3px] bg-linear-to-r from-[#BF953F] via-[#F7DF7C] to-[#B38728] z-10" />

      {/* Quote Symbol background */}
      <div className="absolute top-6 left-6 text-forest/5 pointer-events-none z-0">
        <Quote className="w-20 h-20 rotate-180" />
      </div>

      <div className="relative w-full min-h-[180px] z-10 flex flex-col items-center justify-center">
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 350, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="w-full flex flex-col items-center gap-4"
          >
            {/* Stars rating */}
            <div className="flex items-center gap-1.5 justify-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-4 h-4",
                    i < current.rating ? "text-[#B38728] fill-[#B38728]" : "text-charcoal/10"
                  )}
                />
              ))}
            </div>

            {/* Testimonial Quote */}
            <p className="text-base sm:text-lg font-body text-charcoal/80 italic leading-relaxed max-w-xl">
              &ldquo;{current.quote}&rdquo;
            </p>

            {/* Profile Avatar & Details */}
            <div className="flex flex-col items-center gap-2 mt-2">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-forest/15 shadow-sm">
                <Image
                  src={current.avatar}
                  alt={current.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-sm text-charcoal">
                  {current.name}
                </span>
                <span className="text-xs text-charcoal/50 font-body">
                  {current.role} {current.company ? `• ${current.company}` : ""}
                </span>
              </div>
            </div>

            {/* Company logo if present */}
            {current.logo && (
              <div className="relative w-20 h-8 opacity-45 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300 mt-1 flex items-center justify-center">
                <Image
                  src={current.logo}
                  alt="Company logo"
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Manual Chevron controls */}
      <div className="flex items-center justify-between w-full mt-2 z-10 px-2">
        <button
          onClick={handlePrev}
          aria-label="Previous testimonial"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-forest/5 hover:bg-forest/10 text-forest border border-forest/10 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-forest/30"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Pagination Dots */}
        <div className="flex items-center gap-1.5 select-none">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => jumpTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-200 cursor-pointer focus:outline-hidden",
                activeIndex === idx ? "w-5 bg-forest" : "bg-forest/20 hover:bg-forest/45"
              )}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          aria-label="Next testimonial"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-forest/5 hover:bg-forest/10 text-forest border border-forest/10 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-forest/30"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default TestimonialSlider;
