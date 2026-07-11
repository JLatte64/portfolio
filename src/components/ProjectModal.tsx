import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { portfolioData, projectSlugToIndexLUT } from "../data/portfolioData";
import ProjectCarousel from "./ProjectCarousel";
import CarouselControls from "./CarouselControls";
import LightboxViewer from "./LightboxViewer";
import "./ProjectModal.css";

export default function ProjectModal() {
  const { slug } = useParams<{ slug?: string }>();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [copied, setCopied] = useState(false);

  const activeMediaRef = useRef<any>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const projectIndex =
    slug !== undefined ? projectSlugToIndexLUT[slug] : undefined;
  const project =
    projectIndex !== undefined ? portfolioData.projects[projectIndex] : null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !project) return;
    dialog.showModal();
    return () => dialog.close();
  }, [project]);

  if (!project) return null;

  const rawTotal = project.carouselMedia?.length || 0;

  return (
    <dialog
      ref={dialogRef}
      className="project-modal-dialog"
      onClick={(e) => e.target === dialogRef.current && window.history.back()}
    >
      <div className="modal-inner-layout">
        <header className="modal-header-bar">
          <div className="header-left-meta">
            <button
              type="button"
              className={`copy-link-title-btn ${copied ? "copied" : ""}`}
              onClick={async () => {
                await navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
            >
              <h2>
                {project.title}{" "}
                <span className="copy-icon-indicator">
                  {copied ? "✓ Copied" : "🔗"}
                </span>
              </h2>
            </button>
            <span className="modal-year-tag">{project.year}</span>
          </div>
          <button
            type="button"
            className="global-close-button"
            onClick={() => window.history.back()}
          >
            ✕
          </button>
        </header>

        <div
          className={`modal-panes-body ${isLightboxOpen ? "is-lightbox-active" : ""}`}
        >
          <section className="pane-left-carousel">
            <ProjectCarousel
              activeMediaRef={activeMediaRef}
              mediaList={project.carouselMedia}
            />

            <LightboxViewer
              mediaItem={project.carouselMedia}
              carouselRef={activeMediaRef}
              isOpen={isLightboxOpen}
            />

            <CarouselControls length={rawTotal} carouselRef={activeMediaRef}>
              <button
                type="button"
                className="control-btn"
                onClick={() => setIsLightboxOpen((prev) => !prev)}
              >
                {isLightboxOpen ? "✕ Close View" : "🔍 Lightbox"}
              </button>
            </CarouselControls>
          </section>

          <aside className="pane-right-details">
            <p className="modal-main-description-text">{project.description}</p>
          </aside>
        </div>
      </div>
    </dialog>
  );
}
