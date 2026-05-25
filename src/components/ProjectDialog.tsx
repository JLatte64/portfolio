import MediaCarousel from "./MediaCarousel";
import type {Project} from "./ProjectContentTypes";
import {projects} from "../data/projects.json";
import "../components/styles/page-styles/WorkSamples.css";
import showProjectMedia from "./showProjectMedia";
//import {useState} from "react";
//import showProjectMedia from "./showProjectMedia";

export function ProjectDialog({index}: {index: number}) {
  const project = projects[index] as unknown as Project;

  return (
    <>
      <h3>{project.title}</h3>
      <div className="carousel-container">
        <MediaCarousel srcArray={project.showcaseMedia} />
      </div>
      <div className="project-body">
        {project.bodySections.map((bodySection, secIndex) => (
          <div key={secIndex}>
            <h4>{bodySection.sectionHeading}</h4>
            {bodySection.sectionMedia.map((media, mediaIndex) => (
              <div key={mediaIndex}>{showProjectMedia(media)}</div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default ProjectDialog;
