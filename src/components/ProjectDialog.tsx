import MediaCarousel from "./MediaCarousel";
import type {Project} from "./ProjectContentTypes";
import {projects} from "../data/projects.json";
import showMedia from "./showProjectMedia";

export function ProjectDialog({index}: {index: number}) {
  const project = projects[index] as unknown as Project;

  return (
    <dialog className="project-dialog">
      <MediaCarousel srcArray={project.showcaseMedia} />
      <div className="project-body">
        <h3>{project.title}</h3>
        {project.bodySections.map((bodySection, secIndex) => (
          <div key={secIndex}>
            <h4>{bodySection.sectionHeading}</h4>
            {bodySection.sectionMedia.map((media, mediaIndex) => (
              <div key={mediaIndex}>{showMedia(media)}</div>
            ))}
          </div>
        ))}
      </div>
    </dialog>
  );
}

export default ProjectDialog;
