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

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose?.();
      }
    };

    const prevActive = document.activeElement as HTMLElement;
    overlayRef.current?.focus();

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      prevActive?.focus();
    };
  }, [isOpen, onClose]);

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
      onClick={(e) => e.target === overlayRef.current && onClose?.()}
    >
      <div className="lightbox-viewport-window" role="document">
        {isImage ? (
          /* 
            💡 KEY OPTIMIZATION: Changing the 'key' attribute here forces the layout wrapper 
            to naturally reset back to scale 1:1 instantly on slide change with zero ref code needed!
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
