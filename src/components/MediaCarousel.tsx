import React, {useEffect, useState, useId, useRef} from "react";
import "./styles/mediaCarousel.css";
import useEmblaCarousel from "embla-carousel-react";
import type {Media} from "./types/MediaTypes";
import DisplayMedia from "./functions/DisplayMedia";

export function MediaCarousel({
  srcArray,
  projectName,
  lightboxRef,
}: {
  srcArray: Array<Media>;
  projectName: string;
  lightboxRef?: React.RefObject<any>;
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
      setCurrentSlide(activeIndex);
      setCaption(srcArray[activeIndex]?.caption || undefined);
    };

    handleSelect();

    emblaApi.on("select", handleSelect);
    return () => {
      emblaApi.off("select", handleSelect);
    };
  }, [emblaApi, srcArray]);

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

  const carouselKeyPrefix = `${projectName}-${instanceId}`;
  const showControls = srcArray && srcArray.length > 1;

  return (
    <div
      className="carousel"
      ref={carouselContainerRef}
      tabIndex={0}
      aria-label={`${projectName} gallery carousel`}
    >
      <div className="carousel-viewport-container">
        <div className="carousel-bg-container" aria-hidden="true">
          {[-1, 0, 1].map((offset) => {
            const index = (currentSlide + offset + totalSlides) % totalSlides;
            return (
              <React.Fragment key={`${projectName}-carousel-bg-${index}`}>
                <DisplayMedia
                  media={srcArray[index]}
                  className={`carousel-bg-fade-image ${index === currentSlide ? "active" : ""}`}
                  shouldLazyLoad={true}
                />
              </React.Fragment>
            );
          })}
        </div>

        <div className="carousel-viewport" ref={emblaRef}>
          <ul className="slides-container">
            {srcArray.map((media, index) => {
              const slideContentToken = `${carouselKeyPrefix}-slide-item-${index}`;

              const shouldRender = [-1, 0, 1].some((offset) => {
                const computedIndex =
                  (currentSlide + offset + totalSlides) % totalSlides;
                return computedIndex === index;
              });

              return (
                <li
                  className="slide"
                  key={media.id || `${carouselKeyPrefix}-slide-${index}`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Slide ${index + 1} of ${totalSlides}`}
                  aria-hidden={index !== currentSlide}
                >
                  <React.Fragment key={media.id || slideContentToken}>
                    {shouldRender ? (
                      <DisplayMedia media={media} shouldLazyLoad={true} />
                    ) : (
                      <div className="slide-unmounted-placeholder" />
                    )}
                  </React.Fragment>
                </li>
              );
            })}
          </ul>
        </div>

        {showControls && (
          <div className="carousel-controls-container">
            <div
              className="carousel-indicators-container"
              role="tablist"
              aria-label="Select specific gallery image slide showcase"
            >
              {srcArray?.map((srcElement, index) =>
                !srcElement ? null : (
                  <button
                    type="button"
                    role="tab"
                    className={
                      "carousel-indicator" +
                      (currentSlide === index ? " active" : " inactive")
                    }
                    onClick={() => scrollTo(index)}
                    key={`${carouselKeyPrefix}-indicator-${index}`}
                    aria-selected={currentSlide === index}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ),
              )}
            </div>

            <button
              type="button"
              className="material-icons carousel-nav-button left"
              onClick={scrollPrev}
              aria-label="Previous slide"
            >
              chevron_left
            </button>
            <button
              type="button"
              className="material-icons carousel-nav-button right"
              onClick={scrollNext}
              aria-label="Next slide"
            >
              chevron_right
            </button>
            {lightboxRef && (
              <div style={{display: "none"}} aria-hidden="true" />
            )}
            {!!caption && <div className="carousel-captions">{caption}</div>}
          </div>
        )}
      </div>
    </div>
  );
}

export default MediaCarousel;
