import React, { useEffect, useRef, useState, useCallback } from "react";
import MediaCarousel from "./MediaCarousel";
import displayMedia from "./functions/DisplayMedia";
import "../components/styles/projectModal.css";
import purifyString from "./functions/PurifyString";
import type { ProjectData } from "./types/ProjectTypes";
import type { Media } from "./types/MediaTypes";
import Lightbox, { type LightboxRefMethods } from "./Lightbox";

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

  const [activeLightboxMedia, setActiveLightboxMedia] = useState<Media | null>(
    () => {
      return modalData?.showcaseMedia?.[0] || null;
    },
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isOpen]);

  const handleSlideChange = useCallback((mediaObject: Media) => {
    setActiveLightboxMedia(mediaObject);
  }, []);

  const lightboxSlotContent = activeLightboxMedia ? (
    <div className="lightbox-zoom-target-wrapper">
      {displayMedia(activeLightboxMedia, "", true)}
    </div>
  ) : null;

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
                    lightboxRef={lightboxRef}
                    onSlideChange={handleSlideChange}
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
                                return (
                                  <React.Fragment
                                    key={media.id || combinedIndexToken}
                                  >
                                    {displayMedia(media, "project-media", true)}
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
                  aria-label="Close modal dialog"
                  autoFocus
                >
                  <span className="material-icons">close</span>
                </button>
              </div>
            );
          })()}

        <Lightbox
          lightboxRef={lightboxRef as React.RefObject<LightboxRefMethods>}
          contentSlot={lightboxSlotContent}
        />
      </dialog>
    </>
  );
}

export default ProjectModal;
