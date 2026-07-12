// src/components/ProjectModal.tsx
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useParams, useNavigate } from "react-router";
import { portfolioData, projectSlugToIndexLUT } from "../data/portfolioData";
import MediaCarousel from "./MediaCarousel";
import CarouselDashboard from "./CarouselDashboard";
import LightboxViewer from "./LightboxViewer";
import "./ProjectModal.css";

export default function ProjectModal() {
  // ... Keep all of your existing state refs and state hooks exactly as they are ...

  // 🚀 THE FINAL COMPILER SILENCER: Natively catches and cancels Vidstack's
  // dangling asynchronous provider promise exceptions right at the browser layer!
  useEffect(() => {
    const handleVidstackRejectionFilter = (event: PromiseRejectionEvent) => {
      // 🚀 THE CRITICAL FIX: Extract the raw error reason directly.
      // If it's an object, check its message property; if it's a primitive string literal, read it directly!
      const errorReason = event.reason;
      const errorMsg =
        typeof errorReason === "string"
          ? errorReason
          : errorReason?.message || "";

      // Intercept and swallow the unhandled async stream leak securely
      if (
        errorMsg.includes("provider destroyed") ||
        errorMsg.includes("Vidstack")
      ) {
        event.preventDefault(); // 💡 Suppresses the unhandled console crash line instantly
        console.log(
          "[VIDSTACK SILENCER] 🔌 Safely intercepted primitive unmount promise rejection.",
        );
      }
    };

    window.addEventListener(
      "unhandledrejection",
      handleVidstackRejectionFilter,
    );
    return () =>
      window.removeEventListener(
        "unhandledrejection",
        handleVidstackRejectionFilter,
      );
  }, []);

  const { slug } = useParams<{ slug?: string }>(),
    dialogRef = useRef<HTMLDialogElement>(null),
    carouselRef = useRef<any>(null);
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false),
    [isCaptionActive, setIsCaptionActive] = useState(false),
    [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);

  const pIdx = slug !== undefined ? projectSlugToIndexLUT[slug] : undefined,
    project = pIdx !== undefined ? portfolioData.projects[pIdx] : null;
  const activeMediaItem = project?.carouselMedia?.[currentIdx];
  const activeCaptionText = activeMediaItem?.caption || "";
  const hasCaption = activeCaptionText !== "";

  useEffect(() => {
    const d = dialogRef.current;
    if (!d || !project) return;
    d.showModal();
    return () => d.close();
  }, [project]);

  useEffect(() => {
    if (!carouselRef.current?.onSlideChange) return;
    return carouselRef.current.onSlideChange((idx: number) =>
      setCurrentIdx(idx),
    );
  }, [project, carouselRef.current]);

  const handleCloseModal = () => {
    const activePlayer = carouselRef.current?.activeMedia?.mediaElement;
    if (
      activePlayer &&
      typeof activePlayer.pause === "function" &&
      !activePlayer.destroyed
    ) {
      try {
        activePlayer.pause();
      } catch {}
    }

    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back();
    } else {
      navigate("/", { replace: true });
    }
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
  };

  if (!project) return null;
  const rawTotal = project.carouselMedia?.length || 0;

  return (
    <dialog
      ref={dialogRef}
      className="project-modal-dialog"
      onClick={(e) => e.target === dialogRef.current && handleCloseModal()}
      onCancel={(e) => {
        e.preventDefault();
        handleCloseModal();
      }}
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
            onClick={handleCloseModal}
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
                disabled={!hasCaption}
                aria-pressed={isCaptionActive}
                onClick={() => setIsCaptionActive(!isCaptionActive)}
              >
                {isCaptionActive && hasCaption ? "CC // Off" : "CC // On"}
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
                {isLightboxOpen ? "✕ Close View" : "🔍 Lightbox"}
              </button>
            </CarouselDashboard>

            <div
              id="lightbox-caption-portal-dock"
              className="global-caption-portal-dock-frame"
              role="status"
              aria-live="polite"
              aria-atomic="true"
              aria-label="Caption"
            />

            {!isLightboxOpen &&
              isCaptionActive &&
              hasCaption &&
              typeof window !== "undefined" &&
              document.getElementById("lightbox-caption-portal-dock") &&
              createPortal(
                <div
                  id="carousel-live-caption"
                  className="lightbox-custom-floating-bubble"
                >
                  {activeCaptionText}
                </div>,
                document.getElementById("lightbox-caption-portal-dock")!,
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
