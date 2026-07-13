import { Link } from "react-router";
import "./ProjectCard.css";
import { portfolioData, projectIndexToSlugLUT } from "../data/portfolioData";
import type { ProjectData } from "../types/portfolioTypes";
import { ABSOLUTE_ROUTES } from "../config/routes.config";

interface ProjectCardProps {
  projectIndex: number;
  onClick?: () => void;
}

export default function ProjectCard({
  projectIndex,
  onClick,
}: ProjectCardProps) {
  const project: ProjectData = portfolioData.projects[projectIndex];

  const slug = projectIndexToSlugLUT[projectIndex];
  const thumbnailUrl = project.thumbnailImage.src;

  return (
    <Link
      to={ABSOLUTE_ROUTES.toProject(slug)}
      className="project-card-link"
      onClick={onClick}
      key={`${project.title}-${projectIndex}`}
    >
      <article className="project-card">
        <div className="thumbnail-wrapper">
          {project.thumbnailImage.type === "video" ? (
            <video
              src={thumbnailUrl}
              muted
              autoPlay
              loop
              playsInline
              className="thumbnail-asset"
            />
          ) : (
            <img src={thumbnailUrl} alt={`${project.title} Preview`} />
          )}
        </div>

        <div className="card-details">
          <h3>{project.title}</h3>
          <span className="project-year">{project.year}</span>
        </div>
      </article>
    </Link>
  );
}
