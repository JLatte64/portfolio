import { Link } from "react-router";
import "./ProjectCard.css";
import {
  portfolioData,
  projectIndexToSlugLUT,
} from "../../../data/portfolioData";
import type { ProjectData } from "../../../types/portfolioTypes";
import { RELATIVE_ROUTES } from "../../../config/routes.config";
import { MemoMediaWrapper } from "../../ui/RenderMedia";

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

  return (
    <Link
      to={RELATIVE_ROUTES.toProject(slug)}
      className="project-card-link"
      key={`${project.title}-${projectIndex}`}
      onClick={onClick}
    >
      <article className="project-card">
        <div className="thumbnail-wrapper">
          <MemoMediaWrapper item={project.thumbnailImage} />
        </div>

        <div className="card-details">
          <h3>{project.title}</h3>
          <span className="project-year">{project.year}</span>
        </div>
      </article>
    </Link>
  );
}
