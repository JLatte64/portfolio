import "../components/styles/page-styles/dashboard.css";
import Hero from "../components/Hero";
import { CardGrid } from "../components/cards/CardGrid";
import ProjectModal from "../components/ProjectModal";
import { useLayoutEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { getPagePath } from "../components/functions/GetPagePath";
import ProjectCard from "../components/cards/ProjectCard";
import type { ProjectData } from "../components/types/ProjectTypes";
import type { CardData } from "../components/cards/Card";
import { useDashboardState } from "../context/DashboardContext";
import { useSlugs } from "../context/SlugContext";

export function Dashboard() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();
  const { projectName } = useParams();

  const { scrollPosition, setScrollPosition } = useDashboardState();

  const { processedProjects, slugToProject, titleToSlug } = useSlugs();

  const openProject = projectName ? slugToProject.get(projectName) : undefined;
  const isOpen = Boolean(openProject);

  useLayoutEffect(() => {
    if (!isOpen && scrollPosition > 0) {
      let frameId: number;

      const performScroll = () => {
        window.scrollTo({
          top: scrollPosition,
          behavior: "auto",
        });
      };

      frameId = requestAnimationFrame(performScroll);
      return () => cancelAnimationFrame(frameId);
    }
  }, [isOpen, scrollPosition]);

  const handleClose = () => {
    navigate(getPagePath("dashboard"), { preventScrollReset: true });
  };

  return (
    <>
      <div aria-hidden={isOpen}>{!isOpen && <Hero />}</div>
      {!isOpen ? (
        <main className="dashboard">
          <section id="project-links" aria-label="Project Portfolio Showcase">
            <h2 className="portfolio-section-heading">Portfolio</h2>
            <CardGrid
              className="project"
              items={processedProjects as CardData<ProjectData>[]}
              renderComponent={ProjectCard}
              onClick={(clickedItem) => {
                const projectData = clickedItem as unknown as ProjectData;
                setScrollPosition(window.scrollY);

                const projectSlug = titleToSlug[projectData.title] || "";

                if (projectSlug) {
                  navigate(`${getPagePath("dashboard")}/${projectSlug}`, {
                    preventScrollReset: true,
                  });
                }
              }}
            />
          </section>
        </main>
      ) : null}

      <ProjectModal
        modalData={openProject}
        isOpen={isOpen}
        dialogRef={dialogRef}
        handleClose={handleClose}
      />
    </>
  );
}
