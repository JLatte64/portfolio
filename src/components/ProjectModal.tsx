import React, { type RefObject, useEffect, useRef } from "react";
import MediaCarousel from "./MediaCarousel";
import displayMedia from "./functions/DisplayMedia";
import "../components/styles/projectModal.css";
import purifyString from "./functions/PurifyString";
import type { ProjectData } from "./types/ProjectTypes";
import Lightbox, { type LightboxRefMethods } from "./Lightbox";
import LightboxButton from "./buttons/LightboxButton";
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
  const lightboxRef = useRef<LightboxRefMethods>(null);
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

  const handleDialogBackdropClick = (
    e: React.MouseEvent<HTMLDialogElement>,
  ) => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // 🚀 HIGH-PERFORMANCE BOUNDARY SAFETY CHECK:
    // Only execute a modal close action if the cursor physical coordinate matches the transparent backdrop mask area
    const rect = dialog.getBoundingClientRect();
    const isInDialog =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;

    if (!isInDialog) {
      handleClose();
    }
  };

  /* 🚀 UNIQUE IDENTIFIER: Formulates a strictly unique ID string for this specific project instance */
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
        onClick={
          handleDialogBackdropClick
        } /* 🚀 Wired securely up to your clean safety function */
      >
        {modalData && (
          <div className="project-container">
            <div className="carousel-container" ref={carouselWrapperRef}>
              <MediaCarousel
                srcArray={modalData.showcaseMedia ?? []}
                projectName={projectSlug}
                lightboxRef={lightboxRef as React.RefObject<LightboxRefMethods>}
              />
            </div>
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
                          const isLightboxed = media.enableLightbox === "true";
                          const displayedMedia = displayMedia(
                            media,
                            `project-media ${isLightboxed ? "lightboxed" : ""}`.trim(),
                            true,
                          );
                          return (
                            <React.Fragment key={media.id}>
                              {displayedMedia}
                              {isLightboxed && (
                                <LightboxButton
                                  lightboxRef={
                                    lightboxRef as RefObject<LightboxRefMethods>
                                  }
                                  className="media-anchored"
                                  onClick={() => {
                                    lightboxRef.current?.setContent(media);
                                  }}
                                />
                              )}
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
              className="button overlay-button project-close-button"
              onClick={handleClose}
              aria-label="Close project modal dialog"
            >
              <span className="material-icons" aria-hidden="true">
                close
              </span>
            </button>
          </div>
        )}
        <Lightbox
          lightboxRef={lightboxRef as React.RefObject<LightboxRefMethods>}
        />
      </dialog>
    </>
  );
}

export default ProjectModal;
