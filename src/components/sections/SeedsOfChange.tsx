"use client";

import React from "react";
import Link from "next/link";
import { Container } from "../ui/Container";
import { cn } from "@/utils/cn";
import { SEED_PROJECTS } from "@/constants/seedsOfChange";
import { SectionWrapper } from "../storytelling/SectionWrapper";
import { AnimatedHeading } from "../storytelling/AnimatedHeading";
import { RevealText } from "../storytelling/RevealText";
import { RevealImage } from "../storytelling/RevealImage";

export const SeedsOfChange: React.FC = () => {
  return (
    <SectionWrapper id="seeds-of-change" bgColor="bg-[#FAF9F5]" glowPosition="top-left">
      <Container className="relative z-10 max-w-[1200px] mx-auto flex flex-col gap-6">
        
        {/* 1) Top Intro Card */}
        <div className="w-full bg-[#EAEEDB] border border-[#111827]/5 rounded-[32px] p-8 sm:p-10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
          {/* Soft Watercolor Wash Overlay for header */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(168,198,162,0.25),transparent_60%)] pointer-events-none" />
          
          <RevealText className="max-w-2xl text-left relative z-10">
            <AnimatedHeading text="Seeds of Change in Action" className="text-3xl sm:text-4xl font-extrabold text-[#111827] font-heading tracking-tight mb-3" />
            <p className="text-sm sm:text-base text-charcoal/70 leading-relaxed font-body">
              From mobile libraries to pop-up science fairs, our projects are designed to meet communities where they are, sparking a lifelong love for discovery.
            </p>
          </RevealText>
          
          <Link
            href="/our-projects"
            className="shrink-0 inline-flex items-center justify-center px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-[#111827] bg-[#FDF6B7] hover:bg-[#FCEEA7] border border-[#111827]/10 shadow-xs transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest cursor-pointer relative z-10"
          >
            Explore All Projects
          </Link>
        </div>

        {/* 2) Alternating Project Tiles Grid */}
        <div className="flex flex-col gap-6">
          {SEED_PROJECTS.map((project, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div 
                key={project.id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch w-full"
              >
                {/* Image Tile */}
                <div 
                  className={cn(
                    "relative w-full rounded-[32px] overflow-hidden border border-[#111827]/5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)]",
                    isEven ? "lg:order-first" : "lg:order-last"
                  )}
                >
                  <RevealImage
                    src={project.imageSrc}
                    alt={project.imageAlt}
                    aspectRatio="aspect-video lg:aspect-auto lg:h-full"
                    priority={idx === 0}
                  />
                </div>

                {/* Text Tile with custom Watercolor gradients */}
                <div 
                  className={cn(
                    "p-8 sm:p-12 md:p-16 flex flex-col justify-center text-left rounded-[32px] border border-[#111827]/5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] transition-all duration-300 relative overflow-hidden",
                    isEven 
                      ? "bg-gradient-to-br from-[#F4F7F0] via-[#EAEEDB] to-[#DEE6D5] lg:order-last" 
                      : "bg-gradient-to-br from-[#EAF2F4] via-[#DBE6E8] to-[#CDDFE2] lg:order-first"
                  )}
                >
                  {/* Absolute Watercolor washes matching screenshots */}
                  {isEven ? (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(163,192,160,0.35),transparent_60%)] pointer-events-none" />
                  ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(144,180,191,0.4),transparent_60%)] pointer-events-none" />
                  )}

                  {/* Noise Texture layer for paper feel */}
                  <div 
                    className="absolute inset-0 opacity-[0.015] pointer-events-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
                    }}
                  />

                  <RevealText className="relative z-10">
                    <AnimatedHeading text={project.title} className="text-[32px] sm:text-[36px] font-extrabold text-[#111827] font-heading leading-[1.1] mb-5 tracking-tight max-w-[340px]" />
                    
                    <p className="text-sm sm:text-[15px] text-charcoal/80 leading-relaxed font-body mb-8 max-w-[360px]">
                      {project.description}
                    </p>

                    <Link
                      href={project.link}
                      className="inline-flex items-center text-sm font-semibold text-[#111827] underline decoration-[#111827] underline-offset-4 hover:opacity-85 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded-sm w-fit"
                    >
                      Learn More
                    </Link>
                  </RevealText>
                </div>
              </div>
            );
          })}
        </div>

      </Container>
    </SectionWrapper>
  );
};
export default SeedsOfChange;
