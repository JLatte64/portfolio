//This is where each project is listed out in detail with their respective
//content carousels & lightboxes.
//import Carousel from "../components/Carousel";

import ProjectDialog from "../components/ProjectDialog";
import "../components/styles/page-styles/WorkSamples.css";
import {projects} from "../data/projects.json";

export function WorkSamples() {
  return (
    <div className="content">
      {projects.map((_, index) => {
        return (
          <section id={projects[index].title.replace(/[^a-zA-Z0-9]/g, "")}>
            <div className="project-content-container">
              <ProjectDialog index={index} />
            </div>
          </section>
        );
      })}
    </div>
  );
}
