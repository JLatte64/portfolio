import { CardGrid } from "./CardGrid";
import { ProjectCard } from "./ProjectCard";
import { projects } from "../data/projects.json";

export default function ProjectCardGrid() {
  if (!projects) return <h3>Loading projects...</h3>;

  return (
    <CardGrid className="project">
      {projects?.map((_, index) =>
        projects[index]?.tags.includes("tech art") ? (
          <ProjectCard key={index} index={index} />
        ) : null,
      )}
    </CardGrid>
  );
}
