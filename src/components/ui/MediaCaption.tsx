import { createPortal } from "react-dom";
import { useState } from "react";

interface MediaCaptionProps {
  activeIndex: number;
  mediaList: any[];
}

export const MediaCaption = ({ activeIndex, mediaList }: MediaCaptionProps) => {
  const [dockElement, setDockElement] = useState<HTMLDivElement | null>(null);

  // Read item straight out of incoming props safely
  const caption = mediaList[activeIndex]?.caption || "";
  if (!caption) return null;

  return (
    <div
      id="lightbox-caption-portal-dock"
      className="global-caption-portal-dock-frame"
      aria-live="polite"
      aria-atomic="true"
      ref={(element) => setDockElement(element)}
    >
      {dockElement &&
        createPortal(
          <div
            id="carousel-live-caption"
            className="lightbox-custom-floating-bubble"
          >
            {caption}
          </div>,
          dockElement,
        )}
    </div>
  );
};

export default MediaCaption;
