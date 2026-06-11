import { Card } from "./Card";
import { projects } from "../data/projects.json";
import ProjectModal from "./ProjectModal";
import "./styles/projectCard.css";
import { useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { getPagePath } from "./GetPagePath";
import purifyString from "./PurifyString";

export function ProjectCard({ index }: { index: number }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const project = projects && projects[index] ? projects[index] : undefined;
  const navigate = useNavigate();

  const slug =
    projects[index]?.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-") || "";

  const { projectName } = useParams();
  const isOpen = projectName === slug;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  const handleOpen = () => {
    navigate(`${getPagePath("dashboard")}${slug}`, {
      preventScrollReset: true,
    });
  };

  const handleClose = () => {
    navigate(getPagePath("dashboard"), { preventScrollReset: true });
  };

  return (
    <Card className="project" onClick={handleOpen}>
      <img
        src={projects[index].thumbnail.src}
        alt={projects[index].thumbnail.alt}
        className="projectcard-thumbnail"
      />
      <span className="projectcard-title">
        {purifyString(projects[index].title)}
      </span>

      <div onClick={(e) => e.stopPropagation()}>
        <ProjectModal
          project={project}
          isOpen={isOpen}
          dialogRef={dialogRef}
          handleClose={handleClose}
        />
      </div>
    </Card>
  );
}
