import ProjectDialog from "../components/ProjectDialog";
import { projects } from "../data/projects.json";

export function ProjectDemo() {
  return (
    <div className="content">
      <section id={projects[0].title.replace(/[^a-zA-Z0-9]/g, "")}>
        <div className="project-content-container">
          <ProjectDialog index={0} />
        </div>
      </section>
    </div>
  );
}

export default ProjectDemo;
