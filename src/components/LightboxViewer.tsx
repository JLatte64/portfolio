// src/components/LightboxViewer.tsx
import { useEffect, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { MemoMediaWrapper } from "./RenderMedia";
import "./Lightbox.css";

export default function LightboxViewer({ carouselRef, isOpen, onClose }: any) {
  const overlayRef = useRef<HTMLDivElement>(null),
    transformRef = useRef<any>(null);

  const embla = carouselRef.current?.emblaApi,
    activeMedia = carouselRef.current?.activeMedia;
  const isImage = activeMedia?.mediaElement?.tagName?.toLowerCase() === "img",
    src = activeMedia?.mediaElement?.src;

  useEffect(() => {
    if (!isOpen || !carouselRef.current?.onSlideChange) return;
    return carouselRef.current.onSlideChange(() => {
      transformRef.current?.resetTransform?.(0);
    });
  }, [isOpen, carouselRef]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) =>
      e.key === "Escape" && (e.preventDefault(), onClose?.());
    const prevActive = document.activeElement as HTMLElement;

    overlayRef.current?.focus();
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      prevActive?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen || !src) return null;
  const baseAssetContent = (
    <MemoMediaWrapper
      item={{ src, type: isImage ? "image" : "video", caption: "" }}
      shouldLazyLoad={false}
    />
  );

  return (
    <div
      ref={overlayRef}
      className={`lightbox-overlay-fullscreen ${isOpen ? "is-open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={`Expanded Lightbox Viewport Display: Slide item number ${(embla?.selectedScrollSnap() ?? 0) + 1}`}
      tabIndex={-1}
      onClick={(e) => e.target === overlayRef.current && onClose?.()}
    >
      <div className="lightbox-viewport-window" role="document">
        {isImage ? (
          <>
            <TransformWrapper
              ref={transformRef}
              initialScale={1}
              minScale={1}
              maxScale={3}
            >
              <TransformComponent
                wrapperStyle={{ width: "100%", height: "100%" }}
              >
                {baseAssetContent}
              </TransformComponent>
            </TransformWrapper>
          </>
        ) : (
          baseAssetContent
        )}
      </div>
    </div>
  );
}
