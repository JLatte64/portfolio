import React, { type RefObject, useEffect, useRef } from "react";
import MediaCarousel from "./MediaCarousel";
import displayMedia from "./functions/DisplayMedia";
import "../components/styles/projectModal.css";
import purifyString from "./functions/PurifyString";
import type { ProjectData } from "./types/ProjectTypes";
import { useSlugs } from "../context/SlugContext";
import ProjectTitleBar from "./ProjectTitleBar";

interface ProjectModalProps {
  modalData?: ProjectData | undefined;
  handleClose: () => void;
  isOpen: boolean;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
}

export function ProjectModal({
  modalData,
  handleClose,
  isOpen,
  dialogRef,
}: ProjectModalProps) {
  const carouselWrapperRef = useRef<HTMLDivElement>(null);
  const { titleToSlug } = useSlugs();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isOpen, dialogRef]);

  const projectSlug = modalData
    ? titleToSlug[modalData.title] || "project"
    : "project";
  const purifiedTitleStr = modalData
    ? (purifyString(modalData.title) as string)
    : "";
  const uniqueTitleId = `${projectSlug}-modal-title`;

  return (
    <>
      <dialog
        className="project-dialog"
        ref={dialogRef as React.RefObject<HTMLDialogElement>}
        role="dialog"
        aria-modal="true"
        aria-labelledby={uniqueTitleId}
        onClose={() => {
          if (isOpen) handleClose();
        }}
        onClick={(e: React.MouseEvent<HTMLDialogElement>) => {
          if (e.target === dialogRef?.current) {
            handleClose();
          }
        }}
      >
        {modalData && (
          <div className="project-container">
            {/* LEFT COLUMN: Visual Presentation Deck Container */}
            <div className="carousel-container" ref={carouselWrapperRef}>
              <MediaCarousel
                srcArray={modalData.showcaseMedia ?? []}
                projectName={projectSlug}
              />
            </div>

            {/* RIGHT COLUMN: Semantic Independent Scroll Panel Landmark */}
            <article
              className="project-body-container"
              aria-label={`${purifiedTitleStr} project logs`}
            >
              <div id={uniqueTitleId}>
                <ProjectTitleBar projModalData={modalData} />
              </div>

              <div className="project-body-sections-container">
                {(modalData.bodySections ?? []).map((bodySection) => {
                  const uniqueSectionHeadingId = `${bodySection.id}-heading`;

                  return (
                    <section
                      className="project-body-section-container"
                      key={bodySection.id}
                      aria-labelledby={uniqueSectionHeadingId}
                    >
                      <h3
                        id={uniqueSectionHeadingId}
                        className="project-body-section-heading"
                      >
                        {purifyString(bodySection.sectionHeading)}
                      </h3>

                      <div className="project-body-media-container">
                        {(bodySection.sectionMedia ?? []).map((media) => {
                          return (
                            <React.Fragment key={media.id}>
                              {displayMedia(media, "project-media", true)}
                            </React.Fragment>
                          );
                        })}
                      </div>
                    </section>
                  );
                })}
              </div>
            </article>

            <button
              className="button project-close-button"
              onClick={handleClose}
              aria-label="Close project modal dialog"
            >
              <span className="material-icons" aria-hidden="true">
                close
              </span>
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}

export default ProjectModal;
