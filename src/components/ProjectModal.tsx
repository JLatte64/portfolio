import React, {useEffect, useRef} from "react";
import MediaCarousel from "./MediaCarousel";
import displayMedia from "./functions/DisplayMedia";
import "../components/styles/projectModal.css";
import purifyString from "./functions/PurifyString";
import type {ProjectData} from "./types/ProjectTypes";
import {useSlugs} from "../context/SlugContext";
import {handleCopyLink} from "./functions/HandleCopyLink";
import DisplayMedia from "./functions/DisplayMedia";

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
  const {titleToSlug} = useSlugs();

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
    <dialog
      className={`${projectSlug} proj-modal`}
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
        <div className="proj-container">
          {/* -------- MAIN TITLE HEADER --------- */}

          <div className="proj-panes-container">
            {/* -------- SHOWCASE PANE - LIGHTBOX / CAROUSEL --------- */}
            <div
              className="proj-pane showcase"
              role="region"
              aria-label="Project Media Preview"
            >
              <MediaCarousel
                srcArray={modalData.showcaseMedia ?? []}
                projectName={projectSlug}
              />
            </div>
            {/* -------- DETAILS PANE - BODY PARAGRAPHS / MEDIA --------- */}
            <div
              className="proj-pane details"
              aria-label={`${purifiedTitleStr} project details`}
              id={`${purifiedTitleStr}-details`}
              role="region"
            >
              {(modalData.bodySections ?? []).map((bodySection) => {
                const uniqueSectionHeadingId = `${bodySection.id}-heading`;

                return (
                  <section
                    key={bodySection.id}
                    aria-labelledby={uniqueSectionHeadingId}
                  >
                    <header>
                      <h2 id={uniqueSectionHeadingId}>
                        {purifyString(bodySection.sectionHeading)}
                      </h2>
                    </header>
                    {(bodySection.sectionMedia ?? []).map((media) => {
                      return (
                        <React.Fragment key={media.id}>
                          <DisplayMedia
                            media={media}
                            className="proj-media"
                            shouldLazyLoad={true}
                          />
                        </React.Fragment>
                      );
                    })}
                  </section>
                );
              })}
            </div>
          </div>
          <header id={uniqueTitleId} className="proj-header">
            <button
              type="button"
              className="proj-back-btn"
              onClick={handleClose}
              aria-label="Close project modal dialog"
            >
              <span className="material-icons" aria-hidden="true">
                chevron_left
              </span>
            </button>

            <h1 className="proj-heading">
              {purifiedTitleStr}

              <button
                type="button"
                className="proj-link-copy-btn"
                onClick={() => {
                  handleCopyLink({link: projectSlug});
                }}
                aria-label={`Copy shareable link for ${purifiedTitleStr} project`}
              >
                <span
                  className="material-icons link-icon-span"
                  aria-hidden="true"
                >
                  link
                </span>
              </button>
            </h1>
          </header>
        </div>
      )}
    </dialog>
  );
}

export default ProjectModal;
