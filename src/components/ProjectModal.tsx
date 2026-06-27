import React, { type RefObject, useEffect, useRef } from "react";
import MediaCarousel from "./MediaCarousel";
import displayMedia from "./functions/DisplayMedia";
import "../components/styles/projectModal.css";
import purifyString from "./functions/PurifyString";
import type { ProjectData } from "./types/ProjectTypes";
import Lightbox, { type LightboxRefMethods } from "./Lightbox";
import LightboxButton from "./buttons/LightboxButton";

interface ProjectModalProps {
  modalData?: ProjectData | undefined;
  handleClose: () => void;
  isOpen: boolean;
}

export function ProjectModal({
  modalData,
  handleClose,
  isOpen,
}: ProjectModalProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const lightboxRef = useRef<LightboxRefMethods>(null);
  const carouselWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isOpen]);

  return (
    <>
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
        {modalData &&
          (() => {
            const cleanProjectName =
              (purifyString(modalData.title) as string)
                ?.toLowerCase()
                ?.replace(/[^a-z0-9\s-]/g, "")
                ?.replace(/\s+/g, "-") || "project";
            return (
              <div className="project-container">
                <div className="carousel-container" ref={carouselWrapperRef}>
                  <MediaCarousel
                    srcArray={modalData.showcaseMedia ?? []}
                    projectName={cleanProjectName}
                    lightboxRef={
                      lightboxRef as React.RefObject<LightboxRefMethods>
                    }
                  />
                </div>
                <div className="project-body-container">
                  <h3 className="project-title">
                    {purifyString(modalData.title)}
                  </h3>
                  <div className="project-body-sections-container">
                    {(modalData.bodySections ?? []).map(
                      (bodySection, secIndex) => (
                        <div
                          className="project-body-section-container"
                          key={
                            bodySection.id ||
                            `${cleanProjectName}-section-block-${secIndex}`
                          }
                        >
                          <h4 className="project-body-section-heading">
                            {purifyString(bodySection.sectionHeading)}
                          </h4>
                          <div className="project-body-media-container">
                            {(bodySection.sectionMedia ?? []).map(
                              (media, mediaIndex) => {
                                const combinedIndexToken = `${cleanProjectName}-${secIndex}-${mediaIndex}`;
                                const displayedMedia = displayMedia(
                                  media,
                                  "project-media",
                                  true,
                                );
                                if (
                                  media.mediaType === "video" ||
                                  media.mediaType === "image"
                                )
                                  return (
                                    <div
                                      className="lightbox-trigger-wrapper"
                                      key={media.id || combinedIndexToken}
                                    >
                                      {displayedMedia}
                                      <LightboxButton
                                        lightboxRef={
                                          lightboxRef as RefObject<LightboxRefMethods>
                                        }
                                        className="wrapper"
                                        onClick={() => {
                                          lightboxRef.current?.setContent(
                                            media,
                                          );
                                        }}
                                      />
                                    </div>
                                  );
                                else
                                  return (
                                    <React.Fragment
                                      key={media.id || combinedIndexToken}
                                    >
                                      {displayedMedia}
                                    </React.Fragment>
                                  );
                              },
                            )}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
                <button
                  className="button overlay-button project-close-button"
                  onClick={handleClose}
                  aria-label="Close project modal dialog"
                >
                  <span className="material-icons">close</span>
                </button>
              </div>
            );
          })()}
        <Lightbox
          lightboxRef={lightboxRef as React.RefObject<LightboxRefMethods>}
        />
      </dialog>
    </>
  );
}

export default ProjectModal;
