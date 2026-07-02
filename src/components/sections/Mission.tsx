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
        description: "Founded on the belief that education should not be a rigid institution but a blooming collective effort, CogniBloom started as a small community initiative. We saw a gap between traditional learning and the natural curiosity of individuals."
      },
      {
        title: "Our Vision",
        description: "A world where joyful learning is accessible to all, empowering communities to grow together."
      }
    ];

    return (
      <section className="py-20 bg-cream" aria-labelledby="story-heading">
        <Container>
          <div className="text-center mb-12">
            <h2 id="story-heading" className="text-3xl sm:text-4xl font-extrabold text-charcoal font-heading">
              Our Story
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
      bgClass: "bg-white text-charcoal border border-forest/10",
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
      bgClass: "bg-white text-charcoal border border-forest/10",
      iconBg: "bg-sage text-forest",
      linkColor: "text-[#2D5B45]",
      hasBrush: false,
      pattern: "leaf" as const
    },
    {
      title: "Holistic Well-being",
      description: "An inspiring well-being process and holistic healthcare health.",
      icon: <MeditateIcon />,
      bgClass: "bg-white text-charcoal border border-forest/10",
      iconBg: "bg-sage text-forest",
      linkColor: "text-[#2D5B45]",
      hasBrush: false,
      pattern: "wave" as const
    }
  ];

  return (
    <SectionWrapper id="our-focus" bgColor="bg-sage" glowPosition="center">
      {/* 1) Subtle Parallax Background SVGs */}
      <div className="absolute top-1/12 -right-24 w-96 h-96 pointer-events-none select-none z-0">
        <ParallaxImage speed={0.5} className="w-full h-full">
          <svg
            className="w-full h-full text-forest/10 fill-none stroke-current"
            viewBox="0 0 24 24"
            strokeWidth="0.5"
            aria-hidden="true"
          >
            <path d="M12 2C6.5 2 2 6.5 2 12c0 4.5 3 8 7 9.5V22h6v-.5c4-1.5 7-5 7-9.5 0-5.5-4.5-10-10-10z M12 22V12c0-3 3-5 6-5 M12 16c0-3-3-5-6-5" />
          </svg>
        </ParallaxImage>
      </div>

      <div className="absolute bottom-1/12 -left-24 w-96 h-96 pointer-events-none select-none z-0">
        <ParallaxImage speed={0.5} className="w-full h-full">
          <svg
            className="w-full h-full text-forest/10 fill-none stroke-current"
            viewBox="0 0 24 24"
            strokeWidth="0.5"
            aria-hidden="true"
          >
            <path d="M12 2C6.5 2 2 6.5 2 12c0 4.5 3 8 7 9.5V22h6v-.5c4-1.5 7-5 7-9.5 0-5.5-4.5-10-10-10z M12 22V12c0-3 3-5 6-5 M12 16c0-3-3-5-6-5" />
          </svg>
        </ParallaxImage>
      </div>

      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-accent text-charcoal font-heading text-xs font-bold uppercase tracking-wider mb-4">
            Our Focus
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal font-heading leading-tight mb-4">
            {title}
          </h2>
          <p className="text-base text-charcoal/75 font-body leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {focusCards.map((card, idx) => (
              <TiltCard
                key={idx}
                intensity={8}
                glare={true}
                scale={1.03}
                className="w-full h-full"
              >
                <div
                  className={cn(
                    "relative rounded-[32px] p-8 overflow-hidden flex flex-col justify-between h-full min-h-[300px] text-left cursor-default transition-all duration-300 group",
                    idx === 1
                      ? "bg-navy text-white shadow-md border border-accent/25"
                      : "bg-white/60 backdrop-blur-md text-charcoal border border-forest/10 shadow-xs hover:border-forest/20"
                  )}
                >
                  {/* Pattern overlays */}
                  {card.pattern && (
                    <BackgroundPattern
                      variant={card.pattern}
                      opacity={card.pattern === "circuit" ? 0.08 : 0.25}
                    />
                  )}

                  {/* Brush stroke overlay for Card 1 */}
                  {card.hasBrush && (
                    <svg
                      className="absolute inset-0 w-full h-full text-forest/5 pointer-events-none"
                      fill="currentColor"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path d="M10 30 Q 30 20, 50 30 T 90 20 Q 80 50, 50 60 T 10 50 Z" />
                    </svg>
                  )}

                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      {/* Floating Icon with gentle lift */}
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-xs transition-transform duration-350 group-hover:scale-110",
                        card.iconBg
                      )}>
                        {card.icon}
                      </div>

                      <h3 className="text-xl font-bold font-heading mb-3 tracking-tight">
                        {card.title}
                      </h3>

                      <p className="text-sm sm:text-base leading-relaxed font-body mb-8 opacity-80">
                        {card.description}
                      </p>
                    </div>

                    <Link
                      href={PageRoutes.OUR_PROJECTS}
                      className={cn(
                        "inline-flex items-center gap-1.5 text-sm font-bold font-heading hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-forest w-fit",
                        card.linkColor
                      )}
                    >
                      Learn more <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
      </Container>
    </SectionWrapper>
  );
};
