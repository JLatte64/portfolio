import MediaCarousel from "./MediaCarousel";
import displayMedia from "./functions/DisplayMedia";
import "../components/styles/projectModal.css";
import "../components/styles/projectMedia.css";
import { type RefObject } from "react";
import purifyString from "./functions/PurifyString";
import type { ProjectData } from "./types/ProjectTypes";

interface ProjectModalProps {
  modalData?: ProjectData | undefined;
  dialogRef: RefObject<HTMLDialogElement | null>;
  handleClose: () => void;
  isOpen: boolean;
}

export function ProjectModal({
  modalData,
  dialogRef,
  handleClose,
  isOpen,
}: ProjectModalProps) {
  return (
    <dialog
      className="project-dialog"
      ref={dialogRef}
      onClose={() => {
        if (isOpen) handleClose();
      }}
      onClick={(e: React.MouseEvent<HTMLDialogElement>) => {
        if (e.target === dialogRef?.current) {
          handleClose();
        }
      }}
    >
      {isOpen && modalData && (
        <div className="project-container">
          <div className="carousel-title-container">
            <h3 className="project-title">{purifyString(modalData.title)}</h3>
            <div className="carousel-container">
              <MediaCarousel srcArray={modalData.showcaseMedia ?? []} />
            </div>
          </div>
          <div className="project-body">
            {(modalData.bodySections ?? []).map((bodySection, secIndex) => (
              <div className="project-body-section" key={secIndex}>
                <h4 className="project-body-section-heading">
                  {purifyString(bodySection.sectionHeading)}
                </h4>

                {(bodySection.sectionMedia ?? []).map((media, mediaIndex) => (
                  <div
                    className="pj-body-media-container"
                    key={`${secIndex}-${mediaIndex}`}
                  >
                    <div>{displayMedia(media)}</div>
                  </div>
                ))}
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
