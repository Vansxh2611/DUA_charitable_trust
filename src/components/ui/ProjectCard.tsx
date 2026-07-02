"use client";

import React from "react";
import Link from "next/link";
import { ProjectCardProps } from "@/types";
import { BackgroundPattern } from "./BackgroundPattern";
import { Settings, Leaf, Palette, Terminal, Heart, Home } from "lucide-react";
import { cn } from "@/utils/cn";

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, className }) => {
  const isFlagship = project.featured === true || project.slug === "the-wisdom-collective";

  if (isFlagship) {
    // Flagship Card: Full dark background with wave ribbons, spanning multiple columns on desktop
    return (
      <div
        className={cn(
          "relative lg:col-span-2 bg-navy text-white rounded-3xl p-8 flex flex-col justify-between overflow-hidden shadow-sm border border-white/5 card-interactive min-h-[380px]",
          className
        )}
      >
        {/* Ribbon Wave SVG */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
          viewBox="0 0 600 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 0 150 Q 150 50, 300 150 T 600 150" stroke="#F7DF7C" strokeWidth="8" strokeLinecap="round" />
          <path d="M 0 170 Q 150 70, 300 170 T 600 170" stroke="#2D5B45" strokeWidth="8" strokeLinecap="round" />
          <path d="M 0 190 Q 150 90, 300 190 T 600 190" stroke="#e3edf3" strokeWidth="8" strokeLinecap="round" />
        </svg>

        {/* Flagship Content */}
        <div className="relative z-10">
          <span className="inline-block px-3 py-1 rounded-full bg-[#F7DF7C] text-charcoal font-heading font-extrabold text-[10px] uppercase tracking-wider mb-8">
            Flagship Program
          </span>
          <span className="block text-[11px] font-bold text-white/40 uppercase tracking-widest mb-1">
            Our Projects
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white mb-4">
            <Link
              href={`/our-projects/${project.slug}`}
              className="hover:text-[#F7DF7C] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7DF7C]"
            >
              {project.title}
            </Link>
          </h3>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed font-body mb-8">
            {project.description}
          </p>
        </div>

        {/* Flagship Metrics Row */}
        <div className="relative z-10 pt-6 border-t border-white/10 flex flex-wrap gap-6 text-xs text-white/75 font-semibold font-heading">
          <div className="flex items-center gap-2">
            <Home size={14} className="text-[#F7DF7C]" />
            <span>50 Active Hubs</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart size={14} className="text-red-400" />
            <span>10,000+ Mentorship Hours</span>
          </div>
        </div>
      </div>
    );
  }

  // Small Project Card: Top colored illustration half + bottom white content half
  const renderIllustration = () => {
    switch (project.slug) {
      case "curiosity-labs":
        return (
          <div className="relative h-48 w-full bg-[#fdf3c7] flex items-center justify-center overflow-hidden">
            <BackgroundPattern variant="circuit" className="text-yellow-600/15" />
            <Settings className="w-16 h-16 text-yellow-600/30 animate-spin-slow" />
          </div>
        );
      case "green-roots":
        return (
          <div className="relative h-48 w-full bg-[#dcfce7] flex items-center justify-center overflow-hidden">
            <BackgroundPattern variant="leaf" className="text-green-600/15" />
            <Leaf className="w-16 h-16 text-green-600/30" />
          </div>
        );
      case "code-bloom":
        return (
          <div className="relative h-48 w-full bg-[#dbeafe] flex items-center justify-center overflow-hidden">
            <BackgroundPattern variant="circuit" className="text-blue-600/15" />
            <Terminal className="w-16 h-16 text-blue-600/30" />
          </div>
        );
      case "canvas-of-hope":
        return (
          <div className="relative h-48 w-full bg-[#fee2e2] flex items-center justify-center overflow-hidden">
            <BackgroundPattern variant="wave" className="text-red-600/15" />
            <Palette className="w-16 h-16 text-red-600/30" />
          </div>
        );
      default:
        return (
          <div className="relative h-48 w-full bg-[#f4f6f0] flex items-center justify-center overflow-hidden">
            <BackgroundPattern variant="leaf" className="text-forest/10" />
            <Leaf className="w-16 h-16 text-forest/30" />
          </div>
        );
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-card-bg rounded-3xl overflow-hidden border border-card-border shadow-xs card-interactive",
        className
      )}
    >
      {/* Top half illustration */}
      <div className="relative overflow-hidden shrink-0">
        {renderIllustration()}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full border border-white bg-white/20 backdrop-blur-xs text-charcoal font-heading font-extrabold text-[10px] uppercase tracking-wider">
            {project.badge}
          </span>
        </div>
      </div>

      {/* Bottom half text info */}
      <div className="flex flex-col flex-grow p-6 sm:p-8">
        <h3 className="text-xl font-bold text-charcoal font-heading group-hover:text-forest transition-colors duration-200 mb-3 leading-snug">
          <Link
            href={`/our-projects/${project.slug}`}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
          >
            {project.title}
          </Link>
        </h3>
        <p className="text-sm text-charcoal/70 mb-6 line-clamp-3 leading-relaxed font-body">
          {project.description}
        </p>
        <div className="mt-auto pt-4 border-t border-charcoal/5 flex items-center gap-2 text-xs text-charcoal/65 font-bold font-heading">
          {project.slug === "curiosity-labs" && (
            <svg className="w-4 h-4 text-charcoal/40 fill-current" viewBox="0 0 24 24">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 1.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 2 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>
          )}
          {project.slug === "green-roots" && (
            <svg className="w-4 h-4 text-charcoal/40 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M12 2v20 M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" strokeLinecap="round" />
            </svg>
          )}
          {project.slug === "code-bloom" && (
            <svg className="w-4 h-4 text-charcoal/40 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8 M12 17v4" />
            </svg>
          )}
          {project.slug === "canvas-of-hope" && (
            <svg className="w-4 h-4 text-charcoal/40 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            </svg>
          )}
          <span>{project.impactMetric}</span>
        </div>
      </div>
    </div>
  );
};
