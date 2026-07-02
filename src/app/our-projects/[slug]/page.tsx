import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectsData } from "@/constants/data";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { CTA } from "@/components/sections/CTA";
import { ArrowLeft, Calendar, CheckSquare, BarChart } from "lucide-react";
import { ctaData } from "@/constants/data";

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

export default function ProjectDetail({ params }: ProjectDetailProps): React.ReactNode {
  const project = projectsData.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

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
          <div className="relative h-[300px] sm:h-[450px] w-full rounded-3xl overflow-hidden shadow-xs border border-forest/10">
            <Image src={project.image} alt={project.title} fill className="object-cover" sizes="100vw" priority />
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
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
                <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-mint/20 border border-forest/15">
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

            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-cream border border-forest/15 rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-xs">
                <h3 className="text-lg font-bold font-heading text-charcoal border-b border-forest/10 pb-4">
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
