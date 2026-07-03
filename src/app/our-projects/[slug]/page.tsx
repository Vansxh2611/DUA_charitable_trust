import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectsData } from "@/constants/data";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { CTA } from "@/components/sections/CTA";
import { ArrowLeft, Calendar, CheckSquare, BarChart, Heart } from "lucide-react";
import { ctaData } from "@/constants/data";
import { PageRoutes } from "@/types";

interface ProjectDetailProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams(): { slug: string }[] {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

// Helper function to get donation progress parameters
const getDonationProgress = (slug: string) => {
  switch (slug) {
    case "the-wisdom-collective":
      return { goal: "$50,000", raised: "$38,500", pct: 77 };
    case "curiosity-labs":
      return { goal: "$30,000", raised: "$21,000", pct: 70 };
    case "green-roots":
      return { goal: "$20,000", raised: "$14,000", pct: 70 };
    case "code-bloom":
      return { goal: "$25,000", raised: "$15,000", pct: 60 };
    case "canvas-of-hope":
      return { goal: "$15,000", raised: "$12,000", pct: 80 };
    case "wellness-circle":
      return { goal: "$18,000", raised: "$10,800", pct: 60 };
    default:
      return { goal: "$20,000", raised: "$12,000", pct: 60 };
  }
};

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }): Promise<React.ReactNode> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const progress = getDonationProgress(slug);

  const badgeVariants = {
    active: "success" as const,
    completed: "info" as const,
    planned: "orange" as const,
  };

  return (
    <div className="pt-24 sm:pt-28 bg-cream min-h-screen">
      <Container className="py-6">
        <Link
          href="/our-projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-forest/85 transition-colors focus:outline-none"
        >
          <ArrowLeft size={16} />
          Back to All Projects
        </Link>
      </Container>

      <section className="pb-12">
        <Container>
          <div className="relative h-[300px] sm:h-[450px] w-full rounded-3xl overflow-hidden shadow-xs border border-card-border bg-sage">
            <Image src={project.image} alt={project.title} fill className="object-cover" sizes="100vw" priority />
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 text-left">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge label={project.badge} variant={badgeVariants[project.status]} />
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-charcoal font-heading leading-tight mb-6">
                {project.title}
              </h1>
              <div className="prose max-w-none text-charcoal/80 font-body leading-relaxed text-base sm:text-lg mb-8">
                <p className="whitespace-pre-line">{project.longDescription || project.description}</p>
              </div>

              {project.goals && project.goals.length > 0 && (
                <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-card-bg border border-card-border shadow-xs">
                  <h3 className="text-xl font-bold font-heading text-charcoal mb-5 flex items-center gap-2">
                    <CheckSquare size={20} className="text-forest" />
                    Key Goals & Milestones
                  </h3>
                  <ul className="flex flex-col gap-4">
                    {project.goals.map((goal, idx) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <span className="h-2 w-2 rounded-full bg-forest mt-2 shrink-0" />
                        <span className="text-sm sm:text-base text-charcoal/80 font-body leading-relaxed">
                          {goal}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="lg:col-span-4 flex flex-col gap-6 text-left">
              <div className="bg-card-bg border border-card-border rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-xs">
                <h3 className="text-lg font-bold font-heading text-charcoal border-b border-card-border pb-4">
                  Project Details
                </h3>

                {project.timeline && (
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-forest/10 text-forest shrink-0 mt-0.5">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-charcoal/50 uppercase tracking-wider block font-heading mb-0.5">
                        Timeline
                      </span>
                      <span className="text-sm font-semibold text-charcoal font-body">{project.timeline}</span>
                    </div>
                  </div>
                )}

                {project.impactMetric && (
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-forest/10 text-forest shrink-0 mt-0.5">
                      <BarChart size={18} />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-charcoal/50 uppercase tracking-wider block font-heading mb-0.5">
                        Recorded Impact
                      </span>
                      <span className="text-sm font-semibold text-forest font-body">{project.impactMetric}</span>
                    </div>
                  </div>
                )}

                {/* Donation progress bar */}
                <div className="border-t border-card-border pt-6 flex flex-col gap-2">
                  <span className="text-xs font-semibold text-charcoal/50 uppercase tracking-wider block font-heading mb-2">
                    Campaign Fundraising
                  </span>
                  <div className="flex justify-between items-center text-xs font-semibold mb-1 text-charcoal/80">
                    <span>Raised: <strong className="text-forest">{progress.raised}</strong></span>
                    <span>Goal: {progress.goal}</span>
                  </div>
                  <div className="w-full h-2 bg-charcoal/10 rounded-full overflow-hidden">
                    <div className="h-full bg-forest rounded-full" style={{ width: `${progress.pct}%` }} />
                  </div>
                  <span className="block text-right text-[10px] text-muted-text mt-1 font-bold">{progress.pct}% Fund Raised</span>
                </div>

                <div className="border-t border-card-border pt-6">
                  <Link
                    href={PageRoutes.DONATE}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-charcoal text-cream hover:bg-forest hover:text-cream text-center rounded-full font-bold text-sm transition-all duration-300 shadow-sm focus:outline-none cursor-pointer"
                  >
                    <Heart size={16} fill="currentColor" />
                    Support This Project
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

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
