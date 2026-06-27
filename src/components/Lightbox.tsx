import React, {
  useRef,
  useImperativeHandle,
  type RefObject,
  useState,
  type JSX,
} from "react";
import "./styles/lightbox.css";

export interface LightboxRefMethods {
  toggleOpen: () => void;
  setContent: (content: React.ReactNode | undefined | JSX.Element) => void;
}

interface LightboxProps {
  overlayElement?: React.ReactNode;
}

export default function Lightbox(props: LightboxProps) {
  const nativeDialogRef = useRef<HTMLDialogElement>(null);
  const [lightboxContent, setLightboxContent] =
    useState<React.ReactNode | null>(null);

  // 1. Add state to track visibility
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* 2. Wrap everything inside the dialog with the isOpen check */}
      {isOpen && (
        <>
          {lightboxContent && (
            <div className="lightbox-media-container">{lightboxContent}</div>
          )}
          <button
            className="button lightbox-close-button"
            aria-label="Close zoom preview"
          >
            <span className="material-icons">close</span>
          </button>
        </>
      )}
    </div>
  );
}
