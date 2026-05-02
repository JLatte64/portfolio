import { ProjectCard } from "./ProjectCard";
import { projects } from "../data/projects.json";

export const ProjectCards = ({ tag }: { tag: string }) => {
  return projects.map((_, index) =>
    projects[index].tags?.includes(tag) ? (
      <ProjectCard index={index} key={index} />
    ) : null,
  );
};
