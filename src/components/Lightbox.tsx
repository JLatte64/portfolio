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
  ref: RefObject<LightboxRefMethods | null>;
}

export default function Lightbox(props: LightboxProps) {
  const {ref} = props;
  const nativeDialogRef = useRef<HTMLDialogElement>(null);
  const [lightboxContent, setLightboxContent] =
    useState<React.ReactNode | null>(null);

  // 1. Add state to track visibility
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsOpen(true);
    nativeDialogRef.current?.showModal();
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    nativeDialogRef.current?.close();
  };

  useImperativeHandle(
    ref,
    () => ({
      toggleOpen: handleOpenDialog,
      setContent: (content: React.ReactNode | undefined | JSX.Element) => {
        setLightboxContent(content);
      },
    }),
    [],
  );

  return (
    <dialog
      ref={nativeDialogRef}
      onCancel={(e) => {
        e.preventDefault();
        handleCloseDialog();
      }}
      onClick={(e) => {
        if (e.target === nativeDialogRef.current) {
          handleCloseDialog();
        }
      }}
    >
      {/* 2. Wrap everything inside the dialog with the isOpen check */}
      {isOpen && (
        <>
          {lightboxContent && (
            <div className="lightbox-media-container">{lightboxContent}</div>
          )}
          <button
            className="button lightbox-close-button"
            onClick={handleCloseDialog}
            aria-label="Close zoom preview"
          >
            <span className="material-icons">close</span>
          </button>
        </>
      )}
    </dialog>
  );
}
