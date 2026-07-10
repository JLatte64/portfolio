import { useEffect, useRef } from "react";
import type { ProjectData } from "../types/portfolioTypes";
import ProjectMedia from "./ProjectMedia";
import "./ProjectModal.css";

interface ProjectModalProps {
  project: ProjectData;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // 1. Sync the HTML Dialog state with the presence of your project data
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Open using showModal to trigger the Top Layer context and native backdrop
    dialog.showModal();

    // Listen for the browser's native cancel event (triggered by the Escape key)
    const handleCancel = (e: Event) => {
      e.preventDefault(); // Stop default browser override
      onClose(); // Trigger your React Router home navigation callback
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [project, onClose]);

  // Handle manual clicks on the modal backdrop space cleanly
  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    /* 2. Render the native semantic dialog element container wrapper */
    <dialog
      ref={dialogRef}
      className="project-modal-dialog"
      onClick={handleBackdropClick}
    >
      <aside className="modal-sidebar">
        <div className="modal-header">
          <div className="header-meta">
            <h2>{project.title}</h2>
            <span className="modal-year">{project.year}</span>
          </div>
          <button
            className="close-button"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <p className="modal-description">{project.description}</p>

        {project.carouselMedia && project.carouselMedia.length > 0 && (
          <div className="modal-carousel-container">
            <div className="modal-carousel-track">
              {project.carouselMedia.map((mediaUrl, idx) => (
                <div key={`carousel-${idx}`} className="modal-carousel-item">
                  <ProjectMedia value={mediaUrl} />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="modal-sections-stack">
          {project.sections.map((section, idx) => (
            <div key={`section-${idx}`} className="modal-section-block">
              {section.heading && <h3>{section.heading}</h3>}
              {section.subheading && <h4>{section.subheading}</h4>}
              {section.paragraph && <p>{section.paragraph}</p>}

              {section.list && section.list.length > 0 && (
                <ul className="modal-bullet-list">
                  {section.list.map((item, itemIdx) => (
                    <li key={`list-${itemIdx}`}>{item}</li>
                  ))}
                </ul>
              )}

              {section.media && section.media.length > 0 && (
                <div className="modal-section-media-grid">
                  {section.media.map((mediaUrl, mediaIdx) => (
                    <div
                      key={`sec-media-${mediaIdx}`}
                      className="inline-media-item"
                    >
                      <ProjectMedia value={mediaUrl} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>
    </dialog>
  );
}
