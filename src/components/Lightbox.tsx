import React, {
  useRef,
  useImperativeHandle,
  type RefObject,
  useState,
} from "react";
import displayMedia from "./functions/DisplayMedia";
import type {Media} from "./types/MediaTypes";

export interface LightboxRefMethods {
  toggleOpen: () => void;
  toggleCaptions: (enabled: boolean | null) => void;
  setMedia: (media: Media) => void;
}

interface LightboxProps {
  overlayElement?: React.ReactNode;
  ref: RefObject<LightboxRefMethods | null>;
}

export default function Lightbox(props: LightboxProps) {
  const {ref} = props;
  const nativeDialogRef = useRef<HTMLDialogElement>(null);
  const [activeMedia, setActiveMedia] = useState<Media | null>(null);
  const [captionsEnabled, setCaptionsEnabled] = useState(false);

  const handleOpenDialog = () => {
    nativeDialogRef.current?.showModal();
  };

  const handleCloseDialog = () => {
    nativeDialogRef.current?.close();
  };

  const handleTriggerCaptions = (enabled: boolean | null) => {
    setCaptionsEnabled((prev) => enabled ?? !prev);
  };

  useImperativeHandle(
    ref,
    () => ({
      toggleOpen: handleOpenDialog,
      toggleCaptions: handleTriggerCaptions,
      setMedia: (media: Media) => {
        setActiveMedia(media);
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
      style={{padding: "20px", borderRadius: "8px"}}
    >
      <h3>Dialog Container</h3>

      {activeMedia && (
        <div className="lightbox-media-container">
          {displayMedia(activeMedia)}
          {captionsEnabled && (
            <p className="lightbox-caption">{activeMedia.caption}</p>
          )}
        </div>
      )}

      <button onClick={handleCloseDialog}>Close</button>
    </dialog>
  );
}
