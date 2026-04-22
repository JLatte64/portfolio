import ProjectWidget from "./ProjectWidget";
import { projects } from "../assets/data/projects.json";

const ProjectWidgetsDisplay = ({ tag }: { tag: string }) => {
  return projects.map((_, index) =>
    projects[index].tags?.includes(tag) ? (
      <ProjectWidget index={index} key={index} />
    ) : null,
  );
};

export default ProjectWidgetsDisplay;
