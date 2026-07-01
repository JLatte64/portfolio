import {useId} from "react";

export interface CustomInputHandle {
  focus: () => void;
  clear: () => void;
}

interface ShowcaseControlProps {
  currentIndex: number;
  totalSlides: number;
  onNavigate: (index?: number) => void;
}

export default function ShowcaseControls({
  currentIndex,
  totalSlides,
  onNavigate,
}: ShowcaseControlProps) {
  const slidesArray = Array.from({length: totalSlides});

  return (
    <div className="showcase-controls-container">
      <header
        className="showcase-dots-container"
        role="tablist"
        aria-label="Select specific showcase slide"
      >
        {slidesArray.length > 0 &&
          slidesArray.map((srcElement, index) =>
            !srcElement ? null : (
              <button
                type="button"
                role="tab"
                className={
                  "showcase-dot" +
                  (currentIndex === index ? " active" : " inactive")
                }
                onClick={() => onNavigate(index)}
                key={`${useId}-indicator-${index}`}
                aria-selected={currentIndex === index}
                aria-label={`Go to slide ${index + 1}`}
              />
            ),
          )}
      </header>

      <button
        type="button"
        className="material-icons nav-button left"
        onClick={() => onNavigate(currentIndex - (1 % totalSlides))}
        aria-label="Previous slide"
      >
        chevron_left
      </button>
      <button
        type="button"
        className="material-icons nav-button right"
        onClick={() => onNavigate(currentIndex + (1 % totalSlides))}
        aria-label="Next slide"
      >
        chevron_right
      </button>
      <footer></footer>
    </div>
  );
}
