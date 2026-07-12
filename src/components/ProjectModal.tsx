// src/components/ProjectModal.tsx
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { portfolioData, projectSlugToIndexLUT } from "../data/portfolioData";
import MediaCarousel from "./MediaCarousel";
import CarouselDashboard from "./CarouselDashboard";
import LightboxViewer from "./LightboxViewer";
import "./ProjectModal.css";

export default function ProjectModal() {
  const { slug } = useParams<{ slug?: string }>(),
    dialogRef = useRef<HTMLDialogElement>(null),
    carouselRef = useRef<any>(null);
  const [copied, setCopied] = useState(false),
    [isCaptionActive, setIsCaptionActive] = useState(false),
    [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [, setIdx] = useState(0);

  const pIdx = slug !== undefined ? projectSlugToIndexLUT[slug] : undefined,
    project = pIdx !== undefined ? portfolioData.projects[pIdx] : null;
  const hasCaption = !!carouselRef.current?.activeMedia?.captionElement;

  useEffect(() => {
    const d = dialogRef.current;
    if (!d || !project) return;
    d.showModal();
    return () => d.close();
  }, [project]);

  useEffect(() => {
    return carouselRef.current?.onSlideChange?.((i: number) => setIdx(i));
  }, [project, carouselRef.current]);

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
            <MediaCarousel
              activeMediaRef={carouselRef}
              mediaList={project.carouselMedia}
            />
            <LightboxViewer
              mediaItem={project.carouselMedia}
              carouselRef={carouselRef}
              isOpen={isLightboxOpen}
            />

            <CarouselDashboard length={rawTotal} carouselRef={carouselRef}>
              <button
                type="button"
                className="control-btn"
                disabled={!hasCaption}
                aria-pressed={isCaptionActive}
                onClick={() => setIsCaptionActive(!isCaptionActive)}
              >
                {isCaptionActive && hasCaption ? "CC" : "CC/"}
              </button>
              <button
                type="button"
                className="control-btn"
                onClick={() => setIsLightboxOpen(!isLightboxOpen)}
              >
                {isLightboxOpen ? "✕" : "🔍"}
              </button>
            </CarouselDashboard>
          </section>
          <aside className="pane-right-details">
            <p className="modal-main-description-text">{project.description}</p>
          </aside>
        </div>
      </div>
    </dialog>
  );
}
