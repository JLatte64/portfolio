import React, { useEffect, useState } from "react";
import "./CarouselDashboard.css";

interface CarouselDashboardProps {
  length: number;
  carouselRef: React.RefObject<any>;
  children?: React.ReactNode;
}

export default function CarouselDashboard({
  length,
  carouselRef,
  children,
}: CarouselDashboardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [api, setApi] = useState<any>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);

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

  const isControlDisabled: boolean = !isMounted || !api;

  return (
    <React.Fragment>
      <div className="carousel-dashboard-overlay">
        <button
          type="button"
          className="carousel-arrow-btn arrow-prev"
          disabled={isControlDisabled}
          onClick={() => api?.scrollPrev()}
        >
          ⟨
        </button>
        <button
          type="button"
          className="carousel-arrow-btn arrow-next"
          disabled={isControlDisabled}
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
                disabled={isControlDisabled}
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
