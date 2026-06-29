// import type { RefObject } from "react";
// import type { LightboxRefMethods } from "../Lightbox";
import "../styles/button-styles/lightboxButton.css";

interface LightboxButtonProps {
  // lightboxRef: RefObject<LightboxRefMethods>;
  className?: string | null;
  onClick: () => void;
  ariaLabel?: string;
}

export default function LightboxButton({
  // lightboxRef,
  className,
  onClick,
  ariaLabel,
}: LightboxButtonProps) {
  const handleToggleClick = () => {
    onClick();
    // if (lightboxRef?.current) {
    //   lightboxRef.current.toggleOpen();
    // }
  };

  const safeClassName = (className || "").trim();

  const descriptiveLabel =
    ariaLabel || "Expand image showcase to fullscreen view";

  return (
    <button
      className={`button lightbox-button ${safeClassName}`.trim()}
      onClick={handleToggleClick}
      type="button"
      aria-label={descriptiveLabel}
    >
      <span className="material-icons" aria-hidden="true">
        fullscreen
      </span>
    </button>
  );
}
