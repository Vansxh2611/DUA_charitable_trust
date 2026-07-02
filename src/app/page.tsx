import React from "react";
import { Hero } from "@/components/sections/Hero";
import { Mission } from "@/components/sections/Mission";
import { ImageExpansionStory, ParallaxBanner } from "@/components/storytelling/ImageExpansionStory";
import { ImpactStats } from "@/components/sections/ImpactStats";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import {
  heroData,
  missionData,
  impactStatsData,
  projectsData,
  testimonialsData,
  FAQData,
  ctaData,
} from "@/constants/data";

export default function Home(): React.ReactNode {
  return (
    <>
      <Hero
        heading={heroData.heading}
        subheading={heroData.subheading}
        primaryCtaText={heroData.primaryCtaText}
        primaryCtaLink={heroData.primaryCtaLink}
        secondaryCtaText={heroData.secondaryCtaText}
        secondaryCtaLink={heroData.secondaryCtaLink}
      />
      <Mission
        title={missionData.title}
        description={missionData.description}
        bullets={missionData.bullets}
        image={missionData.image}
      />
      <ImageExpansionStory />

      <ImpactStats
        title={impactStatsData.title}
        subtitle={impactStatsData.subtitle}
        stats={impactStatsData.stats}
      />
      <FeaturedProjects
        title="Featured Ecosystem Restorations"
        subtitle="Explore some of our active and recently completed initiatives making a tangible ecological impact."
        projects={projectsData}
      />
      <Testimonials
        title="Loved by Communities & Volunteers"
        subtitle="Hear directly from local residents, agricultural landowners, and active hands helping us grow."
        testimonials={testimonialsData}
      />
      <ParallaxBanner
        imageSrc="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=1800&auto=format&fit=crop"
        label="Community garden and environmental stewardship"
      />
      <FAQ
        title="Frequently Asked Questions"
        subtitle="Have questions about where donations go or how you can participate? We have got you covered."
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
    </>
  );
}
