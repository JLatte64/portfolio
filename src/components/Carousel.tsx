import {useEffect, useState} from "react";
import "./styles/Carousel.css";
import useEmblaCarousel from "embla-carousel-react";

export function Carousel({srcArray}: {srcArray: Array<string>}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({loop: true});
  const [currentSlide, setCurrentSlide] = useState(0);

  const scrollTo = (index: number) => emblaApi?.scrollTo(index);
  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  useEffect(() => {
    emblaApi?.on("select", () => {
      setCurrentSlide(emblaApi.selectedScrollSnap());
    });
  });

  //

  return (
    <div className="carousel-container">
      <div className="carousel">
        <div className="carousel-viewport" ref={emblaRef}>
          <div className="slide-container">
            {srcArray.map((srcElement, index) => (
              <div className="slide" key={index}>
                <img
                  src={srcElement}
                  alt="Carousel Slide"
                  onClick={() => {
                    //setLightboxContents(srcElement);
                    //modalRef.current?.showModal();
                  }}
                />
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

export default Carousel;
