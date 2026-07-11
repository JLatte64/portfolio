import type { MediaItem } from "../types/mediaTypes";
import "./CarouselControls.css";

interface CarouselControlsProps {
  readonly media: readonly MediaItem[];
  readonly emblaApiRef: React.RefObject<any>;
  readonly selectedIndex: number;
  readonly showCaptions: boolean;
  readonly onToggleCaptions: () => void;
  readonly onToggleLightbox: (open: boolean) => void;
}

export default function CarouselControls({
  media,
  emblaApiRef,
  selectedIndex,
  showCaptions,
  onToggleCaptions,
  onToggleLightbox,
}: CarouselControlsProps) {
  const currentMediaItem = media?.[selectedIndex];
  const isCurrentMediaVideo = currentMediaItem?.type === "video";

  return (
    <div className="carousel-controls-bar">
      {currentMediaItem?.caption && (
        <div
          className="carousel-inline-caption"
          style={{
            visibility: showCaptions ? "visible" : "hidden",
            opacity: showCaptions ? 1 : 0,
          }}
        >
          <span>{currentMediaItem.caption}</span>
        </div>
      )}

      <div className="controls-row-layout">
        <button
          type="button"
          className={`control-btn caption-toggle ${showCaptions ? "active" : ""}`}
          onClick={onToggleCaptions}
          disabled={isCurrentMediaVideo || !currentMediaItem?.caption}
        >
          📝 {showCaptions ? "Hide Text" : "Show Text"}
        </button>

        <div className="carousel-dots-indicator">
          {media.map((_, idx) => (
            <button
              key={`dot-${idx}`}
              type="button"
              className={`indicator-dot ${idx === selectedIndex ? "is-active" : ""}`}
              onClick={() => emblaApiRef.current?.scrollTo(idx)}
            />
          ))}
        </div>

        <button
          type="button"
          className="control-btn lightbox-trigger"
          onClick={() => onToggleLightbox(true)}
        >
          🔍 Lightbox
        </button>
      </div>
    </div>
  );
}
