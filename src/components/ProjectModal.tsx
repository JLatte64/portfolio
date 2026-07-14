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
import { useLayoutState } from "../hooks/useLayoutState";

type ModalLifecycle = "opening" | "open" | "closing";

export default function ProjectModal() {
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDialogElement>(null),
    carouselRef = useRef<any>(null),
    captionDockRef = useRef<HTMLDivElement>(null);
  const [lifecycle, setLifecycle] = useState<ModalLifecycle>("opening");

  const [isCaptionActive, setIsCaptionActive] = useState(false),
    [activeCaption, setActiveCaption] = useState(""),
    [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const modalFadeTimer = 100;
  const { setMountPageLayout, rememberScroll } = useLayoutState();
  const { projectData } = useProject();

  const handleSafeModalClose = (e?: React.SyntheticEvent | Event) => {
    if (!dialogRef?.current) return;
    e?.preventDefault?.();
    if (lifecycle === "open") {
      setMountPageLayout(true);
      setLifecycle("closing");

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
      rememberScroll();
      dialogRef.current.showModal();
      setLifecycle("opening");
    }

    const frameId = requestAnimationFrame(() => {
      setTimeout(() => {
        setLifecycle("open");
        setMountPageLayout(false);
      }, modalFadeTimer);
    });
    return () => {
      cancelAnimationFrame(frameId);
      setMountPageLayout(true);
    };
  }, [projectData, setMountPageLayout, modalFadeTimer]);

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
  }, [dialogRef?.current?.open]);

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
        "--modal-fade-timer": `${modalFadeTimer}ms`,
      }}
      className={`project-modal-dialog ${lifecycle}`}
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
