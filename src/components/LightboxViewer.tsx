import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import type { MediaItem } from "../types/mediaTypes";
import "./Lightbox.css";

interface LightboxViewerProps {
  readonly mediaItem: MediaItem | undefined;
  readonly emblaApiRef: React.RefObject<any>;
  readonly showCaptions: boolean;
  readonly isOpen: boolean; // ✅ State modifier parameter hook
  readonly onToggleCaptions: () => void;
  readonly onClose: () => void;
}

export default function LightboxViewer({
  mediaItem,
  emblaApiRef,
  showCaptions,
  isOpen,
  onToggleCaptions,
  onClose,
}: LightboxViewerProps) {
  if (!mediaItem) return null; // Safe guard for index parsing arrays boundaries

  const isVideo = mediaItem.type === "video";

  return (
    /* ✅ DYNAMIC CLASS INTERPOLATION: Drives our fluid CSS keyframe transitions */
    <div className={`lightbox-overlay-fullscreen ${isOpen ? "is-open" : ""}`}>
      <div className="lightbox-viewport-window">
        <button
          type="button"
          className="lightbox-arrow-btn arrow-prev"
          onClick={() => emblaApiRef.current?.scrollPrev()}
          aria-label="Previous slide"
        >
          ⟨
        </button>
        <button
          type="button"
          className="lightbox-arrow-btn arrow-next"
          onClick={() => emblaApiRef.current?.scrollNext()}
          aria-label="Next slide"
        >
          ⟩
        </button>

        {mediaItem.type === "image" ? (
          <TransformWrapper initialScale={1} minScale={1} maxScale={4}>
            <TransformComponent
              wrapperStyle={{ width: "100%", height: "100%" }}
            >
              <img
                src={mediaItem.src}
                alt={mediaItem.alt || "Fullscreen lightbox view"}
                className="lightbox-core-direct-asset"
              />
            </TransformComponent>
          </TransformWrapper>
        ) : mediaItem.type === "video" ? (
          <video
            src={mediaItem.src}
            className="lightbox-core-direct-asset"
            muted
            autoPlay
            loop
            playsInline
            controls
          />
        ) : (
          <iframe
            src={mediaItem.src}
            className="lightbox-core-direct-asset"
            frameBorder="0"
            allowFullScreen
          />
        )}

        <button
          type="button"
          className="lightbox-exit-circle-btn"
          onClick={onClose}
          aria-label="Exit full screen lightbox view"
        >
          ✕
        </button>
      </div>

      <div className="lightbox-standalone-controls-bar">
        {mediaItem.caption && (
          <div
            className="lightbox-inline-caption"
            style={{
              visibility: showCaptions ? "visible" : "hidden",
              opacity: showCaptions ? 1 : 0,
            }}
          >
            <span>{mediaItem.caption}</span>
          </div>
        )}

        <div className="lightbox-controls-row">
          <button
            type="button"
            className={`control-btn caption-toggle ${showCaptions ? "active" : ""}`}
            onClick={onToggleCaptions}
            disabled={isVideo || !mediaItem.caption}
          >
            📝 {showCaptions ? "Hide Text" : "Show Text"}
          </button>
        </div>
      </div>
    </div>
  );
}
