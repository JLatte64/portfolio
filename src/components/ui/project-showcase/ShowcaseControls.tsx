import React from "react";
import "./ShowcaseControls.css";

interface ShowcaseControlsProps {
  activeIndex: number;
  totalSlides: number;
  onSlideChange: (idx: number) => void;
  children?: React.ReactNode;
}

export const ShowcaseControls = ({
  activeIndex,
  totalSlides,
  onSlideChange,
  children,
}: ShowcaseControlsProps) => {
  return (
    <React.Fragment>
      <div className="carousel-dashboard-overlay">
        {/* Previous Button: Calculates index wrap-around inline */}
        <button
          type="button"
          className="carousel-arrow-btn arrow-prev"
          onClick={() =>
            onSlideChange(activeIndex === 0 ? totalSlides - 1 : activeIndex - 1)
          }
        >
          ⟨
        </button>
        {/* Next Button: Calculates index wrap-around inline */}
        <button
          type="button"
          className="carousel-arrow-btn arrow-next"
          onClick={() =>
            onSlideChange(activeIndex === totalSlides - 1 ? 0 : activeIndex + 1)
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
          <div className="carousel-dashboard-extras-slot">{children}</div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default ShowcaseControls;
