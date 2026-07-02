"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { m, useReducedMotion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";
import { navItems, siteConfig } from "@/constants/navigation";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { Button } from "@/components/ui/Button";

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  // Focus trap for accessibility
  const drawerRef = useFocusTrap<HTMLDivElement>(isOpen);

  // Close drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close drawer on path change (navigation)
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const drawerVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { x: "100%" },
    visible: shouldReduceMotion
      ? { opacity: 1 }
      : { x: 0 },
    exit: shouldReduceMotion ? { opacity: 0 } : { x: "100%" },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <m.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
            transition={{ duration: shouldReduceMotion ? 0.15 : 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal/40 backdrop-blur-xs z-40 cursor-pointer pointer-events-auto"
            aria-hidden="true"
          />

          {/* Drawer Container */}
          <m.div
            ref={drawerRef}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={drawerVariants}
            transition={
              shouldReduceMotion
                ? { duration: 0.2 }
                : { type: "spring", damping: 25, stiffness: 200 }
            }
            className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-sage/95 backdrop-blur-xl border-l border-charcoal/10 shadow-premium p-6 z-50 flex flex-col justify-between pointer-events-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-nav-title"
          >
            <div>
              {/* Screen reader title */}
              <h2 id="mobile-nav-title" className="sr-only">
                Navigation Menu
              </h2>

              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-charcoal/10">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-forest focus:outline-none focus-visible:ring-2 focus-visible:ring-forest/40 rounded-md"
                  aria-label={`${siteConfig.name} Home`}
                >
                  <Image
                    src="/logo-icon.png"
                    alt={`${siteConfig.name} Logo`}
                    width={24}
                    height={24}
                    className="w-6 h-6 object-contain"
                  />
                  <span className="font-heading font-bold text-base tracking-tight text-charcoal">
                    {siteConfig.name}
                  </span>
                </Link>
                <button
                  onClick={onClose}
                  className="p-2 text-charcoal hover:text-forest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest/40 rounded-full"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-2 mt-6" aria-label="Mobile Navigation">
                {navItems.map((item, index) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <Link
                      key={index}
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex items-center py-3 px-4 rounded-xl text-base font-bold font-heading transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest/40",
                        isActive
                          ? "bg-forest/5 text-forest"
                          : "text-charcoal/80 hover:bg-charcoal/5 hover:text-charcoal"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="mt-auto">
              <Button
                label="Get Involved"
                variant="primary"
                size="md"
                href={siteConfig.donateLink}
                className="w-full text-center py-3 bg-charcoal text-cream hover:bg-forest hover:text-cream rounded-full font-bold focus-visible:ring-2 focus-visible:ring-forest/40"
              />
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileNavDrawer;
