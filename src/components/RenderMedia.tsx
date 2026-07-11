// src/components/RenderMedia.tsx
import React, {
  lazy,
  Suspense,
  useState,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import type { MediaData } from "../types/mediaTypes";
import "./RenderMedia.css";
import { generateSlug } from "../data/portfolioData";

const LazyPlayer = lazy(() => import("./LazyPlayer"));

export interface AssetHandles {
  mediaElement: HTMLElement | null;
  captionElement: HTMLElement | null;
}

export function AssetStatusCard({
  status,
  description,
}: {
  status: "loading" | "error";
  description?: string;
}) {
  const isLoad = status === "loading";
  return (
    <div
      className={`asset-status-card is-${status}`}
      role="status"
      aria-live={isLoad ? "polite" : "assertive"}
      aria-busy={isLoad}
    >
      {isLoad ? (
        <React.Fragment>
          <div className="asset-spinner-ring" />
          <span className="sr-only">
            Loading project media element: {description || "Asset payload"}...
          </span>
        </React.Fragment>
      ) : (
        <span aria-label="Warning: media element is unavailable">
          Media Unavailable
        </span>
      )}
    </div>
  );
}

type LoadingStatus = "loading" | "loaded" | "error";

const MemoMedia = React.memo(
  ({
    item,
    assetKey,
    onLoad,
    onError,
    mediaRef,
    shouldLazyLoad,
  }: {
    item: MediaData;
    assetKey: string;
    onLoad: () => void;
    onError: () => void;
    mediaRef: React.RefObject<any>;
    shouldLazyLoad?: boolean;
  }) => {
    const isFallbackTriggered = !item || !item.src || item.type === "error";
    const [loadingState, setLoadingState] = useState<LoadingStatus>(
      isFallbackTriggered ? "error" : "loading",
    );

    const handleMediaEvent = useCallback(
      (success: boolean) => {
        setLoadingState(success ? "loaded" : "error");
        success ? onLoad() : onError();
      },
      [onLoad, onError],
    );

    const generalLabel = item.caption || "Portfolio presentation asset";
    if (loadingState === "error")
      return <AssetStatusCard status="error" description={generalLabel} />;

    let elementContent = null;
    if (item.src) {
      switch (item.type) {
        case "video":
          elementContent = (
            <Suspense fallback={null}>
              <div
                ref={mediaRef}
                className="universal-media-asset"
                role="region"
                aria-label={`Interactive video presentation element: ${generalLabel}`}
              >
                <LazyPlayer
                  url={item.src}
                  mediaKey={assetKey}
                  onReady={() => handleMediaEvent(true)}
                  onError={() => handleMediaEvent(false)}
                />
              </div>
            </Suspense>
          );
          break;
        case "image":
          elementContent = (
            <img
              ref={mediaRef}
              src={item.src}
              className="universal-media-asset"
              alt={
                item.alt ||
                item.caption ||
                "Portfolio collection dynamic display screenshot"
              }
              loading={shouldLazyLoad ? "lazy" : "eager"}
              decoding="async"
              onLoad={() => handleMediaEvent(true)}
              onError={() => handleMediaEvent(false)}
            />
          );
          break;
        default:
          elementContent = (
            <iframe
              ref={mediaRef}
              src={item.src}
              className="universal-media-asset"
              title={`Embedded third party platform presentation node player: ${item.caption || "Asset showcase"}`}
              allowFullScreen
              loading={shouldLazyLoad ? "lazy" : "eager"}
              onLoad={() => handleMediaEvent(true)}
              onError={() => handleMediaEvent(false)}
            />
          );
      }
    }

    return (
      <React.Fragment>
        {elementContent}
        {loadingState === "loading" && (
          <AssetStatusCard status="loading" description={generalLabel} />
        )}
      </React.Fragment>
    );
  },
);

export const MemoMediaWrapper = React.memo(
  ({
    item,
    exposedRef,
    shouldLazyLoad = false,
  }: {
    item: MediaData;
    exposedRef?: React.RefObject<AssetHandles | null>;
    shouldLazyLoad?: boolean;
  }) => {
    const [isParentLoading, setIsParentLoading] = useState(true);
    const mediaRef = useRef<HTMLElement>(null);
    const captionRef = useRef<HTMLElement>(null);

    useImperativeHandle(exposedRef, () => ({
      mediaElement: mediaRef.current,
      captionElement: captionRef.current,
    }));

    const clearParentLoading = useCallback(() => setIsParentLoading(false), []);
    const captionText = item && item.type !== "video" ? item.caption || "" : "";
    const hasValidCaption = captionText !== "" && !isParentLoading;
    const assetKey = item?.src
      ? btoa(generateSlug(item.src)).slice(0, 16)
      : "empty";

    const Component = hasValidCaption ? "figure" : React.Fragment;
    const componentProps = hasValidCaption
      ? {
          className: "universal-asset-figure-wrapper",
          "aria-describedby": `asset-caption-id-${assetKey}`,
        }
      : {};

    return (
      <Component {...componentProps}>
        <MemoMedia
          item={item}
          assetKey={assetKey}
          onLoad={clearParentLoading}
          onError={clearParentLoading}
          mediaRef={mediaRef}
          shouldLazyLoad={shouldLazyLoad}
        />
        {hasValidCaption && (
          <figcaption
            id={`asset-caption-id-${assetKey}`}
            ref={captionRef}
            className="universal-asset-caption"
          >
            {captionText}
          </figcaption>
        )}
      </Component>
    );
  },
);

// export default function RenderAsset({
//   media,
//   shouldLazyLoad = false,
// }: {
//   media: readonly MediaData[];
//   shouldLazyLoad?: boolean;
// }) {
//   if (!media?.length) return null;
//   return (
//     <div className="universal-asset-group">
//       {media.map((item, index) => (
//         <MemoMediaWrapper
//           key={`${item.type}-${index}`}
//           item={item}
//           shouldLazyLoad={shouldLazyLoad}
//         />
//       ))}
//     </div>
//   );
// }
