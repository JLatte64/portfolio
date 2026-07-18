import type { ComponentPropsWithoutRef } from "react";
import {
  portfolioData,
  projectIndexToSlugLUT,
} from "../../../data/portfolioData";
import ProjectCard from "./ProjectCard";
import "./WorkSection.css";
import { LazySection } from "../LazySection";
import type { ProjectData } from "../../../types/portfolioTypes";

interface WorkSectionProps extends ComponentPropsWithoutRef<"section"> {}

export default function WorkSection({ ...props }: WorkSectionProps) {
  const hasProjects =
    portfolioData?.projects && portfolioData.projects.length > 0;

  return (
    <LazySection
      className="portfolio-work-grid-section"
      id="work"
      aria-labelledby="work-section-heading"
      {...props}
    >
      <h2 id="work-section-heading" className="section-label-heading">
        Selected Work
      </h2>

      {hasProjects ? (
        <ul className="work-items-masonry-wrapper" role="list">
          {portfolioData.projects.map((_: ProjectData, index: number) => {
            const projectSlug =
              projectIndexToSlugLUT[index] || `project-${index}`;

            return (
              <li key={projectSlug}>
                <ProjectCard projectIndex={index} />
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="no-projects-fallback">
          No projects available at this time.
        </p>
      )}
    </LazySection>
  );
}
