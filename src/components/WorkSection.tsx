import { portfolioData } from "../data/portfolioData";
import ProjectCard from "./ProjectCard";
import "./WorkSection.css";

export default function WorkSection() {
  return (
    <section id="portfolio" className="portfolio-section">
      <h2>This is the Work Section.</h2>

      <div className="portfolio-grid">
        {Array.from({ length: portfolioData.projects.length }, (_, index) => (
          <ProjectCard projectIndex={index} key={`project-card-${index}`} />
        ))}
      </div>
    </section>
  );
}
