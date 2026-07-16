import { useEffect, useRef, useState } from "react";
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

  const modalFadeTimer = 100;
  const { setMountPageLayout, setLastScrollPos, restoreLastScrollPos } =
    useLayoutState();
  const { projectData } = useProject();

  const [fadeState, setFadeState] = useState<
    "fade-in" | "fade-out" | "open" | "closed"
  >("closed");

  if (!projectData) return null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !projectData) return;

    if (!dialog.open) {
      dialog.showModal();
      setFadeState("fade-in");
      setLastScrollPos();
    }

    const fadeInTimer = setTimeout(() => {
      setMountPageLayout(false);
      setFadeState("open");
    }, modalFadeTimer);

    return () => clearTimeout(fadeInTimer);
  }, []);

  const handleClose = (e?: React.SyntheticEvent | Event) => {
    e?.preventDefault();

    const dialog = dialogRef.current;
    if (!dialog || !dialog.open) return;

    restoreLastScrollPos();
    setMountPageLayout(true);
    setFadeState("fade-out");

    const fadeOutTimer = setTimeout(() => {
      setFadeState("closed");

      console.log("Dialog faded out.");
      navigate(RELATIVE_ROUTES.home);
    }, modalFadeTimer);

    return () => clearTimeout(fadeOutTimer);
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
