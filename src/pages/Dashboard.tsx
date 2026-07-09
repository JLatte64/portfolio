import "../components/styles/page-styles/dashboard.css";
import Hero from "../components/Hero";
import { CardGrid } from "../components/cards/CardGrid";
import ProjectModal from "../components/ProjectModal";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getPagePath } from "../components/functions/GetPagePath";
import ProjectCard from "../components/cards/ProjectCard";
import type { ProjectData } from "../components/types/ProjectTypes";
import type { CardData } from "../components/cards/Card";
import { useDashboardState } from "../context/DashboardContext";
import { useSlugs } from "../context/SlugContext";
import type { Media } from "../components/types/MediaTypes";
import { heroSlides } from "../data/projects.json";
import DisplayMedia from "../components/functions/DisplayMedia";

export function Dashboard() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();
  const { projectName } = useParams();

  const { scrollPosition, setScrollPosition } = useDashboardState();

  const { processedProjects, slugToProject, titleToSlug } = useSlugs();

  const openProject = projectName ? slugToProject.get(projectName) : undefined;
  const isOpen = Boolean(openProject);
  const heroMedia = heroSlides as Media[];

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

  const { heroSlide, setHeroSlide, heroTimeElapsed, setHeroTimeElapsed } =
    useDashboardState();
  const sliderRef = useRef<HTMLDivElement>(null);
  const totalSlides = heroSlides?.length || 0;
  const lastUpdateRef = useRef<number | null>(null);
  const elapsedRef = useRef<number>(heroTimeElapsed);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!sliderRef.current) return;
    const obs = new IntersectionObserver(
      ([el]) => setIsVisible(el.isIntersecting),
      { threshold: 0.1 },
    );
    obs.observe(sliderRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || totalSlides <= 1) {
      lastUpdateRef.current = null;
      return;
    }

    let frameId: number;
    lastUpdateRef.current = performance.now();

    const tick = (now: number) => {
      if (lastUpdateRef.current !== null) {
        const delta = now - lastUpdateRef.current;
        elapsedRef.current += delta;

        if (elapsedRef.current >= 3000) {
          setHeroSlide(
            elapsedRef.current >= 6000 ? 0 : (heroSlide + 1) % totalSlides,
          );
          elapsedRef.current = elapsedRef.current % 3000;
        }
      }
      lastUpdateRef.current = now;
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      setHeroTimeElapsed(elapsedRef.current);
    };
  }, [isVisible, totalSlides, heroSlide, setHeroSlide, setHeroTimeElapsed]);

  return (
    <>
      <div ref={sliderRef} className="db-slider" aria-hidden={true}>
        {heroMedia?.map((media, mediaIndex) => {
          const slideKey = media.id || `db-slide-${mediaIndex}`;
          const isActive = mediaIndex === heroSlide;

          return (
            <div
              key={slideKey}
              className={`db-slide ${isActive ? "is-visible" : "is-hidden"}`}
              aria-hidden={true}
            >
              <DisplayMedia
                media={media}
                className={isActive ? "active" : ""}
                shouldLazyLoad={false}
              />
            </div>
          );
        })}
      </div>
      <div className="db-slider-overlay" />
      {!isOpen ? (
        <div>
          <Hero />
          <main className="dashboard">
            <section
              id="project-links"
              className="console"
              aria-label="Project Portfolio Showcase"
            >
              <div className="console-header">
                <h2>Portfolio</h2>
                <p>// Jordan_Latta</p>
              </div>

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
        </div>
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
