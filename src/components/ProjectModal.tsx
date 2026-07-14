// src/components/ProjectModal.tsx
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import MediaCarousel from "./MediaCarousel";
import CarouselDashboard from "./CarouselDashboard";
import LightboxViewer from "./LightboxViewer";
import "./ProjectModal.css";
import { useNavigate } from "react-router";
import { ABSOLUTE_ROUTES } from "../config/routes.config";
import { useProject } from "../hooks/useProject";
import CopyLinkButton from "./CopyLinkbutton";

export default function ProjectModal() {
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDialogElement>(null),
    carouselRef = useRef<any>(null),
    captionDockRef = useRef<HTMLDivElement>(null);

  const [isAnimateMounted, setIsAnimateMounted] = useState(false);

  const [isCaptionActive, setIsCaptionActive] = useState(false),
    [activeCaption, setActiveCaption] = useState(""),
    [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const modalFadeTimer = 100;
  const { projectData } = useProject();
  const scrollContainerRef = useRef<HTMLElement | null>(null);

  const handleSafeModalClose = (e?: React.SyntheticEvent | Event) => {
    if (!dialogRef?.current) return;
    e?.preventDefault?.();

    if (dialogRef.current.open && isAnimateMounted) {
      setIsAnimateMounted(false);

      setTimeout(() => {
        if (dialogRef.current) {
          dialogRef.current.close();
        }

        navigate(ABSOLUTE_ROUTES.home);
      }, modalFadeTimer);
    }
  };

  useEffect(() => {
    if (!dialogRef.current || !projectData) return;

    if (!dialogRef.current.open) {
      dialogRef.current.showModal();
    }

    const liveContainer = document.querySelector(".portfolio-scroll-container");
    if (liveContainer) {
      scrollContainerRef.current = liveContainer as HTMLElement;

      // 📸 Execute your high-performance hook capture routine instantly
      //handleCapture();
    }

    // Trigger your scale-pop entry curve smoothly on the very next browser paint pass
    const frameId = requestAnimationFrame(() => {
      setIsAnimateMounted(true);
    });
    return () => cancelAnimationFrame(frameId);
  }, [projectData]);

  // Track global hardware shortcuts to bypass focused button keyboard traps completely
  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isLightboxOpen) {
        event.preventDefault();
        handleSafeModalClose(event);
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown, { capture: true });
    return () =>
      window.removeEventListener("keydown", handleGlobalKeyDown, {
        capture: true,
      });
  }, [isAnimateMounted]);

  // Monitor carousel track slide caption updates
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

  if (!projectData) return null;
  const rawTotal = projectData.carouselMedia?.length || 0;

  return (
    <dialog
      ref={dialogRef}
      style={{
        "--modal-fade-timer": modalFadeTimer,
        "--modal-backdrop-image": "none",
      }}
      className={`project-modal-dialog ${isAnimateMounted ? "mounted" : "unmounted"}`}
      onCancel={(e) => handleSafeModalClose(e)}
      onClose={undefined}
      aria-label={`Project Profile Viewport: ${projectData.title}`}
    >
      <div className="modal-inner-layout">
        <header className="modal-header-bar">
          <div className="header-left-meta">
            <h2>{projectData.title}</h2>
            <CopyLinkButton
              className="copy-link-title-btn"
              aria-label="Copy project link to clipboard"
            />
            <span className="modal-year-tag">{projectData.year}</span>
          </div>
          <button
            type="button"
            className="global-close-button"
            onClick={(e) => handleSafeModalClose(e)}
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
              carouselRef={carouselRef}
              mediaList={projectData.carouselMedia}
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
            <p className="modal-main-description-text">
              {projectData.description}
            </p>
          </aside>
        </div>
      </div>
    </dialog>
  );
}
