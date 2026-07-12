import React, { useEffect, useState } from "react";
import "./CarouselDashboard.css";

export default function CarouselDashboard({
  length,
  carouselRef,
  children,
}: {
  length: number;
  carouselRef: React.RefObject<any>;
  children?: React.ReactNode;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [api, setApi] = useState<any>(null);

  useEffect(() => {
    const activeRef = carouselRef.current;
    if (!activeRef) return;

    const unInit = activeRef.onInit?.((embla: any) => setApi(embla));
    const unSlide = activeRef.onSlideChange?.((idx: number) =>
      setSelectedIndex(idx),
    );

    return () => {
      unInit?.();
      unSlide?.();
    };
  }, [carouselRef, carouselRef.current]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!api || !api.rootNode?.().contains(document.activeElement)) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        api.scrollNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        api.scrollPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [api]);

  if (length <= 0) return null;

  return (
    <React.Fragment>
      <div className="carousel-dashboard-overlay">
        <button
          type="button"
          className="carousel-arrow-btn arrow-prev"
          disabled={!api}
          onClick={() => api?.scrollPrev()}
        >
          ⟨
        </button>
        <button
          type="button"
          className="carousel-arrow-btn arrow-next"
          disabled={!api}
          onClick={() => api?.scrollNext()}
        >
          ⟩
        </button>
      </div>
      <div className="carousel-dashboard-bar">
        <div className="dashboard-row-layout">
          <div className="carousel-dots-wrapper">
            {Array.from({ length }).map((_, idx) => (
              <button
                key={`dot-${idx}`}
                type="button"
                className={`indicator-dot ${idx === selectedIndex ? "is-active" : ""}`}
                disabled={!api}
                onClick={() => api?.scrollTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          <div className="carousel-dashboard-extras-slot">{children}</div>
        </div>
      </div>
    </React.Fragment>
  );
}
