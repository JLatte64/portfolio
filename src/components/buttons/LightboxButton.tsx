import type { RefObject } from "react";
import type { LightboxRefMethods } from "../Lightbox";
import "../styles/button-styles/lightboxButton.css";

interface LightboxButtonProps {
  lightboxRef: RefObject<LightboxRefMethods>;
  className?: string | null;
  onClick: () => void;
}

export default function LightboxButton({
  lightboxRef,
  className,
  onClick,
}: LightboxButtonProps) {
  const handleToggleClick = () => {
    onClick();
    if (lightboxRef?.current) {
      lightboxRef.current.toggleOpen();
    }
  };

  const safeClassName = (className || "").trim();

  return (
    <button
      className={`button lightbox-button ${safeClassName}`.trim()}
      onClick={handleToggleClick}
      type="button"
    >
      <span className="material-icons">fullscreen</span>
    </button>
  );
}
