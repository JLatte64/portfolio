import type { ComponentPropsWithoutRef } from "react";
import { portfolioData } from "../../../data/portfolioData";
import ProjectCard from "./ProjectCard";
import "./WorkSection.css";
import { LazySection } from "../LazySection";

interface WorkSectionProps extends ComponentPropsWithoutRef<"div"> {}

export default function WorkSection({ ...props }: WorkSectionProps) {
  return (
    <LazySection className="portfolio-work-grid-section" id="work" {...props}>
      <h2 className="section-label-heading">Selected Work</h2>

      <div className="work-items-masonry-wrapper">
        {portfolioData?.projects &&
          Array.from({ length: portfolioData.projects.length }).map(
            (_, index) => (
              <ProjectCard
                key={`project-node-key-${index}`}
                projectIndex={index}
              />
            ),
          )}
      </div>
    </LazySection>
  );
}
