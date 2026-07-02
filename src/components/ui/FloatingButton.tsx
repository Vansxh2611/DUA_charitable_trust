"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { styles } from "./styles";
import { Plus } from "lucide-react";

export interface FloatingAction {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  href?: string;
}

export interface FloatingButtonProps {
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
  tooltip?: string;
  pulse?: boolean;
  actions?: FloatingAction[];
  sticky?: boolean;
  className?: string;
}

export const FloatingButton: React.FC<FloatingButtonProps> = ({
  icon,
  label,
  onClick,
  tooltip,
  pulse = true,
  actions = [],
  sticky = true,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Close floating actions when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  const handleMainButtonClick = () => {
    if (actions.length > 0) {
      setIsOpen((prev) => !prev);
    } else if (onClick) {
      onClick();
    }
  };

  const mainIcon = icon || (
    <Plus
      className={cn("w-6 h-6 transition-transform duration-300", isOpen ? "rotate-45" : "")}
    />
  );

  const containerClasses = cn(
    sticky ? "fixed bottom-8 right-8 z-50" : "relative inline-block",
    className
  );

  return (
    <div ref={containerRef} className={containerClasses}>
      {/* Expandable sub-actions drawer */}
      <AnimatePresence>
        {isOpen && actions.length > 0 && (
          <ul
            role="menu"
            aria-label={`${label} sub-actions`}
            className="flex flex-col gap-3 mb-4 items-end"
          >
            {actions.map((action, index) => {
              const itemContent = (
                <>
                  <span className="px-3 py-1 text-xs font-semibold font-body bg-charcoal text-cream rounded-lg shadow-md border border-charcoal/10 pointer-events-none select-none">
                    {action.label}
                  </span>
                  <span className="w-11 h-11 flex items-center justify-center rounded-full bg-cream text-charcoal border border-forest/10 shadow-md hover:bg-forest hover:text-cream transition-colors duration-200 cursor-pointer">
                    {action.icon}
                  </span>
                </>
              );

              return (
                <motion.li
                  key={index}
                  role="menuitem"
                  initial={{ opacity: 0, y: 15, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.8 }}
                  transition={{ duration: 0.25, delay: (actions.length - 1 - index) * 0.05 }}
                  className="flex items-center gap-3 group"
                >
                  {action.href ? (
                    <Link
                      href={action.href}
                      className={cn("flex items-center gap-3 focus:outline-hidden", styles.focusRing)}
                      onClick={() => {
                        setIsOpen(false);
                        if (action.onClick) action.onClick();
                      }}
                    >
                      {itemContent}
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        if (action.onClick) action.onClick();
                      }}
                      className={cn("flex items-center gap-3 focus:outline-hidden", styles.focusRing)}
                    >
                      {itemContent}
                    </button>
                  )}
                </motion.li>
              );
            })}
          </ul>
        )}
      </AnimatePresence>

      {/* Main Trigger Button */}
      <div className="relative group flex items-center justify-center">
        {/* Pulsing ring background */}
        {pulse && !isOpen && (
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="absolute -inset-2.5 rounded-full bg-forest/20 pointer-events-none z-0"
          />
        )}

        {/* Action Button */}
        <button
          aria-haspopup={actions.length > 0 ? "true" : undefined}
          aria-expanded={actions.length > 0 ? isOpen : undefined}
          aria-label={label}
          onClick={handleMainButtonClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
          className={cn(
            "relative w-14 h-14 rounded-full bg-forest text-cream flex items-center justify-center shadow-lg hover:bg-forest/90 transition-colors duration-250 cursor-pointer focus:outline-hidden z-10",
            styles.focusRing
          )}
        >
          {mainIcon}
        </button>

        {/* Hover/Focus Tooltip */}
        <AnimatePresence>
          {showTooltip && tooltip && !isOpen && (
            <motion.div
              role="tooltip"
              initial={{ opacity: 0, x: -15, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -15, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute right-full mr-4 px-3 py-1.5 text-xs font-semibold font-body bg-charcoal text-cream rounded-lg shadow-md border border-charcoal/10 pointer-events-none z-20 whitespace-nowrap"
            >
              {tooltip}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FloatingButton;
