import React, {
  useImperativeHandle,
  type RefObject,
  useState,
  useEffect,
} from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import displayMedia from "./functions/DisplayMedia";
import type { Media } from "./types/MediaTypes";
import "./styles/lightbox.css";

export interface LightboxRefMethods {
  toggleOpen: () => void;
  setContent: (media: Media) => void; // Expose content injector
}

interface LightboxProps {
  overlayElement?: React.ReactNode;
  lightboxRef: RefObject<LightboxRefMethods>;
}

export default function Lightbox(props: LightboxProps) {
  const { lightboxRef } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Local state is the absolute single source of truth for what is visible
  const [lightboxMedia, setLightboxMedia] = useState<Media | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.navigator.maxTouchPoints > 0);
    }
  }, []);

  const handleOpenDialog = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    document.body.style.overflow = "";
  };

  useImperativeHandle(
    lightboxRef,
    () => ({
      toggleOpen: handleOpenDialog,
      setContent: (media: Media) => {
        setLightboxMedia(media); // Direct synchronous injection
      },
    }),
    [],
  );

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseDialog();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fullscreen-lightbox-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleCloseDialog();
        }
      }}
    >
      <div className="lightbox-content-wrapper">
        {lightboxMedia && (
          <TransformWrapper
            initialScale={1}
            panning={{ disabled: !isMobile }}
            pinch={{ disabled: !isMobile }}
            wheel={{ disabled: true }}
            doubleClick={{ disabled: true }}
          >
            <TransformComponent
              wrapperStyle={{ width: "100%", height: "100%" }}
              contentStyle={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="lightbox-media-container">
                <div className="lightbox-zoom-target-wrapper">
                  {displayMedia(lightboxMedia, "", true)}
                </div>
              </div>
            </TransformComponent>
          </TransformWrapper>
        )}
      </div>

      <button
        className="button lightbox-button"
        onClick={handleCloseDialog}
        aria-label="Close zoom preview"
      >
        <span className="material-icons">close</span>
      </button>
    </div>
  );
}
