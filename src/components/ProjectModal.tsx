import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { portfolioData } from "../data/portfolioData";
import MediaCarousel from "./MediaCarousel";
import CarouselDashboard from "./CarouselDashboard";
import LightboxViewer from "./LightboxViewer";
import "./ProjectModal.css";
import { MemoMediaWrapper } from "./RenderMedia";
import { useNavigate } from "react-router";
import { ABSOLUTE_ROUTES } from "../config/routes.config";

// Inside your main Modal/Dialog component component body:

interface ProjectModalProps {
  projIndex: number | undefined;
  onShouldClose: () => void;
}

export default function ProjectModal({
  projIndex,
  onShouldClose,
}: ProjectModalProps) {
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDialogElement>(null),
    carouselRef = useRef<any>(null),
    captionDockRef = useRef<HTMLDivElement>(null),
    [lastValidIndex, setLastValidIndex] = useState<number>(0);

  const [copied, setCopied] = useState(false),
    [isCaptionActive, setIsCaptionActive] = useState(false),
    [activeCaption, setActiveCaption] = useState(""),
    [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const project =
    projIndex !== undefined
      ? portfolioData.projects[projIndex]
      : portfolioData.projects[lastValidIndex];

  const handleModalClose = (e?: React.SyntheticEvent | Event) => {
    if (!dialogRef?.current) return;

    e?.preventDefault?.();

    if (dialogRef.current.open) {
      dialogRef.current.close();

      setTimeout(() => {
        onShouldClose();
        navigate(ABSOLUTE_ROUTES.home);
      }, 0);
    }
  };

  useEffect(() => {
    if (!dialogRef?.current) return;

    if (projIndex !== undefined) {
      setLastValidIndex(projIndex);

      if (!dialogRef.current.open) {
        dialogRef.current.showModal();
      }
    } else {
      handleModalClose();
    }
  }, [projIndex]);

  useEffect(() => {
    if (!carouselRef?.current?.onSlideChange) return;

    const updateCaption = carouselRef.current.onSlideChange(() => {
      const caption =
        carouselRef.current?.activeMedia?.captionElement?.textContent || null;
      setActiveCaption(caption);
    });

    return () => updateCaption();
  }, []);

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
  };

  if (!project) return null;
  const rawTotal = project.carouselMedia?.length || 0;

  return (
    <dialog
      ref={dialogRef}
      className="project-modal-dialog"
      onCancel={(e) => handleModalClose(e)}
      aria-label={`Project Profile Viewport: ${project.title}`}
    >
      <div className="modal-inner-layout">
        <header className="modal-header-bar">
          <div className="header-left-meta">
            <h2>{project.title}</h2>
            <button
              type="button"
              className={`copy-link-title-btn ${copied ? "copied" : ""}`}
              onClick={async () => {
                await navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              aria-label="Copy project link to clipboard"
            >
              <span className="copy-icon-indicator">
                {copied ? "✓ Copied" : "🔗"}
              </span>
            </button>
            <span className="modal-year-tag">{project.year}</span>
          </div>
          <button
            type="button"
            className="global-close-button"
            onClick={(e) => handleModalClose(e)}
            aria-label="Close project details window"
          >
            ✕
          </button>
        </header>

        <div
          className={`modal-panes-body ${isLightboxOpen ? "is-lightbox-active" : ""}`}
        >
          <section
            className="pane-left-carousel"
            role="region"
            aria-label="Project media showcase"
          >
            <MediaCarousel
              activeMediaRef={carouselRef}
              mediaList={project.carouselMedia}
            />
            <LightboxViewer
              carouselRef={carouselRef}
              isOpen={isLightboxOpen}
              onClose={handleCloseLightbox}
              isCaptionActive={isCaptionActive}
            />

            <CarouselDashboard length={rawTotal} carouselRef={carouselRef}>
              <button
                type="button"
                className="control-btn"
                disabled={!activeCaption}
                aria-pressed={isCaptionActive}
                onClick={() => setIsCaptionActive(!isCaptionActive)}
              >
                {isCaptionActive && activeCaption ? "CC // Off" : "CC // On"}
              </button>
              <button
                type="button"
                className="control-btn"
                onClick={() =>
                  isLightboxOpen
                    ? handleCloseLightbox()
                    : setIsLightboxOpen(true)
                }
              >
                {isLightboxOpen ? "✕" : "🔍"}
              </button>
            </CarouselDashboard>

            <div
              ref={captionDockRef}
              id="lightbox-caption-portal-dock"
              className="global-caption-portal-dock-frame"
              role="status"
              aria-live="polite"
              aria-atomic="true"
              aria-label="Caption"
            />

            {!isLightboxOpen &&
              isCaptionActive &&
              activeCaption &&
              captionDockRef.current &&
              createPortal(
                <div
                  id="carousel-live-caption"
                  className="lightbox-custom-floating-bubble"
                >
                  {activeCaption}
                </div>,
                captionDockRef.current,
              )}
          </section>
          <aside className="pane-right-details">
            <p className="modal-main-description-text">{project.description}</p>
          </aside>
        </div>
      </div>
    </dialog>
  );
}
