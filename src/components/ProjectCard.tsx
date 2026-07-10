import { Link } from "react-router";
import "./ProjectCard.css";
import type { ProjectData } from "../types/portfolioTypes";
import { getSlug } from "../data/portfolioData";

interface ProjectCardProps {
  project: ProjectData;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const slug = getSlug(project.title);
  const thumbnailUrl = `/projects/${slug}/thumbnail.png`;

  return (
    <Link to={`/projects/${slug}`} className="project-card-link">
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
