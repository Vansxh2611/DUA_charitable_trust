"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import { styles } from "./styles";
import { ChevronDown, Search } from "lucide-react";

export interface FAQItemData {
  question: string;
  answer: string;
  category: string;
}

export interface FAQAccordionProps {
  items: FAQItemData[];
  allowMultiple?: boolean;
  showSearch?: boolean;
  className?: string;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  items,
  allowMultiple = false,
  showSearch = true,
  className,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openIds, setOpenIds] = useState<string[]>([]);

  // Unique categories helper
  const categories = useMemo(() => {
    const list = Array.from(new Set(items.map((item) => item.category)));
    return ["All", ...list];
  }, [items]);

  // Filter FAQ items by category and search keyword
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  const handleToggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((openId) => openId !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn("w-full max-w-3xl mx-auto flex flex-col gap-6", className)}>
      {/* Search Input Filter */}
      {showSearch && (
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-cream border border-forest/15 rounded-full text-sm text-charcoal placeholder-charcoal/40 focus:outline-hidden focus:ring-2 focus:ring-forest/30"
          />
        </div>
      )}

      {/* Category Tabs Filter */}
      {categories.length > 2 && (
        <div className="flex flex-wrap gap-2 items-center select-none">
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
                    layoutId="activeCategoryTab"
                    className="absolute inset-0 bg-forest rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {category}
              </button>
            );
          })}
        </div>
      )}

      {/* FAQ Accordion List */}
      <div className="flex flex-col gap-3" aria-live="polite">
        <AnimatePresence initial={false}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => {
              const id = `${item.category}-${index}`;
              const isOpen = openIds.includes(id);

              return (
                <div
                  key={id}
                  className="bg-cream border border-forest/10 rounded-2xl overflow-hidden shadow-xs transition-colors duration-200"
                >
                  <button
                    id={`faq-btn-${id}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${id}`}
                    onClick={() => handleToggle(id)}
                    className={cn(
                      "w-full px-6 py-4 flex items-center justify-between text-left font-heading font-semibold text-charcoal cursor-pointer focus:outline-hidden focus-visible:bg-charcoal/5",
                      styles.focusRing
                    )}
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 text-charcoal/50 transition-transform duration-300 shrink-0 ml-4",
                        isOpen ? "rotate-180 text-forest" : ""
                      )}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        id={`faq-panel-${id}`}
                        role="region"
                        aria-labelledby={`faq-btn-${id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-6 pb-5 pt-1 text-sm sm:text-base text-charcoal/70 leading-relaxed font-body border-t border-forest/5">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div key="no-results" className="text-center py-12 text-charcoal/55 text-sm font-body">
              No questions found matching your search.
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FAQAccordion;
