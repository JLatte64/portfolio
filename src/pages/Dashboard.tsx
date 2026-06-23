import "../components/styles/page-styles/dashboard.css";
import Hero from "../components/Hero";
import { CardGrid } from "../components/cards/CardGrid";
import ProjectModal from "../components/ProjectModal";
import { useLayoutEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { getPagePath } from "../components/functions/GetPagePath";
import { projects } from "../data/projects.json";
import ProjectCard from "../components/cards/ProjectCard";
import type { ProjectData } from "../components/types/ProjectTypes";
import type { CardData } from "../components/cards/Card";
import { projectSlugs } from "../components/ProjectSlugs";
import { useDashboardState } from "../components/DashboardContext";

const injectProjectIds = (project: ProjectData): ProjectData => {
  const entries = Array.from(projectSlugs.entries());
  const foundEntry = entries.find(([_, p]) => p.title === project.title);
  const cleanTitle = foundEntry ? foundEntry[0] : "project";

  return {
    ...project,
    id: project.id || `proj-${cleanTitle}`,
    bodySections: (project.bodySections ?? []).map((section, secIndex) => ({
      ...section,
      id: section.id || `sec-${cleanTitle}-${secIndex}`,
      sectionMedia: (section.sectionMedia ?? []).map((media, mediaIndex) => ({
        ...media,
        id: media.id || `media-${cleanTitle}-${secIndex}-${mediaIndex}`,
      })),
    })),
  };
};

export function Dashboard() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();
  const { projectName } = useParams();

  const { scrollPosition, setScrollPosition } = useDashboardState();

  const matchedProject = projectName
    ? projectSlugs.get(projectName)
    : undefined;
  const openProject = matchedProject
    ? injectProjectIds(matchedProject)
    : undefined;
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
      {!isOpen && <Hero />}

      <main>
        <div className="home-content">
          {!isOpen ? (
            <section id="project-links">
              <h2>Portfolio</h2>
              <CardGrid
                className="project"
                items={
                  (projects ?? []).map((p) =>
                    injectProjectIds(p as ProjectData),
                  ) as CardData<ProjectData>[]
                }
                renderComponent={ProjectCard}
                onClick={(clickedItem) => {
                  const projectData = clickedItem as unknown as ProjectData;

                  const entries = Array.from(projectSlugs.entries());
                  const match = entries.find(
                    ([_, p]) => p.title === projectData.title,
                  );
                  const projectSlug = match ? match[0] : "";

                  setScrollPosition(window.scrollY);

                  if (projectSlug) {
                    navigate(`${getPagePath("dashboard")}/${projectSlug}`, {
                      preventScrollReset: true,
                    });
                  }
                }}
              />
            </section>
          ) : (
            <div style={{ display: "none" }} />
          )}
        </div>
      </main>

      <div onClick={(e) => e.stopPropagation()}>
        <ProjectModal
          modalData={openProject}
          isOpen={isOpen}
          dialogRef={dialogRef}
          handleClose={handleClose}
        />
      </div>
    </>
  );
}
