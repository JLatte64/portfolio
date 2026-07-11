import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { portfolioData, projectSlugToIndexLUT } from "../data/portfolioData";
import ProjectCarousel from "./ProjectCarousel";
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
            {/* 
              💡 STRIPPED DOWN INJECTION:
              The child elements automatically share properties and synchronizations 
              natively across the activeMediaRef channel pipeline wrapper.
            */}
            <ProjectCarousel
              activeMediaRef={activeMediaRef}
              mediaList={project.carouselMedia}
              isLightboxOpen={isLightboxOpen}
              setIsLightboxOpen={setIsLightboxOpen}
            />
          </section>

          <aside className="pane-right-details">
            <p className="modal-main-description-text">{project.description}</p>
          </aside>
        </div>
      </div>
    </dialog>
  );
}
