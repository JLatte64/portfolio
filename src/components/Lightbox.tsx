import {useRef, useState} from "react";
import "../components/styles/lightbox.css";
import "../components/styles/Main.css";

export function Lightbox({srcArray}: {srcArray: Array<string>}) {
  const [lightboxContents, setLightboxContents] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const modalRef = useRef<HTMLDialogElement>(null);

  return (
    <dialog
      className="lightbox-container"
      ref={modalRef}
      onClick={() => modalRef.current?.close()}
    >
      <div className="lightbox" onClick={(e) => e.stopPropagation()}>
        <img
          src={lightboxContents}
          alt="Lightbox Content"
          className="lightbox-content"
        />
        <button
          className="embla__sideArrow embla__prev material-icons"
          onClick={() => {
            setLightboxContents(srcArray[(currentSlide - 1) % srcArray.length]);
          }}
        >
          chevron_left
        </button>
        <button
          className="embla__sideArrow embla__next material-icons"
          onClick={() => {
            setLightboxContents(srcArray[(currentSlide + 1) % srcArray.length]);
          }}
        >
          chevron_right
        </button>
      </div>

      <button
        className="embla__close"
        onClick={() => modalRef.current?.close()}
      >
        Close
      </button>
    </dialog>
  );
}

export default Lightbox;
