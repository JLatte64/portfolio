import React, { useEffect, useState, useId, useRef } from "react"; // Imported React for Fragment usage
import "./styles/mediaCarousel.css";
import useEmblaCarousel from "embla-carousel-react";
import type { Media } from "./types/MediaTypes";
import displayMedia from "./functions/DisplayMedia";

export function MediaCarousel({
  srcArray,
  projectName,
}: {
  srcArray: Array<Media>;
  projectName: string;
}) {
  const instanceId = useId();
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });
  const [currentSlide, setCurrentSlide] = useState(0);

  const scrollTo = (index: number) => emblaApi?.scrollTo(index);
  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  useEffect(() => {
    if (!emblaApi) return;

    const handleSelect = () => {
      setCurrentSlide(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", handleSelect);

    return () => {
      emblaApi.off("select", handleSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!carouselContainerRef.current?.contains(document.activeElement)) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        emblaApi.scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        emblaApi.scrollNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [emblaApi]);

  const cleanProjectName = (projectName ?? "project")
    .replace(/\s+/g, "-")
    .toLowerCase();
  const carouselKeyPrefix = `${cleanProjectName}-${instanceId}`;
  const showControls = srcArray && srcArray.length > 1;

  return (
    <div
      className="carousel"
      ref={carouselContainerRef}
      tabIndex={0}
      aria-label={`${projectName ?? "Media"} gallery carousel`}
    >
      <div className="carousel-viewport-buttons-container">
        <div className="carousel-bg-container">
          {[-1, 0, 1].map((offset) => {
            const index =
              (currentSlide + offset + srcArray.length) % srcArray.length;
            return (
              <React.Fragment key={`${projectName}-carousel-bg-${index}`}>
                {displayMedia(
                  srcArray[index],
                  `carousel-bg-fade-image${index === currentSlide ? " active" : ""}`,
                  true,
                )}
              </React.Fragment>
            );
          })}
        </div>
        <div className="carousel-viewport" ref={emblaRef}>
          <div className="slides-container">
            {srcArray.map((media, index) => {
              const slideContentToken = `${carouselKeyPrefix}-slide-item-${index}`;
              return (
                <div
                  className="slide"
                  key={media.id || `${carouselKeyPrefix}-slide-${index}`}
                >
                  <React.Fragment key={media.id || slideContentToken}>
                    {displayMedia(media, "")}
                  </React.Fragment>
                </div>
              );
            })}
          </div>
        </div>
        {showControls && (
          <>
            <div className="carousel-nav-buttons-container">
              <button
                className="material-icons carousel-nav-button left"
                onClick={scrollPrev}
                aria-label="Previous slide"
              >
                chevron_left
              </button>
              <button
                className="material-icons carousel-nav-button right"
                onClick={scrollNext}
                aria-label="Next slide"
              >
                chevron_right
              </button>
            </div>
          </>
        )}
      </div>
      {showControls && (
        <div className="carousel-lightbox-indicators-container">
          <div className="carousel-indicators-container">
            {srcArray?.map((srcElement, index) =>
              !srcElement ? null : (
                <button
                  className={
                    "carousel-indicator" +
                    (currentSlide === index ? " active" : " inactive")
                  }
                  onClick={() => {
                    scrollTo(index);
                  }}
                  key={`${carouselKeyPrefix}-indicator-${index}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ),
            )}
          </div>
          <button
            className="material-icons carousel-lightbox-button"
            onClick={() => {}}
            aria-label="Enlarge"
          >
            fit_screen
          </button>
        </div>
      )}
    </div>
  );
}

export default MediaCarousel;
