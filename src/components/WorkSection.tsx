import { portfolioData } from "../data/portfolioData";
import ProjectCard from "./ProjectCard";
import "./WorkSection.css";

export default function WorkSection() {
  return (
    <section id="portfolio" className="portfolio-section">
      <h2>This is the Work Section.</h2>

      <div className="portfolio-grid">
        {portfolioData.projects.map((project, idx) => (
          <ProjectCard key={`${project.title}-${idx}`} project={project} />
        ))}
      </div>
    </section>
  );
}
