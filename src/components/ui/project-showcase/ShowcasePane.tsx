import React, { useEffect, useRef, useState } from "react";
import "./ShowcaseLightbox.css";
import "./ShowcaseControls.css";
import MediaCaption from "../MediaCaption";
import type { ProjectData } from "../../../types/portfolioTypes";
import MemoMediaWrapper from "../RenderMedia";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import ShowcaseSlider from "./ShowcaseSlider";

interface ShowcasePaneProps {
  projectData: ProjectData;
}

export const ShowcasePane = ({ projectData }: ShowcasePaneProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isCaptionActive, setIsCaptionActive] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDownCapture = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopImmediatePropagation();
        setIsLightboxOpen(false);
      }
    };

    const prevActive = document.activeElement as HTMLElement;
    overlayRef.current?.focus();
    window.addEventListener("keydown", handleKeyDownCapture, { capture: true });

    return () => {
      window.removeEventListener("keydown", handleKeyDownCapture, {
        capture: true,
      });
      prevActive?.focus();
    };
  }, [isLightboxOpen]);

  const onSlideChange = (targetIndex: number) => {
    setActiveIndex(targetIndex);
  };

  if (!projectData || !projectData.carouselMedia?.length) return null;

  const totalSlides = projectData.carouselMedia.length;
  const activeMedia = projectData.carouselMedia[activeIndex];
  const isImage = activeMedia.type === "image";

  const baseAssetContent = (
    <MemoMediaWrapper
      item={{
        src: activeMedia.src,
        type: activeMedia.type,
        caption: activeMedia.caption ?? "",
      }}
      shouldLazyLoad={true}
    />
  );

  return (
    <section
      className="pane-left-carousel"
      data-lightbox-active={isLightboxOpen || undefined}
    >
      {isLightboxOpen && (
        <div
          ref={overlayRef}
          className={`lightbox-overlay-fullscreen is-open`}
          role="dialog"
          aria-modal="true"
          aria-label={`Expanded Lightbox Viewport Display: Slide item number ${activeIndex + 1}`}
          tabIndex={-1}
          onClick={(e) =>
            e.target === overlayRef.current && setIsLightboxOpen(false)
          }
        >
          <div className="lightbox-viewport-window" role="document">
            {isImage ? (
              <TransformWrapper
                key={activeMedia.src}
                initialScale={1}
                minScale={1}
                maxScale={3}
              >
                <TransformComponent
                  wrapperStyle={{ width: "100%", height: "100%" }}
                >
                  {baseAssetContent}
                </TransformComponent>
              </TransformWrapper>
            ) : (
              baseAssetContent
            )}
          </div>
        </div>
      )}
      {!isLightboxOpen && (
        <ShowcaseSlider
          mediaList={projectData.carouselMedia}
          activeIndex={activeIndex}
          onSlideChange={onSlideChange}
        />
      )}
      <React.Fragment>
        <div className="carousel-dashboard-overlay">
          <button
            type="button"
            className="carousel-arrow-btn arrow-prev"
            onClick={() =>
              onSlideChange(
                activeIndex === 0 ? totalSlides - 1 : activeIndex - 1,
              )
            }
          >
            ⟨
          </button>
          <button
            type="button"
            className="carousel-arrow-btn arrow-next"
            onClick={() =>
              onSlideChange(
                activeIndex === totalSlides - 1 ? 0 : activeIndex + 1,
              )
            }
          >
            ⟩
          </button>
        </div>

        <div className="carousel-dashboard-bar">
          <div className="dashboard-row-layout">
            <div className="carousel-dots-wrapper">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={`dot-${idx}`}
                  type="button"
                  className={`indicator-dot ${idx === activeIndex ? "is-active" : ""}`}
                  onClick={() => onSlideChange(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <div className="carousel-dashboard-extras-slot">
              <button
                type="button"
                onClick={() => setIsCaptionActive(!isCaptionActive)}
              >
                {isCaptionActive ? "CC // Off" : "CC // On"}
              </button>

              <button
                type="button"
                onClick={() => setIsLightboxOpen((prev) => !prev)}
              >
                {isLightboxOpen ? "✕" : "🔍"}
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
      {isCaptionActive && (
        <MediaCaption
          activeIndex={activeIndex}
          mediaList={projectData.carouselMedia}
        />
      )}
    </section>
  );
};

export default ShowcasePane;
