import MediaCarousel from "./MediaCarousel";
import type { Project } from "./ProjectContentTypes";
import { projects } from "../data/projects.json";
import showMedia from "./showProjectMedia";
import "../components/styles/projectDialog.css";

export function ProjectDialog({ index }: { index: number }) {
  const project = projects[index] as unknown as Project;

  return (
    <div className="project-container">
      <div className="carousel-container">
        <h3 className="project-title">{project.title}</h3>
        <MediaCarousel srcArray={project.showcaseMedia} />
      </div>
      <div className="project-body">
        {project.bodySections.map((bodySection, secIndex) => (
          <div className="project-body-section" key={secIndex}>
            <h4>{bodySection.sectionHeading}</h4>
            {bodySection.sectionMedia.map((media, mediaIndex) => (
              <div key={mediaIndex}>{showMedia(media, "project-media")}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectDialog;
