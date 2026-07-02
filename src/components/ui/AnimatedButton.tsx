"use client";

import React, { forwardRef, useState, MouseEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import { styles } from "./styles";
import { Loader } from "./Loader";

export interface AnimatedButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold" | "accent";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  href?: string;
  className?: string;
  children?: React.ReactNode;
  label?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export const AnimatedButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, AnimatedButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      disabled = false,
      icon,
      iconPosition = "right",
      href,
      className,
      children,
      label,
      type = "button",
      onClick,
      ...props
    },
    ref
  ) => {
    const [ripples, setRipples] = useState<Ripple[]>([]);
    const [rippleCount, setRippleCount] = useState(0);

    const baseStyles =
      "relative inline-flex items-center justify-center font-heading font-medium rounded-full cursor-pointer focus:outline-hidden active:scale-[0.98] disabled:opacity-55 disabled:pointer-events-none overflow-hidden select-none";

    const variantStyles = {
      primary: "bg-forest text-white hover:bg-forest-dark hover:text-white shadow-xs",
      secondary: "bg-white border border-forest text-forest hover:bg-forest hover:text-white shadow-xs",
      outline: "border border-forest text-forest hover:bg-forest hover:text-white bg-transparent",
      ghost: "text-forest hover:bg-forest/10 bg-transparent",
      accent: "bg-accent text-white hover:bg-accent-dark hover:text-white shadow-xs",
      gold: "bg-accent-gradient text-white hover:brightness-105 shadow-xs font-semibold",
    };

    const sizeStyles = {
      sm: "px-4 py-1.5 text-xs",
      md: "px-6 py-2.5 text-sm",
      lg: "px-8 py-3.5 text-base",
    };

    const handleCreateRipple = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (disabled || loading) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newRipple: Ripple = {
        id: rippleCount,
        x,
        y,
      };

      setRipples((prev) => [...prev, newRipple]);
      setRippleCount((prev) => prev + 1);

      // Clean up ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);

      if (onClick) {
        onClick(e);
      }
    };

    const isGold = variant === "gold";

    const content = (
      <>
        {/* Shine sweeping effect */}
        <span className="absolute inset-0 block -translate-x-full group-hover:translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out z-10 pointer-events-none" />

        {/* Ripples container */}
        <span className="absolute inset-0 block overflow-hidden pointer-events-none">
          <AnimatePresence>
            {ripples.map((ripple) => (
              <motion.span
                key={ripple.id}
                initial={{ scale: 0, opacity: 0.35 }}
                animate={{ scale: 6, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={cn(
                  "absolute block rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none",
                  isGold ? "bg-charcoal/20" : "bg-white/20"
                )}
                style={{
                  left: ripple.x,
                  top: ripple.y,
                  width: "20px",
                  height: "20px",
                }}
              />
            ))}
          </AnimatePresence>
        </span>

        {/* Loading Spinner */}
        {loading && <Loader size="sm" className="mr-2 border-current z-20" />}

        {/* Button Content */}
        {!loading && icon && iconPosition === "left" && (
          <motion.span
            whileHover={{ x: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="mr-2 flex items-center z-20"
          >
            {icon}
          </motion.span>
        )}

        <span className="relative z-20">{children || label}</span>

        {!loading && icon && iconPosition === "right" && (
          <motion.span
            whileHover={{ x: 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="ml-2 flex items-center z-20"
          >
            {icon}
          </motion.span>
        )}
      </>
    );

    const mergedClasses = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      styles.focusRing,
      "group",
      className
    );

    if (href && !disabled) {
      return (
        <Link
          href={href}
          className={mergedClasses}
          onClick={handleCreateRipple}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...(props as Omit<React.ComponentPropsWithoutRef<typeof Link>, "href">)}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        type={type}
        disabled={disabled || loading}
        className={mergedClasses}
        onClick={handleCreateRipple}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...(props as React.ComponentPropsWithoutRef<"button">)}
      >
        {content}
      </button>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";
