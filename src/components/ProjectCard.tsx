import { Link } from "react-router";
import "./ProjectCard.css";
import { getSlug, portfolioData } from "../data/portfolioData";
import type { ProjectData } from "../types/portfolioTypes";

interface ProjectCardProps {
  projectIndex: number;
}

export default function ProjectCard({ projectIndex }: ProjectCardProps) {
  const project: ProjectData = portfolioData.projects[projectIndex];
  const slug = getSlug(project.title);
  const thumbnailUrl = project.thumbnail;

  return (
    <Link
      to={`/projects/${slug}`}
      className="project-card-link"
      key={`${project.title}-${projectIndex}`}
    >
      <article className="project-card">
        <div className="thumbnail-wrapper">
          <img src={thumbnailUrl} alt={`${project.title} Preview`} />
        </div>

        <div className="card-details">
          <h3>{project.title}</h3>
          <span className="project-year">{project.year}</span>
        </div>
      </article>
    </Link>
  );
}
