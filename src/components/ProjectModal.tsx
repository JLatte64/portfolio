import { useEffect, useRef, useState } from "react";
import type { ProjectData } from "../types/portfolioTypes";
import ProjectCarousel from "./ProjectCarousel";
import CarouselControls from "./CarouselControls";
import LightboxViewer from "./LightboxViewer";
import "./ProjectModal.css";

interface ProjectModalProps {
  readonly project: ProjectData;
  readonly onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [copied, setCopied] = useState(false);
  const emblaApiRef = useRef<any>(null);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showCaptions, setShowCaptions] = useState(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Encapsulated Keyboard Shortcuts
  useEffect(() => {
    const handleModalKeys = (event: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (activeEl?.tagName === "INPUT" || activeEl?.tagName === "TEXTAREA")
        return;

      const api = emblaApiRef.current;
      switch (event.key) {
        case "Escape":
          event.preventDefault();
          onClose(); // ✅ Triggers standard route cleanup unmounting natively
          break;
        case "ArrowRight":
          if (api) {
            event.preventDefault();
            api.scrollNext();
          }
          break;
        case "ArrowLeft":
          if (api) {
            event.preventDefault();
            api.scrollPrev();
          }
          break;
        case " ":
          const currentMediaItem = project.carouselMedia?.[selectedIndex];
          if (currentMediaItem?.caption && currentMediaItem.type !== "video") {
            event.preventDefault();
            setShowCaptions((prev) => !prev);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleModalKeys);
    return () => window.removeEventListener("keydown", handleModalKeys);
  }, [selectedIndex, project.carouselMedia, onClose]);

  // Sync Native HTML Dialog Openers
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.showModal(); // ✅ Open native modal browser window layer

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [project, onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      onClose();
    }
  };

  // Pure click handler calculates full address strings dynamically on-the-fly
  const handleCopyLink = async () => {
    try {
      if (typeof window === "undefined" || !navigator.clipboard) return;

      const serverBaseUrl = import.meta.env.BASE_URL;
      const projectSlug = encodeURIComponent(project.title);
      const relativePath = `${serverBaseUrl}/${projectSlug}`.replace(
        /\/+/g,
        "/",
      );
      const finalUrl = new URL(relativePath, window.location.origin).href;

      await navigator.clipboard.writeText(finalUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="project-modal-dialog"
      onClick={handleBackdropClick}
    >
      <div className="modal-inner-layout">
        <header className="modal-header-bar">
          <div className="header-left-meta">
            <button
              type="button"
              className={`copy-link-title-btn ${copied ? "copied" : ""}`}
              onClick={handleCopyLink}
            >
              <h2>
                {project.title}
                <span className="copy-icon-indicator">
                  {copied ? "✓ Copied" : "🔗"}
                </span>
              </h2>
            </button>
            <span className="modal-year-tag">{project.year}</span>
          </div>
          <button className="global-close-button" onClick={onClose}>
            ✕
          </button>
        </header>

        <div className="modal-panes-body">
          <section
            className={`pane-left-carousel ${isLightboxOpen ? "is-lightbox-active" : ""}`}
          >
            <ProjectCarousel
              bridgeRef={emblaApiRef}
              media={project.carouselMedia}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
            />
            <CarouselControls
              media={project.carouselMedia}
              emblaApiRef={emblaApiRef}
              selectedIndex={selectedIndex}
              showCaptions={showCaptions}
              onToggleCaptions={() => setShowCaptions((prev) => !prev)}
              onToggleLightbox={setIsLightboxOpen}
            />
            <LightboxViewer
              mediaItem={project.carouselMedia?.[selectedIndex]}
              emblaApiRef={emblaApiRef}
              showCaptions={showCaptions}
              isOpen={isLightboxOpen}
              onToggleCaptions={() => setShowCaptions((prev) => !prev)}
              onClose={() => setIsLightboxOpen(false)}
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
