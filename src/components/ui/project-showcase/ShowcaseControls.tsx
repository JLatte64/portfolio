import React from "react";
import "./ShowcaseControls.css";

interface ShowcaseControlsProps {
  sliderEmblaApiRef: React.RefObject<any>;
  activeIndex: number;
  totalSlides: number;
  children?: React.ReactNode;
}

export const ShowcaseControls = ({
  sliderEmblaApiRef,
  activeIndex,
  totalSlides,
  children,
}: ShowcaseControlsProps) => {
  const handlePrev = () => {
    if (sliderEmblaApiRef.current) sliderEmblaApiRef.current.scrollPrev();
  };

  const handleNext = () => {
    if (sliderEmblaApiRef.current) sliderEmblaApiRef.current.scrollNext();
  };

  const handleScrollTo = (idx: number) => {
    if (sliderEmblaApiRef.current) {
      const embla = sliderEmblaApiRef.current;

      // Calculate nearest loop sector for the 2-slide infinite loop scenario
      if (embla.slideNodes().length === 4) {
        const currentSnap = embla.selectedScrollSnap();
        const currentCycle = currentSnap >= 2 ? 2 : 0;
        embla.scrollTo(currentCycle + idx);
      } else {
        embla.scrollTo(idx);
      }
    }
  };

  const isControlDisabled = !sliderEmblaApiRef.current;

  return (
    <React.Fragment>
      <div className="carousel-dashboard-overlay">
        <button
          type="button"
          className="carousel-arrow-btn arrow-prev"
          disabled={isControlDisabled}
          onClick={handlePrev}
        >
          ⟨
        </button>
        <button
          type="button"
          className="carousel-arrow-btn arrow-next"
          disabled={isControlDisabled}
          onClick={handleNext}
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
                disabled={isControlDisabled}
                onClick={() => handleScrollTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          <div className="carousel-dashboard-extras-slot">{children}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ShowcaseControls;
