import type { RefObject } from "react";
import type { LightboxRefMethods } from "../Lightbox";
import "../styles/button-styles/lightboxButton.css";

interface LightboxButtonProps {
  lightboxRef: RefObject<LightboxRefMethods>;
  className?: string | null;
  onClick: () => void;
  /* 🚀 OPTIONAL EXTENSION: Allows parent loops to pass a descriptive string 
     (e.g., "Expand screenshot of main menu layout into lightbox view") */
  ariaLabel?: string;
}

export default function LightboxButton({
  lightboxRef,
  className,
  onClick,
  ariaLabel,
}: LightboxButtonProps) {
  const handleToggleClick = () => {
    onClick();
    if (lightboxRef?.current) {
      lightboxRef.current.toggleOpen();
    }
  };

  const safeClassName = (className || "").trim();

  // Dynamic fallback ensures the button ALWAYS communicates an action
  const descriptiveLabel =
    ariaLabel || "Expand image showcase to fullscreen view";

  return (
    <button
      className={`button lightbox-button ${safeClassName}`.trim()}
      onClick={handleToggleClick}
      type="button"
      /* 🚀 ACCESSIBILITY FIX: Explicitly states the button action to screen-readers */
      aria-label={descriptiveLabel}
    >
      {/* 🚀 ACCESSIBILITY FIX: Hides the font icon string from breaking speech patterns */}
      <span className="material-icons" aria-hidden="true">
        fullscreen
      </span>
    </button>
  );
}
