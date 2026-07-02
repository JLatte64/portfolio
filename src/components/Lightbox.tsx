import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";
import "../components/styles/lightbox.css";
import DisplayMedia from "../components/functions/DisplayMedia";
import {useState} from "react";

export const Lightbox = () => {
  const [lightboxMedia, setLightboxMedia] = useState(null);

  return (
    <div
      popover="manual"
      className="fullscreen-lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Fullscreen media zoom preview inspector"
    >
      {lightboxMedia && (
        <>
          <div className="lightbox-content-wrapper">
            <TransformWrapper
              initialScale={1}
              panning={{disabled: false}}
              pinch={{disabled: false}}
              wheel={{disabled: true}}
              doubleClick={{disabled: true}}
            >
              <div className="lightbox-gesture-catcher-node">
                <TransformComponent
                  wrapperStyle={{width: "100%", height: "100%"}}
                >
                  <div className="lightbox-zoom-bounding-box">
                    <DisplayMedia
                      media={lightboxMedia}
                      className={"lightbox-scaled-image"}
                      shouldLazyLoad={false}
                    />
                  </div>
                </TransformComponent>
              </div>
            </TransformWrapper>
          </div>

          <button
            type="button"
            className="button lightbox-close-button overlay-button"
            onClick={() => {}}
            aria-label="Close fullscreen zoom preview"
          >
            <span className="material-icons" aria-hidden="true">
              close
            </span>
          </button>
        </>
      )}
    </div>
  );
};
