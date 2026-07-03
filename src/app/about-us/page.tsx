"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { BackgroundPattern } from "@/components/ui/BackgroundPattern";
import { FileText, Download, CheckCircle2, Play } from "lucide-react";
import { cn } from "@/utils/cn";
import { PageRoutes } from "@/types";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { FAQData, ctaData } from "@/constants/data";

const AboutHero = () => {
  return (
    <section className="relative bg-cream animate-fade-in" style={{ paddingTop: "100px", paddingLeft: "20px", paddingRight: "20px", paddingBottom: "20px" }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
        {/* Left Content Card — 50% */}
        <div
          className="relative bg-sage border border-card-border rounded-lg overflow-hidden shadow-xs"
          style={{ height: "calc(100vh - 120px)", minHeight: "650px" }}
        >
          <BackgroundPattern variant="leaf" opacity={0.3} className="text-forest/10 animate-pulse" />
          {/* Inner overlay card — centered */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[72%] h-[84%] bg-white border border-[#DDD5C8] rounded-lg z-10 flex flex-col justify-center items-center text-center p-8 lg:p-12 shadow-md overflow-hidden">
            <span className="text-xs font-mono text-accent font-extrabold uppercase tracking-widest block mb-3">
              Who We Are
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0a142f]! font-heading leading-tight mb-4">
              Together We Can Make a Difference
            </h1>
            <p className="text-sm sm:text-base text-[#0a142f]/70! leading-relaxed font-body mb-8 max-w-md mx-auto">
              Join us in bringing hope, structured science labs, creative art workshops, and well-being programs to local student cohorts. Every voice and hand helps make a lasting impact.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
              <Link
                href={PageRoutes.DONATE}
                className="w-full sm:w-40 bg-[#0a142f] text-[#FAF8F3] hover:bg-[#566246] hover:text-[#FAF8F3] text-center px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-forest cursor-pointer"
              >
                Donate Now
              </Link>
              <Link
                href={PageRoutes.OUR_PROJECTS}
                className="w-full sm:w-40 bg-transparent border border-[#0a142f]/20 text-[#0a142f]! hover:bg-[#0a142f] hover:text-[#FAF8F3]! text-center px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest cursor-pointer"
              >
                Explore Causes
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Image (Smiling children) */}
        <div
          className="relative w-full rounded-lg overflow-hidden border border-card-border shadow-sm bg-sage"
          style={{ height: "calc(100vh - 120px)", minHeight: "650px" }}
        >
          <Image
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop"
            alt="Together making a difference"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
};

const EmpoweringSection = () => {
  return (
    <section className="py-16 bg-cream">
      <Container size="xl">
        {/* Heading at the top */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-charcoal font-heading leading-tight mb-4">
            Empowering Change Guided by Heart
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: 3-Image Collage Mosaic */}
          <div className="flex gap-4 w-full max-w-lg mx-auto">
            <div className="relative w-1/2 aspect-[3/4] rounded-2xl overflow-hidden border border-card-border shadow-xs">
              <Image
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=400&auto=format&fit=crop"
                alt="Volunteering and teaching"
                fill
                className="object-cover"
              />
            </div>
            <div className="w-1/2 flex flex-col gap-4">
              <div className="relative h-[calc(50%-8px)] rounded-2xl overflow-hidden border border-card-border shadow-xs aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=400&auto=format&fit=crop"
                  alt="Distributing materials"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-[calc(50%-8px)] rounded-2xl overflow-hidden border border-card-border shadow-xs aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=400&auto=format&fit=crop"
                  alt="Student support"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Text content block */}
          <div className="text-left flex flex-col items-start">
            <p className="text-base text-charcoal/70 leading-relaxed font-body mb-6 max-w-xl">
              We work closely with local volunteers, school systems, and environmentalists to deliver engaging projects. By bringing tools directly to local neighborhoods, we ensure sustainable, multi-domain community development.
            </p>

            {/* Checkmark list */}
            <div className="flex flex-col gap-3 mb-8 text-sm font-semibold font-body text-charcoal">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-forest" />
                <span>Multi-Domain Community Programs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-forest" />
                <span>Sustainable Local Hub Development</span>
              </div>
            </div>

            <Link
              href={PageRoutes.OUR_PROJECTS}
              className="bg-charcoal text-cream hover:bg-forest hover:text-cream px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest cursor-pointer"
            >
              More About Us
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

const FoundersMessage = () => (
  <section className="py-16 bg-cream">
    <Container size="xl">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center text-left">
        <div className="relative shrink-0 w-40 h-40 rounded-full bg-sage overflow-hidden border-2 border-forest shadow-xs">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=250&auto=format&fit=crop"
            alt="Dr. Alisha Dua"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-grow">
          <span className="text-xs font-mono text-accent font-extrabold uppercase tracking-widest block mb-2">Founder's Vision</span>
          <h3 className="text-2xl sm:text-3xl font-black text-charcoal font-heading leading-tight mb-4">
            "True development is holistic; it unites learning, art, ecology, and health to empower the whole community."
          </h3>
          <p className="text-sm sm:text-base text-charcoal/70 leading-relaxed font-body mb-5">
            Dua was founded to provide holistic, multi-domain support. We believe that curiosity, sustainable ecosystems, creative expression, and physical well-being are key pillars in unlocking a community's true potential.
          </p>
          <div>
            <span className="block text-sm font-bold text-charcoal font-heading">Dr. Alisha Dua</span>
            <span className="block text-xs text-muted-text font-semibold font-body">Founder & Trustee, Dua Charitable Trust</span>
          </div>
        </div>
      </div>
    </Container>
  </section>
);

const Timeline = () => {
  const milestones = [
    { year: "2021", title: "The Seed is Planted", desc: "Founded with a single rural reading center, helping 150 children access elementary reading guidelines." },
    { year: "2022", title: "STEM & Arts Expansion", desc: "Launched Curiosity Labs and Canvas of Hope. Expanded to 10 community centers." },
    { year: "2023", title: "Ecology & Wellness", desc: "Integrated Green Roots and Wellness Circles, addressing student health checkups and garden projects." },
    { year: "2024", title: "50 Active Hubs", desc: "Achieved our milestone of 50 active regional hubs connecting senior educators with youth." },
    { year: "2026", title: "Widespread Impact", desc: "Targeting 80 community hubs and digital literacy mentorship frameworks globally." }
  ];

  return (
    <section className="py-16 bg-cream overflow-hidden">
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-charcoal font-heading leading-tight mb-4">
            Our Journey
          </h2>
          <p className="text-base text-charcoal/70 font-body">
            A chronological timeline of how our educational, art, ecological, and wellness domains evolved over the years.
          </p>
        </div>

        {/* Center Timeline line with viewport scroll animation nodes */}
        <div className="relative max-w-4xl mx-auto pl-8 md:pl-0">
          {/* Vertical Center Line */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-card-border md:left-1/2 md:-translate-x-1/2" />

          <div className="flex flex-col gap-16">
            {milestones.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={cn(
                    "relative flex flex-col md:w-1/2",
                    isEven ? "md:pr-12 md:text-right md:self-start" : "md:pl-12 md:text-left md:self-end"
                  )}
                >
                  {/* Outer pulsating dot */}
                  <div className={cn(
                    "absolute top-1.5 w-5 h-5 rounded-full bg-accent border-4 border-cream shadow-xs z-10",
                    isEven
                      ? "left-0 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-1/2"
                      : "left-0 -translate-x-1/2 md:left-0 md:-translate-x-1/2"
                  )} />

                  {/* Text Container */}
                  <div className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-xs hover:border-[#C89B52] transition-colors">
                    <span className="inline-block px-3 py-1 rounded-full bg-forest/10 text-forest text-xs font-bold font-mono mb-2">
                      {item.year}
                    </span>
                    <h3 className="text-lg font-black text-charcoal font-heading mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-charcoal/70 leading-relaxed font-body">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

const VolunteersSection = () => {
  const volunteers = [
    { name: "James Smith", role: "Brand Manager", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop" },
    { name: "Sara Jahan", role: "Founder & CEO", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop" },
    { name: "Jisan Ali", role: "Programs Lead", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop" }
  ];

  return (
    <section className="py-20 bg-cream">
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-charcoal font-heading leading-tight mb-4">
            Our Volunteers
          </h2>
          <p className="text-base text-charcoal/70 font-body">
            Your time and effort can bring hope to those who need it most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto mb-12">
          {volunteers.map((vol, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-card-border mb-6 shadow-xs bg-sage">
                <Image
                  src={vol.img}
                  alt={vol.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-103"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h4 className="text-xl font-bold text-charcoal font-heading">{vol.name}</h4>
              <span className="text-sm text-muted-text font-bold uppercase tracking-wider mt-1 block font-body">{vol.role}</span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={PageRoutes.CONTACT}
            className="inline-flex items-center justify-center px-8 py-3.5 bg-charcoal text-cream hover:bg-forest hover:text-cream rounded-full font-bold text-sm transition-all duration-300 shadow-sm focus:outline-none cursor-pointer"
          >
            View All Volunteers
          </Link>
        </div>
      </Container>
    </section>
  );
};

const TransparencySection = () => {
  const documents = [
    { title: "Annual Audit Report (FY 2024-25)", size: "2.4 MB" },
    { title: "Trust Deed Registration", size: "1.8 MB" },
    { title: "80G Tax Exemption Certificate", size: "950 KB" },
    { title: "Governance & Ethics Policy", size: "1.1 MB" }
  ];

  return (
    <section className="py-12 bg-cream">
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-charcoal font-heading leading-tight mb-4">
            Transparency & Governance
          </h2>
          <p className="text-base text-charcoal/70 font-body">
            We believe in complete transparency. Access our compliance certificates, legal documentation, and annual reports below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {documents.map((doc, idx) => (
            <div key={idx} className="bg-card-bg border border-card-border rounded-lg p-6 flex items-center justify-between shadow-xs card-interactive">
              <div className="flex items-center gap-4 text-left">
                <div className="p-3 rounded-md bg-forest/5 text-forest shrink-0">
                  <FileText size={22} />
                </div>
                <div>
                  <span className="block text-sm sm:text-base font-bold text-charcoal font-heading">{doc.title}</span>
                  <span className="block text-xs text-charcoal/50 font-body mt-0.5 font-semibold">PDF • {doc.size}</span>
                </div>
              </div>
              <button className="p-2 text-forest hover:text-forest-dark hover:scale-105 transition-all focus:outline-none cursor-pointer" aria-label={`Download ${doc.title}`}>
                <Download size={20} />
              </button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default function AboutUs(): React.ReactNode {
  return (
    <div className="bg-cream">
      <AboutHero />

      <div className="border-t border-card-border/50 mx-5" />

      <EmpoweringSection />

      <div className="border-t border-card-border/50 mx-5" />

      <FoundersMessage />

      <div className="border-t border-card-border/50 mx-5" />

      <Timeline />

      <div className="border-t border-card-border/50 mx-5" />

      <VolunteersSection />

      <div className="border-t border-card-border/50 mx-5" />

      <TransparencySection />

      <div className="border-t border-card-border/50 mx-5" />

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
