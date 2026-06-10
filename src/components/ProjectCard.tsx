import MediaCarousel from "./MediaCarousel";
import showMedia from "./ShowProjectMedia";
import "../components/styles/projectCard.css";
import "../components/styles/projectDialog.css";
import "../components/styles/projectMedia.css";
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
        <img
          src={projects[index].thumbnail.src}
          alt={projects[index].thumbnail.alt}
          className="projectcard-thumbnail"
        ></img>
        <span className="projectcard-title">{projects[index].title}</span>
      </button>

      <dialog
        className="project-dialog"
        ref={dialogRef}
        onClose={handleNativeClose} // Fires automatically on ESC key or browser-driven close
        onClick={handleBackdropClick} // Fires when clicking the outer empty space
      >
        {/* Only mount deep sub-trees when isOpen is true */}
        {isOpen && project && (
          <div className="project-container">
            <div className="carousel-title-container">
              <h3 className="project-title">{project.title}</h3>
              <div className="carousel-container">
                <MediaCarousel srcArray={project.showcaseMedia} />
              </div>
            </div>
            <div className="project-body">
              {project.bodySections.map((bodySection, secIndex) => (
                <div className="project-body-section" key={secIndex}>
                  <h4>{bodySection.sectionHeading}</h4>
                  <div className="media-container">
                    {bodySection.sectionMedia.map((media, mediaIndex) => (
                      <div
                        key={
                          secIndex * project.bodySections.length + mediaIndex
                        }
                      >
                        {showMedia(media)}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button className="project-close-button" onClick={handleClose}>
              <span className="material-icons">close</span>
            </button>
          </div>
        )}
      </dialog>
    </div>
  );
}

export default ProjectCard;
