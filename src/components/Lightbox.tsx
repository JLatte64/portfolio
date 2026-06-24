import React, { useRef } from "react";

interface LightboxProps {
  overlayElement: React.ReactNode;
}

function closeLightbox() {
  return <></>;
}

function openLightbox() {
  return <></>;
}

function setLightboxMedia() {
  return <></>;
}

export default function Lightbox(props: LightboxProps) {
  const mediaRef = useRef(null);

  return (
    <dialog>
      {props.overlayElement}
      <button>Close Lightbox</button>
    </dialog>
  );
}
