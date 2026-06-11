import { CardGrid } from "./CardGrid";
import { ProjectCard } from "./ProjectCard";
import { projects } from "../data/projects.json";

export default function ProjectCardGrid({ filterTag }: { filterTag: string }) {
  if (!projects || projects.length === 0) return <h3>Loading projects...</h3>;

  const filteredProjects = projects.filter((project) =>
    project?.tags?.includes(filterTag),
  );

  return (
    <CardGrid className="project">
      {filteredProjects.map((_, index) => (
        <ProjectCard key={index} index={index} />
      ))}
    </CardGrid>
  );
}
