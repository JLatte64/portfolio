import { portfolioData } from "../data/portfolioData";
import ProjectCard from "./ProjectCard";
import "./WorkSection.css";

export default function WorkSection() {
  return (
    <section className="portfolio-work-grid-section" id="work">
      <h2 className="section-label-heading">Selected Work</h2>

      <div className="work-items-masonry-wrapper">
        {Array.from({ length: portfolioData.projects.length }).map(
          (_, index) => (
            <ProjectCard
              key={`project-node-key-${index}`}
              projectIndex={index}
            />
          ),
        )}
      </div>
    </section>
  );
}
