import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import MediaCarousel from "../carousel/MediaCarousel";
import CarouselDashboard from "../carousel/CarouselDashboard";
import LightboxViewer from "../LightboxViewer";
import "./ProjectModal.css";
import { useNavigate } from "react-router";
import { RELATIVE_ROUTES } from "../../../config/routes.config";
import { useProject } from "../../../hooks/useProject";
import CopyLinkButton from "../CopyLinkbutton";
import { useLayoutState } from "../../../hooks/useLayoutState";

export default function ProjectModal() {
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDialogElement>(null),
    carouselRef = useRef<any>(null),
    captionDockRef = useRef<HTMLDivElement>(null);

  const [isCaptionActive, setIsCaptionActive] = useState(false),
    [activeCaption] = useState(""),
    [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const modalFadeTimer = 1000;
  const { setMountPageLayout } = useLayoutState();
  const { projectData } = useProject();

  const [fadeState, setFadeState] = useState<"fade-in" | "fade-out" | "">("");

  if (!projectData) return null;

  // ENTRANCE TIMELINE: Open dialog frame and lift page grid after fade-in
  useLayoutEffect(() => {
    if (!dialogRef.current) return;

    if (!dialogRef.current.open) {
      dialogRef.current.showModal();
      setFadeState("fade-in");

      const timer = setTimeout(() => {
        console.log("page un-mounted.");
        setMountPageLayout(false);
        setFadeState("");
      }, modalFadeTimer);

      return () => clearTimeout(timer);
    }
  }, [setMountPageLayout]);

  // UNIFIED EXIT PIPELINE: Handles Close Buttons, Backdrop Clicks, and Escape Keys
  const handleClose = (e?: React.SyntheticEvent | Event) => {
    if (!dialogRef.current) return;

    e?.preventDefault(); // Block native instant closure

    if (fadeState === "fade-out" || !dialogRef.current.open) return; // Guard against rapid multi-clicks

    console.log("page mounted.");
    setMountPageLayout(true); // Synchronously restore background page layout frame
    setFadeState("fade-out"); // Switch state to match your exit CSS class rules

    setTimeout(() => {
      setFadeState("");
      dialogRef.current?.close();
      navigate(RELATIVE_ROUTES.home);
    }, modalFadeTimer);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
  };

  if (!projectData) return null;
  const rawTotal = projectData.carouselMedia?.length || 0;

  return (
    <dialog
      ref={dialogRef}
      style={{
        "--modal-fade-timer": `${modalFadeTimer}ms`,
      }}
      className={`project-modal-dialog ${fadeState}`}
      onCancel={handleClose}
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
            onClick={handleClose}
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
