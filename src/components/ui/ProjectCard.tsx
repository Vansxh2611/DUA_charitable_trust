"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ProjectCardProps } from "@/types";
import { BackgroundPattern } from "./BackgroundPattern";
import { Heart, Home, ArrowRight } from "lucide-react";
import { cn } from "@/utils/cn";

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, className }) => {
  const isFlagship = project.featured === true || project.slug === "the-wisdom-collective";

  // Category-specific pastel/wash backgrounds and border styling
  const getCategoryWash = (category: string) => {
    switch (category.toLowerCase()) {
      case "stem":
        return "bg-accent/[0.04] hover:bg-accent/[0.07] border-accent/15";
      case "environment":
        return "bg-success/[0.04] hover:bg-success/[0.07] border-success/15";
      case "digital literacy":
      case "digital":
        return "bg-info/[0.04] hover:bg-info/[0.07] border-info/15";
      case "arts":
      case "art":
        return "bg-campaign-accent/[0.04] hover:bg-campaign-accent/[0.07] border-campaign-accent/15";
      default:
        return "bg-sage/20 hover:bg-sage/30 border-card-border";
    }
  };

  if (isFlagship) {
    // Flagship Card: Split layout with 8px rounded corners, no badges/tags
    return (
      <div
        className={cn(
          "relative lg:col-span-2 bg-card-bg rounded-lg overflow-hidden shadow-sm border border-card-border card-interactive grid grid-cols-1 md:grid-cols-12 min-h-[420px] group",
          className
        )}
      >
        {/* Left Side: Real Image (Taller on desktop) */}
        <div className="relative md:col-span-6 min-h-[300px] md:min-h-full overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
            className="object-cover transition-transform duration-500 group-hover:scale-103"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/44 via-transparent to-transparent pointer-events-none z-10" />
        </div>

        {/* Right Side: Content with dark brand styling */}
        <div className="relative md:col-span-6 p-8 flex flex-col justify-between bg-navy text-white z-20">
          <BackgroundPattern variant="wave" opacity={0.06} className="text-white" />

          <div className="relative z-10">
            <span className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-2 font-body">
              Featured Work
            </span>
            <h3 className="text-2xl font-extrabold font-heading text-white mb-4 leading-tight">
              <Link
                href={`/our-projects/${project.slug}`}
                className="hover:text-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 rounded"
              >
                {project.title}
              </Link>
            </h3>
            <p className="text-sm text-white/80 leading-relaxed font-body mb-8">
              {project.description}
            </p>
          </div>

          {/* Flagship Metrics Row */}
          <div className="relative z-10 pt-5 border-t border-white/10 flex flex-wrap gap-5 text-xs text-white/70 font-semibold font-heading">
            <div className="flex items-center gap-2">
              <Home size={14} className="text-secondary" />
              <span>50 Active Hubs</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart size={14} className="text-red-400" />
              <span>10,000+ Mentorship Hours</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Small Project Card: Photo on top (taller), Text info with category wash on bottom (8px rounded corners, no tags)
  return (
    <div
      className={cn(
        "flex flex-col h-full bg-card-bg rounded-lg overflow-hidden border border-card-border shadow-xs card-interactive group",
        className
      )}
    >
      {/* Top half: Photo - Taller height (h-64 sm:h-72) */}
      <div className="relative overflow-hidden shrink-0 h-64 sm:h-72 w-full">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none z-10" />
      </div>

      {/* Bottom half: Text info with category wash background */}
      <div className={cn(
        "flex flex-col flex-grow p-6 sm:p-7 transition-all duration-300 border-t",
        getCategoryWash(project.category)
      )}>
        <h3 className="text-lg sm:text-xl font-bold text-charcoal font-heading hover:text-forest transition-colors duration-200 mb-3 leading-snug">
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

        <div className="mt-auto pt-4 border-t border-charcoal/5 flex items-center justify-between text-xs text-charcoal/65 font-bold font-heading">
          <span className="flex items-center gap-1.5 text-muted-text">
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
            {project.impactMetric}
          </span>
          <Link
            href={`/our-projects/${project.slug}`}
            className="inline-flex items-center gap-1 text-forest hover:text-forest-dark transition-colors font-body"
            aria-label={`Read more about ${project.title}`}
          >
            Learn More <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
