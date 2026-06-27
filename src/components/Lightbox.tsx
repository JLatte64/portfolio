import React, {
  useImperativeHandle,
  type RefObject,
  useState,
  useEffect,
} from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "./styles/lightbox.css";

export interface LightboxRefMethods {
  toggleOpen: () => void;
}

interface LightboxProps {
  overlayElement?: React.ReactNode;
  lightboxRef: RefObject<LightboxRefMethods>;
  contentSlot: React.ReactNode | null;
}

export default function Lightbox(props: LightboxProps) {
  const { lightboxRef, contentSlot } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
        {contentSlot && (
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
              <div className="lightbox-media-container">{contentSlot}</div>
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
