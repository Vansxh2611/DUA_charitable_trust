import React from "react";
import { ImpactStatsProps } from "@/types";
import { Container } from "../ui/Container";
import { StatItem } from "../ui/StatItem";
import { GraduationCap, Home, Laptop, Heart } from "lucide-react";
import { SectionWrapper } from "../storytelling/SectionWrapper";

// Store component references, not pre-built JSX elements.
// Pre-built JSX arrays (const icons = [<Icon key="x" />]) make React treat
// them as a managed list, propagating a key warning up through Context Providers.
const ICON_COMPONENTS = [GraduationCap, Home, Laptop, Heart];

export const ImpactStats: React.FC<ImpactStatsProps> = ({
  title,
  subtitle,
  stats,
}) => {
  return (
    <SectionWrapper id="our-impact" bgColor="bg-mint/30" glowPosition="center">
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-charcoal font-heading leading-tight mb-4">
            {title}
          </h2>
          <p className="text-base text-charcoal/70 leading-relaxed font-body max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-card-border border-y border-card-border py-8">
          {stats.map((stat, index) => {
            const IconComponent = ICON_COMPONENTS[index % ICON_COMPONENTS.length];
            return (
              <StatItem
                key={index}
                value={stat.value}
                label={stat.label}
                description={stat.description}
                icon={<IconComponent size={24} />}
              />
            );
          })}
        </div>
      </Container>
    </SectionWrapper>
  );
};
