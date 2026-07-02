"use client";

import React from "react";
import { MissionProps, PageRoutes } from "@/types";
import { Container, BackgroundPattern, TiltCard } from "../ui";
import { Palette, Settings, Leaf, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { SectionWrapper } from "../storytelling/SectionWrapper";
import { ParallaxImage } from "../storytelling/ParallaxImage";

const MeditateIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v8M5 10c2-1 4-1 7 0s5 1 7 0 M7 18c2 1 4 1 5 0s3-1 5 0" />
  </svg>
);

export const Mission: React.FC<MissionProps> = ({
  title,
  description,
  bullets,
}) => {
  // Determine layout variant deterministically from props rather than pathname to prevent hydration mismatch
  const isAboutPage = !bullets || bullets.length === 0;

  if (isAboutPage) {
    // About Us Page "Our Story" Layout
    const storyCards = [
      {
        title: "The Beginning",
        description: "Founded on the belief that education should not be a rigid institution but a blooming collective effort, Dua started as a small community initiative. We saw a gap between traditional learning and the natural curiosity of individuals."
      },
      {
        title: "Our Vision",
        description: "A world where joyful learning is accessible to all, empowering communities to grow together."
      }
    ];

    return (
      <section className="py-5 bg-cream" aria-labelledby="story-heading">
        <Container size="xl">
          <div className="text-center mb-12">
            <h2 id="story-heading" className="text-4xl sm:text-5xl md:text-6xl font-black text-charcoal font-heading leading-tight">
              Our Story
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {storyCards.map((card, idx) => (
              <div
                key={idx}
                className="relative bg-beige border border-charcoal/5 rounded-3xl p-8 overflow-hidden shadow-xs card-interactive flex flex-col justify-between"
              >
                <BackgroundPattern variant="leaf" opacity={0.35} className="text-forest/10" />
                <div className="relative z-10">
                  {/* Decorative Icon */}
                  <div className="w-10 h-10 rounded-full bg-cream/70 flex items-center justify-center text-forest mb-6">
                    {idx === 0 ? <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" /></svg> : <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" /></svg>}
                  </div>
                  <h3 className="text-xl font-bold font-heading text-charcoal mb-4">
                    {card.title}
                  </h3>
                  <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed font-body">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  // Home Page "Our Focus" Layout
  const focusCards = [
    {
      title: "Mentorship & Guidance",
      description: "Interactive science kit curation, mobile science labs, and community workspace labs.",
      icon: <Settings size={20} />,
      bgClass: "bg-card-bg text-charcoal border border-card-border",
      iconBg: "bg-sage text-forest",
      linkColor: "text-[#2D5B45]",
      hasBrush: true,
      pattern: undefined
    },
    {
      title: "Child Support Services",
      description: "Providing resources, secure environments, and learning materials to children in transition.",
      icon: <Palette size={20} />,
      bgClass: "bg-navy text-white border border-accent/10 shadow-md",
      iconBg: "bg-gold text-charcoal",
      linkColor: "text-accent",
      hasBrush: false,
      pattern: "circuit" as const
    },
    {
      title: "Environment & Nature",
      description: "Collaborating with like-minded organizations to amplify our impact and reach.",
      icon: <Leaf size={20} />,
      bgClass: "bg-card-bg text-charcoal border border-card-border",
      iconBg: "bg-sage text-forest",
      linkColor: "text-[#2D5B45]",
      hasBrush: false,
      pattern: "leaf" as const
    },
    {
      title: "Holistic Well-being",
      description: "An inspiring well-being process and holistic healthcare health.",
      icon: <MeditateIcon />,
      bgClass: "bg-card-bg text-charcoal border border-card-border",
      iconBg: "bg-sage text-forest",
      linkColor: "text-[#2D5B45]",
      hasBrush: false,
      pattern: "wave" as const
    }
  ];

  return (
    <SectionWrapper id="our-focus" bgColor="bg-sage" glowPosition="center">
      <Container size="xl" className="relative z-10">
        <div className="text-center max-w-4xl mx-auto py-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-charcoal font-heading leading-tight mb-6">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-charcoal/70 leading-relaxed font-body max-w-2xl mx-auto mb-16">
            {description}
          </p>

          {bullets && bullets.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 text-left max-w-4xl mx-auto border-t border-card-border/60 pt-12">
              {bullets.map((bullet, idx) => {
                const [domainTitle, domainDesc] = bullet.split(": ");
                return (
                  <div key={idx} className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold font-heading text-charcoal flex items-center gap-3">
                      <span className="text-sm font-mono text-accent font-extrabold">0{idx + 1}.</span>
                      {domainTitle}
                    </h3>
                    <p className="text-sm sm:text-base text-charcoal/70 leading-relaxed font-body pl-7">
                      {domainDesc}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Container>
    </SectionWrapper>
  );
};
