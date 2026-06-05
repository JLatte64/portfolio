import MediaCarousel from "./MediaCarousel";
import showMedia from "./showProjectMedia";
import "../components/styles/projectcard.css";
import "../components/styles/projectmedia.css";
import { useState, useRef } from "react";
import { projects } from "../data/projects.json";

export function ProjectCard({ index }: { index: number }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const project = projects && projects[index] ? projects[index] : null;

  const handleOpen = () => {
    dialogRef.current?.showModal();
    setIsOpen(true);
  };

  const handleClose = () => {
    dialogRef.current?.close();
    setIsOpen(false);
  };

  const handleNativeClose = () => {
    setIsOpen(false);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      handleClose();
    }
  };

  return (
    <div className="projectcard-container">
      <button className="projectcard" onClick={handleOpen}>
        <div className="card-thumbnail-container">
          <img
            src={projects[index].thumbnail.src}
            alt={projects[index].thumbnail.alt}
            className="card-thumbnail"
          ></img>
          <span className="card-title">{projects[index].title}</span>
        </div>
      </button>

      <dialog
        ref={dialogRef}
        onClose={handleNativeClose} // Fires automatically on ESC key or browser-driven close
        onClick={handleBackdropClick} // Fires when clicking the outer empty space
      >
        {/* Only mount deep sub-trees when isOpen is true */}
        {isOpen && project && (
          <div className="project-container">
            <div className="carousel-container">
              <h3 className="project-title">{project.title}</h3>
              <MediaCarousel srcArray={project.showcaseMedia} />
            </div>
            <div className="project-body">
              {project.bodySections.map((bodySection, secIndex) => (
                <div className="project-body-section" key={secIndex}>
                  <h4>{bodySection.sectionHeading}</h4>
                  <div className="media-container">
                    {bodySection.sectionMedia.map((media, mediaIndex) => (
                      <div key={mediaIndex}>{showMedia(media)}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button className="close-btn" onClick={handleClose}>
              Close
            </button>
          </div>
        )}
      </dialog>
    </div>
  );
}

export default ProjectCard;
