import React from "react";
import Link from "next/link";
import { ButtonProps } from "@/types";
import { cn } from "@/utils/cn";
import { Loader } from "./Loader";

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  type = "button",
  className,
  icon,
  iconPosition = "left",
  href,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-heading font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-forest/40 active:scale-[0.98] disabled:opacity-55 disabled:pointer-events-none cursor-pointer";

  const variants = {
    primary: "bg-charcoal text-cream hover:bg-forest hover:text-cream shadow-xs",
    secondary: "bg-forest text-cream hover:bg-forest/95 shadow-xs",
    outline: "border border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-cream bg-transparent",
    text: "text-forest hover:text-forest/80 bg-transparent px-0 py-0 active:scale-100",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  const content = (
    <>
      {loading && <Loader size="sm" className="mr-2 border-current" />}
      {!loading && icon && iconPosition === "left" && <span className="mr-2 flex items-center">{icon}</span>}
      <span>{label}</span>
      {!loading && icon && iconPosition === "right" && <span className="ml-2 flex items-center">{icon}</span>}
    </>
  );

  const buttonClasses = cn(
    baseStyles,
    variants[variant],
    variant !== "text" ? sizes[size] : "",
    className
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={buttonClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {content}
    </button>
  );
};
