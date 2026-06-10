import MediaCarousel from "./MediaCarousel";
import displayMedia from "./DisplayMedia";
import "../components/styles/projectDialog.css";
import "../components/styles/projectMedia.css";
import { type RefObject } from "react";
import type { Project } from "./ProjectContentTypes";

export function ProjectModal({
  project,
  dialogRef,
  handleClose,
  isOpen,
}: {
  project?: Project;
  dialogRef: RefObject<HTMLDialogElement | null>;
  handleClose: () => void;
  isOpen: boolean;
}) {
  return (
    <dialog
      className="project-dialog"
      ref={dialogRef}
      onClose={handleClose} // Fires automatically on ESC key or browser-driven close
      onClick={(e: React.MouseEvent<HTMLDialogElement>) => {
        if (e.target === dialogRef?.current) {
          handleClose();
        }
      }} // Fires when clicking the outer empty space
    >
      {/* Only mount deep sub-trees when isOpen is true */}
      {isOpen && project && (
        <div className="project-container">
          <div className="carousel-title-container">
            <h3 className="project-title">{project?.title}</h3>
            <div className="carousel-container">
              <MediaCarousel srcArray={project?.showcaseMedia} />
            </div>
          </div>
          <div className="project-body">
            {project?.bodySections.map((bodySection, secIndex) => (
              <div className="project-body-section" key={secIndex}>
                <h4>{bodySection.sectionHeading}</h4>
                <div className="media-container">
                  {bodySection.sectionMedia.map((media, mediaIndex) => (
                    <div
                      key={secIndex * project?.bodySections.length + mediaIndex}
                    >
                      {displayMedia(media)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button
            className="button overlay-button project-close-button"
            onClick={handleClose}
          >
            <span className="material-icons">close</span>
          </button>
        </div>
      )}
    </dialog>
  );
}

export default ProjectModal;
