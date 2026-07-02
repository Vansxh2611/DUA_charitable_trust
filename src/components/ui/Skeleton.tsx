import React from "react";
import { cn } from "@/utils/cn";

/* ── Base Skeleton ───────────────────────────────────────────────────────── */
interface SkeletonProps {
  className?: string;
  variant?: "block" | "text" | "circle";
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, variant = "block" }) => {
  return (
    <div
      aria-busy="true"
      aria-label="Loading…"
      className={cn(
        "animate-shimmer rounded-md",
        variant === "circle" && "rounded-full",
        variant === "text" && "h-4 w-3/4 mb-2",
        className
      )}
    />
  );
};

/* ── Card Skeleton ───────────────────────────────────────────────────────── */
interface CardSkeletonProps {
  className?: string;
}

export const CardSkeleton: React.FC<CardSkeletonProps> = ({ className }) => {
  return (
    <div
      aria-busy="true"
      className={cn(
        "border border-forest/10 rounded-3xl p-6 bg-white/40 shadow-xs flex flex-col gap-4 w-full h-[400px]",
        className
      )}
    >
      <Skeleton className="w-full h-48 rounded-2xl" />
      <Skeleton className="h-4 w-1/4 rounded-full" />
      <Skeleton className="h-6 w-3/4 rounded-md" />
      <Skeleton className="h-4 w-full rounded-md" />
      <Skeleton className="h-4 w-5/6 rounded-md" />
      <Skeleton className="mt-auto h-10 w-32 rounded-full" />
    </div>
  );
};

/* ── Section Skeleton ────────────────────────────────────────────────────── */
interface SectionSkeletonProps {
  height?: string;
  className?: string;
}

export const SectionSkeleton: React.FC<SectionSkeletonProps> = ({
  height = "h-[500px]",
  className,
}) => {
  return (
    <div
      aria-busy="true"
      className={cn("w-full flex flex-col gap-8 py-16 px-6 md:px-12", height, className)}
    >
      <div className="flex flex-col gap-3 items-center">
        <Skeleton className="h-3 w-20 rounded-full" />
        <Skeleton className="h-8 w-64 rounded-md" />
        <Skeleton className="h-4 w-48 rounded-md" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full flex-grow mt-4">
        <CardSkeleton />
        <CardSkeleton className="hidden md:flex" />
        <CardSkeleton className="hidden lg:flex" />
      </div>
    </div>
  );
};

/* ── Image Skeleton ──────────────────────────────────────────────────────── */
interface ImageSkeletonProps {
  aspectRatio?: string;
  className?: string;
}

export const ImageSkeleton: React.FC<ImageSkeletonProps> = ({
  aspectRatio = "aspect-video",
  className,
}) => {
  return (
    <div
      aria-busy="true"
      className={cn("animate-shimmer rounded-2xl w-full", aspectRatio, className)}
    />
  );
};
