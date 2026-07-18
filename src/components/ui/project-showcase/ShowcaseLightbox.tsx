// src/components/LightboxViewer.tsx
import { useEffect, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { MemoMediaWrapper } from "../RenderMedia";
import "./ShowcaseLightbox.css";

interface ShowcaseLightboxProps {
  activeIndex: number;
  mediaList: any[];
  isOpen: boolean;
  onClose: () => void;
}

export const ShowcaseLightbox = ({
  activeIndex,
  mediaList,
  isOpen,
  onClose,
}: ShowcaseLightboxProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  // 💡 EFFECT: Manages programmatic focus shifts and prioritized key intercepting
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDownCapture = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();

        /* 
          🔥 CRITICAL CAPTURE INTERCEPT:
          Because this event runs during the browser's prioritized capture phase,
          stopImmediatePropagation() safely intercepts and kills the Escape keypress 
          at the root window layer before the generic ProjectModal listener ever hears it.
        */
        e.stopImmediatePropagation();
        onClose();
      }
    };

    const prevActive = document.activeElement as HTMLElement;

    // Accessibility shift: Programmatically guide reader focus into the modal frame
    overlayRef.current?.focus();

    // Register with capture: true to jump to the front of the browser's event execution queue
    window.addEventListener("keydown", handleKeyDownCapture, { capture: true });

    return () => {
      window.removeEventListener("keydown", handleKeyDownCapture, {
        capture: true,
      });
      prevActive?.focus();
    };
  }, [isOpen, onClose]);

  // Safely extract metadata straight from incoming presentation props
  const activeMedia = mediaList?.[activeIndex];
  if (!isOpen || !activeMedia?.src) return null;

  const isImage = activeMedia.type === "image";

  const baseAssetContent = (
    <MemoMediaWrapper
      item={{
        src: activeMedia.src,
        type: isImage ? "image" : "video",
        caption: "",
      }}
      shouldLazyLoad={false}
    />
  );

  return (
    <div
      ref={overlayRef}
      className={`lightbox-overlay-fullscreen ${isOpen ? "is-open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={`Expanded Lightbox Viewport Display: Slide item number ${activeIndex + 1}`}
      tabIndex={-1}
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      <div className="lightbox-viewport-window" role="document">
        {isImage ? (
          /* 
            💡 DECLARATIVE ZOOM RESET: 
            By tying the reactive 'key' attribute directly to the media source string, 
            switching slides naturally destroys and remounts the pinch-to-zoom engine. 
            This forces it back to scale 1:1 automatically without needing imperative ref targets!
          */
          <TransformWrapper
            key={activeMedia.src}
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
        ) : (
          baseAssetContent
        )}
      </div>
    </div>
  );
};

export default ShowcaseLightbox;
