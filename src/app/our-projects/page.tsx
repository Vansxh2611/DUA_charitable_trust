"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { BackgroundPattern } from "@/components/ui/BackgroundPattern";
import { projectsData } from "@/constants/data";
import { PageRoutes } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { CTA } from "@/components/sections/CTA";
import { SectionDivider } from "@/components/ui/SectionDivider";

// Project Supporters Data
const supporters = [
  {
    name: "Sarah Jenkins",
    role: "Donor (STEM Hub Sponsor)",
    desc: "Sponsored 5 rural Curiosity Labs with equipment kits and learning materials.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop"
  },
  {
    name: "Aarav Sharma",
    role: "Volunteer (Ecology Lead)",
    desc: "Dedicated 150+ hours setting up Green Roots gardening programs in regional centers.",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop"
  },
  {
    name: "Chloe Dubois",
    role: "Volunteer (Arts Mentor)",
    desc: "Curated Canvas of Hope syllabus and trained 25 local school coordinators.",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop"
  }
];

const ProjectGallery = ({ onCategorySelect }: { onCategorySelect: (cat: string) => void }) => {
  const images = [
    { src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop", title: "STEM Workshop", category: "STEM & Innovation" },
    { src: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=600&auto=format&fit=crop", title: "Eco Reforestation", category: "Environment & Nature" },
    { src: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=600&auto=format&fit=crop", title: "Arts Expression", category: "Arts & Creativity" },
    { src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop", title: "Student Health Checkup", category: "Holistic Well-being" }
  ];

  const handleClick = (cat: string) => {
    onCategorySelect(cat);
    const el = document.getElementById("projects-header");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 bg-sage">
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-charcoal font-heading leading-tight mb-4">
            Community & Action Gallery
          </h2>
          <p className="text-base text-charcoal/70 font-body">
            Click on a category card below to filter our active programs by domain.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => handleClick(img.category)}
              className="relative aspect-square rounded-lg overflow-hidden border border-card-border shadow-xs group cursor-pointer"
            >
              <Image
                src={img.src}
                alt={img.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
                <span className="text-white font-heading font-bold text-sm tracking-wide">
                  {img.title} (View Projects)
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default function OurProjects(): React.ReactNode {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { label: "All Work", value: "all" },
    { label: "STEM & Innovation", value: "STEM & Innovation" },
    { label: "Environment & Nature", value: "Environment & Nature" },
    { label: "Arts & Creativity", value: "Arts & Creativity" },
    { label: "Holistic Well-being", value: "Holistic Well-being" },
    { label: "Flagship Program", value: "Flagship Program" }
  ];

  // Filtering Logic
  const filteredProjects = projectsData.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory =
      activeCategory === "all" || project.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="relative pt-24 sm:pt-28 bg-cream min-h-screen pb-20 overflow-hidden">
      {/* Full-page colorful project grid background pattern */}
      <BackgroundPattern variant="project-grid" opacity={0.6} className="z-0 dark:hidden" />

      <div className="relative z-10">
        {/* Header Section */}
        <section id="projects-header" className="py-16 sm:py-20 text-center max-w-4xl mx-auto">
          <Container>
            <div className="flex flex-col items-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-charcoal font-heading leading-tight mb-4">
                Our Projects
              </h1>
              <p className="text-base sm:text-lg text-charcoal/70 leading-relaxed font-body">
                Explore the various projects and community programs we&apos;ve developed to nurture joyful wisdom and empower learners across the globe. Each initiative is a step towards a brighter, more inclusive future.
              </p>
            </div>
          </Container>
        </section>

        {/* 1. Header (cream) -> Filter/Grid (cream) */}
        <SectionDivider variant="minimal" color="forest/10" bgColor="cream" height={50} />

        {/* Filter controls */}
        <Container className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 max-w-6xl mx-auto border-b border-card-border pb-8">
            {/* Category selection */}
            <div className="flex flex-wrap gap-2.5">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                    activeCategory === cat.value
                      ? "bg-charcoal text-cream shadow-xs"
                      : "bg-card-bg border border-card-border text-charcoal hover:bg-sage/40"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80 shrink-0">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="w-full bg-card-bg border border-card-border rounded-full py-3 pl-11 pr-5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest placeholder-charcoal/40"
              />
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40" />
            </div>
          </div>
        </Container>

        {/* Project Grid */}
        <Container className="mt-8">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-card-bg border border-card-border rounded-[32px] max-w-4xl mx-auto shadow-xs">
              <p className="text-lg text-charcoal/50 font-bold font-heading">No projects match your current filters.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="mt-4 px-6 py-2.5 bg-charcoal text-cream rounded-full font-bold text-xs hover:bg-forest transition-colors cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </Container>

        {/* 2. Project Grid (cream) -> Project Gallery (sage) */}
        <SectionDivider variant="curve" color="sage" bgColor="cream" height={90} />

        {/* Project Gallery */}
        <ProjectGallery onCategorySelect={setActiveCategory} />

        {/* 3. Project Gallery (sage) -> Key Contributors (cream) */}
        <SectionDivider variant="diagonal" color="cream" bgColor="sage" height={90} />

        {/* Project Supporters Section (Volunteers & Donors) */}
        <section className="py-20 bg-cream">
          <Container size="xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-charcoal font-heading leading-tight mb-4">
                Key Contributors & Supporters
              </h2>
              <p className="text-base text-charcoal/70 font-body">
                Meet the active donors, domain experts, and volunteers making these project networks possible.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {supporters.map((sup, idx) => (
                <div key={idx} className="flex flex-col items-center text-center group">
                  <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-card-border mb-6 shadow-xs bg-sage">
                    <Image
                      src={sup.img}
                      alt={sup.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-103"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <h4 className="text-xl font-bold text-charcoal font-heading">{sup.name}</h4>
                  <span className="text-xs text-accent font-extrabold uppercase tracking-wider mt-1 font-body">{sup.role}</span>
                  <p className="text-xs text-charcoal/60 mt-3 font-body max-w-xs">{sup.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* 4. Key Contributors (cream) -> CTA (cream) */}
        <SectionDivider variant="minimal" color="forest/10" bgColor="cream" height={50} />

        {/* Support Callout Section */}
        <CTA
          title="Want to support our initiatives?"
          description="Your contribution helps us expand these projects and reach more communities. Whether through volunteering or donations, every bit helps nurture joyful wisdom."
          primaryCtaText="Donate Now"
          primaryCtaLink={PageRoutes.DONATE}
          secondaryCtaText="Volunteer"
          secondaryCtaLink={PageRoutes.CONTACT}
        />

        {/* 5. CTA (cream) -> Footer (footer-bg) */}
        <SectionDivider variant="layered" color="footer-bg" bgColor="cream" height={110} />
      </div>
    </div>
  );
}
