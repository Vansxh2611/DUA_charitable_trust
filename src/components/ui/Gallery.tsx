"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import Image from "next/image";

export interface GalleryItem {
  id: string | number;
  src: string;
  alt: string;
  category: string;
  title?: string;
  description?: string;
  aspectClass?: string; // e.g. "aspect-square", "aspect-3/4", "aspect-4/3"
}

export interface GalleryProps {
  items: GalleryItem[];
  categories?: string[];
  className?: string;
}

export const Gallery: React.FC<GalleryProps> = ({
  items,
  categories: customCategories,
  className,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Auto-detect categories if none provided
  const categories = useMemo(() => {
    if (customCategories) return ["All", ...customCategories];
    const detected = Array.from(new Set(items.map((item) => item.category)));
    return ["All", ...detected];
  }, [items, customCategories]);

  // Filter items
  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") return items;
    return items.filter((item) => item.category === selectedCategory);
  }, [items, selectedCategory]);

  const isOpen = activeLightboxIndex !== null;

  // iOS-safe scroll locking
  useScrollLock(isOpen);

  // Focus trap for lightbox
  const lightboxRef = useFocusTrap<HTMLDivElement>(isOpen);

  const handleOpenLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const handleNext = useCallback(() => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % filteredItems.length;
    });
  }, [activeLightboxIndex, filteredItems.length]);

  const handlePrev = useCallback(() => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + filteredItems.length) % filteredItems.length;
    });
  }, [activeLightboxIndex, filteredItems.length]);

  // Keyboard navigation inside lightbox
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseLightbox();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleNext, handlePrev]);

  return (
    <div className={cn("w-full flex flex-col gap-6", className)}>
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 items-center select-none justify-center mb-4">
        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "relative px-4 py-1.5 rounded-full text-xs font-heading font-semibold transition-all duration-200 capitalize cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-forest/35",
                isSelected ? "text-cream" : "text-charcoal/70 hover:text-forest"
              )}
            >
              {isSelected && (
                <motion.span
                  layoutId="activeGalleryTab"
                  className="absolute inset-0 bg-forest rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {category}
            </button>
          );
        })}
      </div>

      {/* Grid gallery */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => {
            const aspect = item.aspectClass || "aspect-square";

            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                className={cn(
                  "relative w-full rounded-[24px] overflow-hidden border border-forest/10 bg-cream cursor-pointer group shadow-xs hover:shadow-md transition-shadow duration-300",
                  aspect
                )}
                onClick={() => handleOpenLightbox(index)}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Floating Zoom Icon */}
                <div className="absolute top-4 right-4 p-2.5 rounded-full bg-cream/80 backdrop-blur-xs text-charcoal border border-forest/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 shadow-sm pointer-events-none">
                  <Maximize2 className="w-4 h-4" />
                </div>
                {/* Info Text Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-charcoal/80 via-charcoal/30 to-transparent p-5 flex flex-col gap-1 text-cream opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                  {item.title && (
                    <h4 className="font-heading font-semibold text-base leading-tight">
                      {item.title}
                    </h4>
                  )}
                  {item.description && (
                    <p className="font-body text-xs text-cream/85 truncate">
                      {item.description}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox dialog */}
      <AnimatePresence>
        {isOpen && activeLightboxIndex !== null && (
          <div
            ref={lightboxRef}
            role="dialog"
            aria-modal="true"
            aria-label="Image view modal"
            className="fixed inset-0 bg-charcoal/90 z-[999] flex items-center justify-center p-4 sm:p-10 backdrop-blur-sm"
          >
            {/* Close trigger boundary */}
            <div className="absolute inset-0 z-0 cursor-zoom-out" onClick={handleCloseLightbox} />

            {/* Left Nav */}
            <button
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-cream/10 border border-cream/15 text-cream hover:bg-cream/20 cursor-pointer focus:outline-hidden z-25 focus:ring-2 focus:ring-cream/40"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Lightbox Container Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="relative max-w-5xl w-full aspect-16/10 sm:aspect-16/9 rounded-[32px] overflow-hidden border border-cream/10 bg-charcoal z-10 flex flex-col items-center justify-center"
            >
              <div className="relative w-full h-full">
                <Image
                  src={filteredItems[activeLightboxIndex].src}
                  alt={filteredItems[activeLightboxIndex].alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>

              {/* Description Block */}
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-charcoal/90 via-charcoal/65 to-transparent p-6 text-cream z-20 flex flex-col gap-1 w-full text-left">
                <span className="text-xs font-bold text-[#F7DF7C] tracking-wide uppercase font-body">
                  {filteredItems[activeLightboxIndex].category}
                </span>
                {filteredItems[activeLightboxIndex].title && (
                  <h3 className="text-lg sm:text-xl font-heading font-semibold leading-tight">
                    {filteredItems[activeLightboxIndex].title}
                  </h3>
                )}
                {filteredItems[activeLightboxIndex].description && (
                  <p className="text-xs sm:text-sm font-body text-cream/75 max-w-2xl leading-relaxed">
                    {filteredItems[activeLightboxIndex].description}
                  </p>
                )}
              </div>
            </motion.div>

            {/* Right Nav */}
            <button
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-cream/10 border border-cream/15 text-cream hover:bg-cream/20 cursor-pointer focus:outline-hidden z-25 focus:ring-2 focus:ring-cream/40"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Exit Cross trigger */}
            <button
              onClick={handleCloseLightbox}
              aria-label="Close modal dialog"
              className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center rounded-full bg-cream/10 border border-cream/15 text-cream hover:bg-cream/20 cursor-pointer focus:outline-hidden z-25 focus:ring-2 focus:ring-cream/40"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
