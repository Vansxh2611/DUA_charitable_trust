import React from "react";
import { FeaturedProjectsProps } from "@/types";
import { Container } from "../ui/Container";
import { ProjectCard } from "../ui/ProjectCard";
import { Button } from "../ui/Button";
import { ArrowRight } from "lucide-react";
import { PageRoutes } from "@/types";
import { SectionWrapper } from "../storytelling/SectionWrapper";

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({
  title,
  subtitle,
  projects,
}) => {
  const featured = projects.slice(0, 3);

  return (
    <SectionWrapper id="featured-projects" bgColor="bg-cream" glowPosition="bottom-right">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl text-left">
            <span className="inline-block px-4 py-1 rounded-full bg-accent text-charcoal-static font-heading text-xs font-bold uppercase tracking-wider mb-4">
              Our Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal font-heading leading-tight mb-4">
              {title}
            </h2>
            <p className="text-base text-charcoal/70 leading-relaxed font-body">
              {subtitle}
            </p>
          </div>

          <Button
            label="View All Projects"
            variant="outline"
            href={PageRoutes.OUR_PROJECTS}
            icon={<ArrowRight size={16} />}
            iconPosition="right"
            className="hidden md:inline-flex bg-white hover:bg-forest hover:text-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Button
            label="View All Projects"
            variant="outline"
            href={PageRoutes.OUR_PROJECTS}
            icon={<ArrowRight size={16} />}
            iconPosition="right"
            className="w-full"
          />
        </div>
      </Container>
    </SectionWrapper>
  );
};
