"use client";

import { useEffect, useRef, RefObject } from "react";

export function useFocusTrap<T extends HTMLElement>(active: boolean): RefObject<T | null> {
  const containerRef = useRef<T | null>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof document === "undefined") return;

    if (active) {
      // Store the active element to restore it on close
      previouslyFocusedElementRef.current = document.activeElement as HTMLElement;

      const container = containerRef.current;
      if (!container) return;

      const focusableSelector =
        'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';

      const getFocusableElements = (): HTMLElement[] => {
        return Array.from(container.querySelectorAll<HTMLElement>(focusableSelector)).filter(
          (el) => el.tabIndex !== -1
        );
      };

      // Set focus to the first focusable element inside the modal
      const focusableElements = getFocusableElements();
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }

      const handleKeyDown = (e: KeyboardEvent): void => {
        if (e.key !== "Tab") return;

        const currentFocusables = getFocusableElements();
        if (currentFocusables.length === 0) {
          e.preventDefault();
          return;
        }

        const firstEl = currentFocusables[0];
        const lastEl = currentFocusables[currentFocusables.length - 1];

        if (e.shiftKey) {
          // Backward tab
          if (document.activeElement === firstEl) {
            lastEl.focus();
            e.preventDefault();
          }
        } else {
          // Forward tab
          if (document.activeElement === lastEl) {
            firstEl.focus();
            e.preventDefault();
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        if (previouslyFocusedElementRef.current) {
          previouslyFocusedElementRef.current.focus();
        }
      };
    }
  }, [active]);

  return containerRef;
}

export default useFocusTrap;
