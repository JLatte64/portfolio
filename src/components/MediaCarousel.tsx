import { useEffect, useState } from "react";
import "./styles/mediaCarousel.css";
import useEmblaCarousel from "embla-carousel-react";
import type { Media } from "./types/MediaTypes";
import showMedia from "./functions/DisplayMedia";

export function MediaCarousel({ srcArray }: { srcArray: Array<Media> }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });
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
      <div className="carousel-viewport-buttons-container">
        <div className="carousel-viewport" ref={emblaRef}>
          <div className="slides-container">
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
