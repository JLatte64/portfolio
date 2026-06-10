import { Card } from "./Card";
import { projects } from "../data/projects.json";
import ProjectModal from "./ProjectModal";
import "../components/styles/projectCard.css";
import { useRef, useState } from "react";

export function ProjectCard({ index }: { index: number }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const project = projects && projects[index] ? projects[index] : undefined;

  const handleOpen = () => {
    dialogRef.current?.showModal();
    setIsOpen(true);
  };

  const handleClose = () => {
    dialogRef.current?.close();
    setIsOpen(false);
  };

  return (
    <Card className="project" onClick={handleOpen}>
      <img
        src={projects[index].thumbnail.src}
        alt={projects[index].thumbnail.alt}
        className="projectcard-thumbnail"
      ></img>
      <span className="projectcard-title">{projects[index].title}</span>
      <ProjectModal
        project={project}
        isOpen={isOpen}
        dialogRef={dialogRef}
        handleClose={handleClose}
      />
    </Card>
  );
}
