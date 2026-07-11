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
  const [isApiReady, setIsApiReady] = useState(false);

  // 💡 Polling check to handle when the ref changes from null to ready
  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    const checkAndBind = () => {
      const api = carouselRef.current;
      if (api && api.subscribeToChange) {
        unsubscribe = api.subscribeToChange((index: number) => {
          setLocalSelectedIndex(index);
        });
        setIsApiReady(true);
        return true;
      }
      return false;
    };

    // Try to bind instantly
    if (!checkAndBind()) {
      // If ref is not assigned yet, poll until it hooks up cleanly
      const interval = setInterval(() => {
        if (checkAndBind()) clearInterval(interval);
      }, 50);
      return () => {
        clearInterval(interval);
        if (unsubscribe) unsubscribe();
      };
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [carouselRef]);

  // Keyboard shortcut layout tracking setup
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
  if (!isApiReady || !api || length <= 0) return null;

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
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
        <div className="carousel-controls-actions-slot">{children}</div>
      </div>
    </div>
  );
}
