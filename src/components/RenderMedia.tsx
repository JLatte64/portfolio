import React, {
  lazy,
  Suspense,
  useState,
  useEffect,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import type { MediaData } from "../types/mediaTypes";
import "./RenderMedia.css";

const LazyPlayer = lazy(() => import("./LazyPlayer"));
export interface AssetHandles {
  mediaElement: HTMLElement | null;
  captionElement: HTMLElement | null;
}

export function AssetErrorFallbackCard() {
  return (
    <div className="asset-content-wrapper is-ready">
      <div className="asset-error-fallback-card">Asset Unavailable</div>
    </div>
  );
}

const MemoMedia = React.memo(
  ({
    item,
    assetKey,
    onLoad,
    onError,
    mediaRef,
  }: {
    item: MediaData;
    assetKey: string;
    onLoad: () => void;
    onError: () => void;
    mediaRef: React.RefObject<any>;
  }) => {
    if (!item.src) return null;
    switch (item.type) {
      case "video":
        return (
          <Suspense fallback={null}>
            <div
              ref={mediaRef}
              className="universal-media-asset video-asset-wrapper"
            >
              <LazyPlayer
                url={item.src}
                mediaKey={assetKey}
                onReady={onLoad}
                onError={onError}
              />
            </div>
          </Suspense>
        );
      case "image":
        return (
          <img
            ref={mediaRef}
            src={item.src}
            className="universal-media-asset image-asset"
            alt={item.alt || item.caption || "Media asset"}
            loading="lazy"
            decoding="async"
            onLoad={onLoad}
            onError={onError}
          />
        );
      default:
        return (
          <iframe
            ref={mediaRef}
            src={item.src}
            className="universal-media-asset embed-asset"
            title="Embed Fallback"
            allowFullScreen
            loading="lazy"
            onLoad={onLoad}
            onError={onError}
          />
        );
    }
  },
);

export const MemoMediaWrapper = React.memo(
  ({
    item,
    exposedRef,
  }: {
    item: MediaData;
    exposedRef?: React.RefObject<AssetHandles | null>;
  }) => {
    const isFallbackTriggered = !item || !item.src || item.type === "error";

    const [isLoading, setIsLoading] = useState(!isFallbackTriggered);
    const [hasError, setHasError] = useState(false);
    const mediaRef = useRef<HTMLElement>(null),
      captionRef = useRef<HTMLElement>(null);

    useImperativeHandle(exposedRef, () => ({
      mediaElement: mediaRef.current,
      captionElement: captionRef.current,
    }));

    // Bypasses the loading loop if the exact same item.src primitive is remounted
    useEffect(() => {
      setIsLoading(!isFallbackTriggered);
      setHasError(false);
    }, [item?.src, isFallbackTriggered]);

    const handleLoaded = useCallback(() => setIsLoading(false), []);
    const handleLoadError = useCallback(() => {
      setIsLoading(false);
      setHasError(true);
    }, []);

    if (isFallbackTriggered || hasError) {
      return <AssetErrorFallbackCard />;
    }

    const captionText = item.type !== "video" ? item.caption || "" : "";
    const hasValidCaption = captionText && !isLoading;
    const assetKey = item.src
      ? btoa(encodeURIComponent(item.src)).slice(0, 16)
      : "empty";

    const content = (
      <React.Fragment>
        {isLoading && (
          <div className="asset-skeleton-overlay">
            <div className="asset-spinner-ring" />
          </div>
        )}
        <MemoMedia
          item={item}
          assetKey={assetKey}
          onLoad={handleLoaded}
          onError={handleLoadError}
          mediaRef={mediaRef}
        />
        {hasValidCaption && (
          <figcaption ref={captionRef} className="universal-asset-caption">
            {captionText}
          </figcaption>
        )}
      </React.Fragment>
    );

    return hasValidCaption ? (
      <figure
        className={`asset-content-wrapper ${isLoading ? "is-loading" : "is-ready"}`}
      >
        {content}
      </figure>
    ) : (
      content
    );
  },
);

export default function RenderAsset({
  media,
}: {
  media: readonly MediaData[];
}) {
  if (!media?.length) return null;
  return (
    <div className="universal-asset-group">
      {media.map((item, index) => (
        <div
          className="universal-asset-container"
          key={`${item.type}-${index}`}
        >
          <MemoMediaWrapper item={item} />
        </div>
      ))}
    </div>
  );
}
