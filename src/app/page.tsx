import React from "react";
import { Hero } from "@/components/sections/Hero";
import { Mission } from "@/components/sections/Mission";
import { ImageExpansionStory, ParallaxBanner } from "@/components/storytelling/ImageExpansionStory";
import { ImpactStats } from "@/components/sections/ImpactStats";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { SeedsOfChange } from "@/components/sections/SeedsOfChange";
import { SectionDivider } from "@/components/ui/SectionDivider";
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
    <div className="w-full bg-cream">
      <Hero
        heading={heroData.heading}
        subheading={heroData.subheading}
        primaryCtaText={heroData.primaryCtaText}
        primaryCtaLink={heroData.primaryCtaLink}
        secondaryCtaText={heroData.secondaryCtaText}
        secondaryCtaLink={heroData.secondaryCtaLink}
      />
      
      {/* 1. Hero (cream) -> Mission (sage) */}
      <SectionDivider variant="curve" color="sage" bgColor="cream" height={100} />
      
      <Mission
        title={missionData.title}
        description={missionData.description}
        bullets={missionData.bullets}
        image={missionData.image}
      />
      
      <ImageExpansionStory />

      <SeedsOfChange />

      {/* 4. SeedsOfChange (cream) -> ImpactStats (mint/30) */}
      <SectionDivider variant="wave" color="mint/30" bgColor="cream" height={100} />

      <ImpactStats
        title={impactStatsData.title}
        subtitle={impactStatsData.subtitle}
        stats={impactStatsData.stats}
      />
      
      {/* 5. ImpactStats (mint/30) -> FeaturedProjects (cream) */}
      <SectionDivider variant="liquid" color="cream" bgColor="mint/30" height={100} />
      
      <FeaturedProjects
        title="Featured Learning Projects"
        subtitle="Explore some of our active community initiatives and programs designed to inspire joyful wisdom."
        projects={projectsData}
      />
      
      {/* 6. FeaturedProjects (cream) -> Testimonials (cream) */}
      <SectionDivider variant="minimal" color="forest/10" bgColor="cream" height={50} />
      
      <Testimonials
        title="Loved by Communities & Volunteers"
        subtitle="Hear directly from local children, community members, and volunteers helping us grow."
        testimonials={testimonialsData}
      />
      <ParallaxBanner
        imageSrc="/children-gardening.jpg"
        label="Children planting sprouts in a community garden"
      />
      
      <FAQ
        title="Frequently Asked Questions"
        subtitle="Have questions about where donations go or how you can participate? We have got you covered."
        faqs={FAQData}
      />
      
      {/* 9. FAQ (cream) -> CTA (cream) */}
      <SectionDivider variant="minimal" color="forest/10" bgColor="cream" height={50} />
      
      <CTA
        title={ctaData.title}
        description={ctaData.description}
        primaryCtaText={ctaData.primaryCtaText}
        primaryCtaLink={ctaData.primaryCtaLink}
        secondaryCtaText={ctaData.secondaryCtaText}
        secondaryCtaLink={ctaData.secondaryCtaLink}
      />
      
      {/* 10. CTA (cream) -> Footer (footer-bg) */}
      <SectionDivider variant="layered" color="footer-bg" bgColor="cream" height={110} />
    </div>
  );
}
