import type { RefObject } from "react";
import type { LightboxRefMethods } from "../Lightbox";
import "../styles/button-styles/lightboxButton.css";

interface LightboxButtonProps {
  lightboxRef: RefObject<LightboxRefMethods | null>;
}

export default function LightboxButton({ lightboxRef }: LightboxButtonProps) {
  return (
    <button
      className="button lightbox-button"
      onClick={() => lightboxRef.current?.toggleOpen()}
      type="button"
    >
      <span className="material-icons">fullscreen</span>
    </button>
  );
}
