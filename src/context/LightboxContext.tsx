// src/context/LightboxContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import displayMedia from "../components/functions/DisplayMedia";
import type { Media } from "../components/types/MediaTypes";
import "../components/styles/lightbox.css";

interface LightboxContextType {
  openLightbox: (media: Media) => void;
  closeLightbox: () => void;
}

const LightboxContext = createContext<LightboxContextType | undefined>(
  undefined,
);

export const LightboxProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lightboxMedia, setLightboxMedia] = useState<Media | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.navigator.maxTouchPoints > 0);
    }
  }, []);

  const openLightbox = (media: Media) => {
    // Cache the currently focused button to restore focus smoothly upon closing
    triggerElementRef.current = document.activeElement as HTMLElement;

    setLightboxMedia(media);

    requestAnimationFrame(() => {
      if (popoverRef.current) {
        try {
          popoverRef.current.showPopover();
        } catch (e) {}
      }
    });
  };

  const closeLightbox = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setIsInteracting(false);

    if (popoverRef.current) {
      try {
        popoverRef.current.hidePopover();
      } catch (e) {}
    }

    setLightboxMedia(null);

    // 🚀 FOCUS RESTORATION: Returns keyboard focus back to the triggering button instantly
    requestAnimationFrame(() => {
      if (triggerElementRef.current) {
        triggerElementRef.current.focus();
      }
    });
  };

  return (
    <LightboxContext.Provider value={{ openLightbox, closeLightbox }}>
      {children}

      {/* 🚀 THE DEFINITIVE TOP-LAYER LIGHTBOX STRUCTURE */}
      <div
        ref={popoverRef}
        popover="manual"
        className="fullscreen-lightbox-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Fullscreen media zoom preview inspector"
        data-interacting={isInteracting ? "true" : undefined}
      >
        {lightboxMedia && (
          <>
            <div className="lightbox-content-wrapper">
              <TransformWrapper
                initialScale={1}
                panning={{ disabled: false }}
                pinch={{ disabled: false }}
                wheel={{ disabled: true }}
                doubleClick={{ disabled: true }}
                onPanning={() => setIsInteracting(true)}
                onPinch={() => setIsInteracting(true)}
              >
                <div
                  className="lightbox-gesture-catcher-node"
                  onPointerDown={() => setIsInteracting(true)}
                  onPointerUp={() => setIsInteracting(false)}
                  onPointerLeave={() => setIsInteracting(false)}
                >
                  <TransformComponent
                    wrapperStyle={{ width: "100%", height: "100%" }}
                  >
                    <div className="lightbox-zoom-bounding-box">
                      {displayMedia(
                        lightboxMedia,
                        "lightbox-scaled-image",
                        false,
                      )}
                    </div>
                  </TransformComponent>
                </div>
              </TransformWrapper>
            </div>

            {/* FLOATING CLOSE SWITCH TOGGLE */}
            <button
              type="button"
              className="button lightbox-close-button overlay-button"
              onClick={closeLightbox}
              aria-label="Close fullscreen zoom preview"
            >
              <span className="material-icons" aria-hidden="true">
                close
              </span>
            </button>

            {/* FOOTER DESCRIPTIVE CAPTIONS BAR */}
            {!!lightboxMedia.caption && (
              <output
                className="lightbox-captions"
                aria-label="Current image caption description"
              >
                {lightboxMedia.caption}
              </output>
            )}
          </>
        )}
      </div>
    </LightboxContext.Provider>
  );
};

export const useLightbox = () => {
  const context = useContext(LightboxContext);
  if (!context)
    throw new Error(
      "useLightbox must be executed within a valid <LightboxProvider /> wrapper.",
    );
  return context;
};
