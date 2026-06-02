import { useEffect, useState } from "react";
import "./styles/MediaCarousel.css";
import useEmblaCarousel from "embla-carousel-react";
import type { Media } from "./ProjectContentTypes";
import showMedia from "./showProjectMedia";

export function MediaCarousel({ srcArray }: { srcArray: Array<Media> }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [currentSlide, setCurrentSlide] = useState(0);

  const scrollTo = (index: number) => emblaApi?.scrollTo(index);
  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  useEffect(() => {
    emblaApi?.on("select", () => {
      setCurrentSlide(emblaApi.selectedScrollSnap());
    });
  });

  return (
    <div className="carousel">
      <div className="carousel-viewport-container">
        <div className="carousel-viewport" ref={emblaRef}>
          <div className="slide-container">
            {srcArray.map((media, index) => (
              <div className="slide" key={index}>
                {showMedia(media)}
              </div>
            ))}
          </div>
        </div>
        <div className="carousel-buttons-container">
          <button
            className="material-icons carousel-button left"
            onClick={scrollPrev}
          >
            chevron_left
          </button>
          <button
            className="material-icons carousel-button right"
            onClick={scrollNext}
          >
            chevron_right
          </button>
        </div>
      </div>
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
              key={index}
            />
          ),
        )}
      </div>
    </div>
  );
}

export default MediaCarousel;
