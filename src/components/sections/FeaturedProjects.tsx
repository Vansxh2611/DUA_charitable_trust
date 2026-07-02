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
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-12 flex flex-col items-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-charcoal font-heading leading-tight mb-4">
            {title}
          </h2>
          <p className="text-base text-charcoal/70 leading-relaxed font-body">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            label="View All Projects"
            variant="outline"
            href={PageRoutes.OUR_PROJECTS}
            icon={<ArrowRight size={16} />}
            iconPosition="right"
            className="bg-white hover:bg-forest hover:text-white rounded-lg border-[#DDD5C8] text-[#0a142f]!"
          />
        </div>
      </Container>
    </SectionWrapper>
  );
};
