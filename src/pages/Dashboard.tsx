import "../components/styles/page-styles/dashboard.css";
import Hero from "../components/Hero";
import { CardGrid } from "../components/CardGrid";
import ProjectModal from "../components/ProjectModal";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getPagePath } from "../components/GetPagePath";
import { projects } from "../data/projects.json";
import ProjectCard from "../components/ProjectCard";
import type { ProjectData } from "../components/types/ProjectTypes";
import type { CardData } from "../components/types/CardTypes";

const generateSlug = (title: string | undefined) => {
  if (!title) return "";
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
};

export function Dashboard() {
  const [openProject, setOpenProject] = useState<ProjectData>();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();
  const { projectName } = useParams();

  const currentProjectSlug = openProject ? generateSlug(openProject.title) : "";
  const isOpen = Boolean(
    projectName && currentProjectSlug && projectName === currentProjectSlug,
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isOpen]);

  const handleClose = () => {
    navigate(getPagePath("dashboard"), { preventScrollReset: true });
  };

  return (
    <>
      <Hero />
      <main>
        <div className="home-content">
          <section id="project-links">
            <h2>Portfolio</h2>
            <CardGrid
              className="project"
              items={(projects ?? []) as CardData[]}
              renderComponent={ProjectCard}
              onClick={(clickedItem) => {
                const projectData = clickedItem as unknown as ProjectData;
                const projectSlug = generateSlug(projectData.title);

                setOpenProject(projectData);

                navigate(`${getPagePath("dashboard")}/${projectSlug}`, {
                  preventScrollReset: true,
                });
              }}
            />
            <div onClick={(e) => e.stopPropagation()}>
              <ProjectModal
                modalData={openProject}
                isOpen={isOpen}
                dialogRef={dialogRef}
                handleClose={handleClose}
              />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
