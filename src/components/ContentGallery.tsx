import { useEffect, useRef, useState } from "react";
import "./styles/ContentGallery.css";
import useEmblaCarousel from "embla-carousel-react";

export function ContentGallery({ srcArray }: { srcArray: Array<string> }) {
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

  const [lightboxContents, setLightboxContents] = useState("");
  const modalRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <div className="embla">
        <button className="embla__prev" onClick={scrollPrev}>
          <span className="material-icons">chevron_left</span>
        </button>
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {srcArray.map((srcElement, index) => (
              <div className="embla__slide" key={index}>
                <img
                  src={srcElement}
                  alt="Gallery Slide"
                  onClick={() => {
                    setLightboxContents(srcElement);
                    modalRef.current?.showModal();
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <button className="embla__next" onClick={scrollNext}>
          <span className="material-icons">chevron_right</span>
        </button>
      </div>

      <div className="gallery-buttons">
        {srcArray?.map((srcElement, index) =>
          !srcElement ? null : (
            <button
              className={
                "gallery-button " +
                (currentSlide === index ? "active" : "inactive")
              }
              onClick={() => {
                scrollTo(index);
                console.log("slide button clicked!");
              }}
              key={index}
            />
          ),
        )}
      </div>
      <div>
        <dialog
          className="lightbox-container"
          ref={modalRef}
          onClick={() => modalRef.current?.close()}
        >
          <div className="lightbox" onClick={(e) => e.stopPropagation()}>
            <img src={lightboxContents} alt="Lightbox Content" />
            <button
              className="embla__sideArrow embla__prev"
              onClick={() => {
                scrollPrev();
                setLightboxContents(
                  srcArray[(currentSlide - 1) % srcArray.length],
                );
              }}
            >
              <span className="material-icons">chevron_left</span>
            </button>
            <button
              className="embla__sideArrow embla__next"
              onClick={() => {
                scrollNext();
                setLightboxContents(
                  srcArray[(currentSlide + 1) % srcArray.length],
                );
              }}
            >
              <span className="material-icons">chevron_right</span>
            </button>
          </div>

          <button
            className="embla__close"
            onClick={() => modalRef.current?.close()}
          >
            Close
          </button>
        </dialog>
      </div>
    </>
  );
}

export default ContentGallery;
