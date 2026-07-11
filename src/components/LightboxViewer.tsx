import { useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { MemoMediaWrapper } from "./RenderMedia";
import "./Lightbox.css";

export default function LightboxViewer({
  mediaItem,
  emblaApiRef,
  isOpen,
}: any) {
  if (!mediaItem) return null;
  const mediaRef = useRef<any>(null);

  const renderPayload = (
    <div
      ref={(el) => {
        if (el && mediaRef) {
          (mediaRef as any).current = {
            mediaElement: el.querySelector(".universal-media-asset") || el,
            captionElement: null,
          };
        }
      }}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MemoMediaWrapper item={{ ...mediaItem, caption: "" }} />
    </div>
  );

  return (
    <div className={`lightbox-overlay-fullscreen ${isOpen ? "is-open" : ""}`}>
      <div className="lightbox-viewport-window">
        <button
          type="button"
          className="lightbox-arrow-btn arrow-prev"
          onClick={() => emblaApiRef.current?.scrollPrev()}
        >
          ⟨
        </button>
        <button
          type="button"
          className="lightbox-arrow-btn arrow-next"
          onClick={() => emblaApiRef.current?.scrollNext()}
        >
          ⟩
        </button>
        {mediaItem.type === "image" ? (
          <TransformWrapper initialScale={1} minScale={1} maxScale={4}>
            <TransformComponent
              wrapperStyle={{ width: "100%", height: "100%" }}
            >
              {renderPayload}
            </TransformComponent>
          </TransformWrapper>
        ) : (
          renderPayload
        )}
      </div>
    </div>
  );
}
