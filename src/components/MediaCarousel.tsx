import React, { useEffect, useState, useId, useRef } from "react";
import "./styles/mediaCarousel.css";
import useEmblaCarousel from "embla-carousel-react";
import type { Media } from "./types/MediaTypes";
import displayMedia from "./functions/DisplayMedia";
import "./styles/lightbox.css";
import LightboxButton from "./buttons/LightboxButton";
import type { LightboxRefMethods } from "./Lightbox";

export function MediaCarousel({
  srcArray,
  projectName,
  onSlideChange,
  lightboxRef,
}: {
  srcArray: Array<Media>;
  projectName: string;
  onSlideChange?: (currentMedia: Media) => void;
  lightboxRef?: React.RefObject<LightboxRefMethods | null>;
}) {
  const instanceId = useId();
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [caption, setCaption] = useState<string | undefined>("");

  const totalSlides = srcArray.length;

  const scrollTo = (index: number) => emblaApi?.scrollTo(index);
  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  useEffect(() => {
    if (!emblaApi) return;

    const handleSelect = () => {
      const activeIndex = emblaApi.selectedScrollSnap();
      const currentMediaItem = srcArray[activeIndex];

      setCurrentSlide(activeIndex);
      setCaption(currentMediaItem?.caption || undefined);

      if (onSlideChange && currentMediaItem) {
        onSlideChange(currentMediaItem);
      }
    };

    handleSelect();

    emblaApi.on("select", handleSelect);
    return () => {
      emblaApi.off("select", handleSelect);
    };
  }, [emblaApi, srcArray, onSlideChange]);

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
      <div className="carousel-viewport-container">
        <div className="carousel-bg-container">
          {[-1, 0, 1].map((offset) => {
            const index = (currentSlide + offset + totalSlides) % totalSlides;
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

              const shouldRender = [-1, 0, 1].some((offset) => {
                const computedIndex =
                  (currentSlide + offset + totalSlides) % totalSlides;
                return computedIndex === index;
              });

              return (
                <div
                  className="slide"
                  key={media.id || `${carouselKeyPrefix}-slide-${index}`}
                >
                  <React.Fragment key={media.id || slideContentToken}>
                    {shouldRender ? (
                      displayMedia(media, "", true)
                    ) : (
                      <div className="slide-unmounted-placeholder" />
                    )}
                  </React.Fragment>
                </div>
              );
            })}
          </div>
        </div>

        {showControls && (
          <div className="carousel-controls-container">
            <div className="carousel-indicators-container">
              {srcArray?.map((srcElement, index) =>
                !srcElement ? null : (
                  <button
                    className={
                      "carousel-indicator" +
                      (currentSlide === index ? " active" : " inactive")
                    }
                    onClick={() => scrollTo(index)}
                    key={`${carouselKeyPrefix}-indicator-${index}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ),
              )}
            </div>

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
            <div className="carousel-controls-spacer"></div>
            {!!caption && <div className="carousel-captions">{caption}</div>}
          </div>
        )}
      </div>
      {lightboxRef && <LightboxButton lightboxRef={lightboxRef} />}
    </div>
  );
}

export default MediaCarousel;
