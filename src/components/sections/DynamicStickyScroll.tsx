"use client";

import React from "react";
import dynamic from "next/dynamic";
import { StickyScrollStep } from "../ui/StickyScrollSection";

const StickyScrollSection = dynamic(() => import("../ui/StickyScrollSection"), {
  ssr: false,
});

interface DynamicStickyScrollProps {
  steps: StickyScrollStep[];
  className?: string;
}

export const DynamicStickyScroll: React.FC<DynamicStickyScrollProps> = ({ steps, className }) => {
  return <StickyScrollSection steps={steps} className={className} />;
};

export default DynamicStickyScroll;
