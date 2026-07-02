"use client";

import React from "react";
import { TeamGridProps } from "@/types";
import { Container } from "../ui/Container";
import { BackgroundPattern } from "../ui/BackgroundPattern";
import { Smile, Users, BrainCircuit, Globe } from "lucide-react";
import Image from "next/image";

export const TeamGrid: React.FC<TeamGridProps> = ({
  title,
  subtitle,
  members,
}) => {
  // Determine layout variant deterministically from props rather than pathname to prevent hydration mismatch
  const isAboutPage = title === "Core Values" || !members || members.length === 0;

  if (isAboutPage) {
    // About Page "Core Values" Layout
    const coreValues = [
      {
        title: "Joyful Learning",
        description: "Education should be a delightful journey, not a chore.",
        icon: <Smile className="w-5 h-5" />,
      },
      {
        title: "Community First",
        description: "Empowering local voices and collective growth.",
        icon: <Users className="w-5 h-5" />,
      },
      {
        title: "Inquisitive Minds",
        description: "Fostering curiosity and critical thinking in every environment.",
        icon: <BrainCircuit className="w-5 h-5" />,
      },
      {
        title: "Inclusive Access",
        description: "Breaking down barriers to ensure education is for everyone.",
        icon: <Globe className="w-5 h-5" />,
      },
    ];

    return (
      <section className="relative py-20 bg-mint overflow-hidden" aria-labelledby="values-heading">
        {/* Leaf Background Pattern */}
        <BackgroundPattern variant="leaf" opacity={0.4} className="text-forest/15" />

        <Container className="relative z-10">
          <div className="text-center mb-16">
            <h2 id="values-heading" className="text-3xl sm:text-4xl font-extrabold text-charcoal font-heading">
              {title || "Core Values"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {coreValues.map((value, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 flex flex-col items-center text-center shadow-xs card-interactive"
              >
                {/* Rounded Icon Wrapper */}
                <div className="w-12 h-12 rounded-full bg-forest/5 flex items-center justify-center text-forest mb-6">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold font-heading text-charcoal mb-2">
                  {value.title}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed font-body">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  // Fallback / Original Team Grid Layout (used elsewhere if any)
  return (
    <section className="py-20 bg-cream" aria-labelledby="team-heading">
      <Container>
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 id="team-heading" className="text-3xl sm:text-4xl font-extrabold text-charcoal font-heading">
            {title}
          </h2>
          {subtitle && (
            <p className="text-base text-charcoal/70 font-body leading-relaxed mt-4">
              {subtitle}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, index) => (
            <div
              key={index}
              className="flex flex-col bg-cream border border-forest/15 rounded-3xl p-6 shadow-sm group hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative h-44 w-44 mx-auto rounded-full overflow-hidden border border-forest/10 mb-6 shrink-0">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="176px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="text-center flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-charcoal font-heading mb-1">
                  {member.name}
                </h3>
                <span className="text-xs font-bold text-forest font-heading tracking-wider uppercase mb-4">
                  {member.role}
                </span>
                <p className="text-xs sm:text-sm text-charcoal/65 leading-relaxed font-body mb-6 flex-grow">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
