"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { BackgroundPattern } from "@/components/ui/BackgroundPattern";
import { projectsData } from "@/constants/data";
import { PageRoutes } from "@/types";
import Link from "next/link";

export default function OurProjects(): React.ReactNode {
  return (
    <div className="relative pt-24 sm:pt-28 bg-cream min-h-screen pb-20 overflow-hidden">
      {/* Full-page colorful project grid background pattern */}
      <BackgroundPattern variant="project-grid" opacity={0.6} className="z-0" />

      <div className="relative z-10">
        {/* Header Section */}
        <section className="py-16 sm:py-20 text-center max-w-4xl mx-auto">
          <Container>
            <div className="flex flex-col items-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-charcoal font-heading leading-tight mb-4">
                Our Projects - Dua Charitable Trust
              </h1>
              <p className="text-base sm:text-lg text-charcoal/70 leading-relaxed font-body">
                Explore the various projects and community programs we&apos;ve developed to nurture joyful wisdom and empower learners across the globe. Each initiative is a step towards a brighter, more inclusive future.
              </p>
            </div>
          </Container>
        </section>

        {/* Project Grid */}
        <Container className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Container>

        {/* Support Callout Section */}
        <Container className="mt-20">
          <section
            className="relative bg-cream rounded-[32px] p-8 sm:p-12 text-center overflow-hidden shadow-xs border border-charcoal/5"
            aria-labelledby="support-title"
          >
            {/* Doodle background pattern */}
            <BackgroundPattern variant="doodle" opacity={0.12} className="text-forest" />

            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
              {/* Hand/Heart/Star custom SVG graphic at top of support box */}
              <div className="w-12 h-12 rounded-full bg-white/60 flex items-center justify-center text-forest mb-6">
                <svg
                  className="w-6 h-6 fill-none stroke-current"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>

              <h2 id="support-title" className="text-2xl sm:text-3xl font-extrabold text-charcoal font-heading mb-4">
                Want to support our initiatives?
              </h2>
              <p className="text-sm sm:text-base text-charcoal/70 leading-relaxed font-body mb-8">
                Your contribution helps us expand these projects and reach more communities. Whether through volunteering or donations, every bit helps nurture joyful wisdom.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto">
                <Link
                  href={PageRoutes.DONATE}
                  className="w-full sm:w-44 bg-charcoal text-cream hover:bg-forest hover:text-cream text-center px-6 py-3.5 rounded-full font-bold text-sm transition-all duration-300 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
                  aria-label="Donate Now to our initiatives"
                >
                  Donate Now
                </Link>
                <Link
                  href={PageRoutes.CONTACT}
                  className="w-full sm:w-44 bg-card-bg/70 border border-card-border text-charcoal hover:bg-charcoal hover:text-cream text-center px-6 py-3.5 rounded-full font-bold text-sm transition-all duration-300 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
                  aria-label="Volunteer for our initiatives"
                >
                  Volunteer
                </Link>
              </div>
            </div>
          </section>
        </Container>
      </div>
    </div>
  );
}
