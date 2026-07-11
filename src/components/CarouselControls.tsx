import { useEffect, useState } from "react";
import "./CarouselControls.css";

interface CarouselControlsProps {
  readonly length: number;
  readonly carouselRef: React.RefObject<any>;
  readonly children?: React.ReactNode;
}

export default function CarouselControls({
  length,
  carouselRef,
  children,
}: CarouselControlsProps) {
  const [localSelectedIndex, setLocalSelectedIndex] = useState<number>(0);

  useEffect(() => {
    const api = carouselRef.current;
    if (!api || !api.onSlideChange) return;

    // 💡 DIRECT ASSIGNMENT LINK:
    // This connects our local state modifier directly to the ref's exposed method.
    // It captures index shifts from manual swipes and arrow clicks instantly.
    api.onSlideChange((index: number) => {
      setLocalSelectedIndex(index);
    });

    // Capture the initial state configuration index upon assembly mount
    if (typeof api.selectedIndex === "number") {
      setLocalSelectedIndex(api.selectedIndex);
    }
  }, [carouselRef, carouselRef.current]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (activeEl?.tagName === "INPUT" || activeEl?.tagName === "TEXTAREA")
        return;
      const api = carouselRef.current;
      if (!api) return;

      if (event.key === "ArrowRight") {
        event.preventDefault();
        api.scrollNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        api.scrollPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [carouselRef]);

  const api = carouselRef.current;
  if (!api || length <= 0) return null;

  const isCaptionDisabled = !api.activeMedia?.captionElement;

  return (
    <div className="carousel-controls-bar">
      <div className="controls-row-layout">
        <button
          type="button"
          className="control-btn"
          disabled={isCaptionDisabled}
        >
          📝 Text
        </button>
        <div className="carousel-dots-indicator">
          {Array.from({ length }).map((_, idx) => (
            <button
              key={`dot-${idx}`}
              type="button"
              className={`indicator-dot ${idx === localSelectedIndex ? "is-active" : ""}`}
              onClick={() => {
                setLocalSelectedIndex(idx);
                api.scrollTo(idx);
              }}
            />
          ))}
        </div>
        <div className="carousel-controls-actions-slot">{children}</div>
      </div>
    </div>
  );
}
