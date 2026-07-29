import { createPortal } from "react-dom";
import { useState } from "react";
import type { MediaData } from "../../types/mediaTypes";

interface MediaCaptionProps {
  activeIndex: number;
  mediaList: MediaData[];
}

export const MediaCaption = ({ activeIndex, mediaList }: MediaCaptionProps) => {
  const [dockElement, setDockElement] = useState<HTMLDivElement | null>(null);

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
      {dockElement && createPortal(<></>, dockElement)}
    </div>
  );
};

export default MediaCaption;
