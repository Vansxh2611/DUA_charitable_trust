import React from "react";
import { Hero } from "@/components/sections/Hero";
import { Mission } from "@/components/sections/Mission";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import {
  aboutHeroData,
  aboutStoryData,
  coreValuesData,
  teamMembers,
  FAQData,
  ctaData,
} from "@/constants/data";

export default function AboutUs(): React.ReactNode {
  return (
    <div className="pt-16">
      <Hero
        heading={aboutHeroData.heading}
        subheading={aboutHeroData.subheading}
        primaryCtaText=""
        primaryCtaLink=""
        secondaryCtaText=""
        secondaryCtaLink=""
      />

      <Mission
        title={aboutStoryData.title}
        description=""
        bullets={[]}
      />

      <TeamGrid
        title={coreValuesData.title}
        subtitle=""
        members={teamMembers}
      />

      <FAQ
        title="About Our Operations"
        subtitle="Learn about our legal status, funding streams, volunteer guides, and local coordination."
        faqs={FAQData}
      />

      <CTA
        title={ctaData.title}
        description={ctaData.description}
        primaryCtaText={ctaData.primaryCtaText}
        primaryCtaLink={ctaData.primaryCtaLink}
        secondaryCtaText={ctaData.secondaryCtaText}
        secondaryCtaLink={ctaData.secondaryCtaLink}
      />
    </div>
  );
}
