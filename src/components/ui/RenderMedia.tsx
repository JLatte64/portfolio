// src/components/RenderMedia.tsx
import React, { useState, useEffect, useImperativeHandle, useRef } from "react";
import type { MediaData } from "../../types/mediaTypes";
import { resolveMediaPath } from "../../utils/pathUtils";
import {
  MediaPlayer,
  MediaProvider,
  type MediaPlayerInstance,
} from "@vidstack/react";
import {
  DefaultVideoLayout,
  defaultLayoutIcons,
} from "@vidstack/react/player/layouts/default";
import "./RenderMedia.css";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

// 🚀 GLOBAL ARCHITECTURAL WIN:
// Register this handler EXACTLY ONCE at the file module execution layer.
// This completely stops memory footprint leaks across multiple slider nodes!
if (typeof window !== "undefined") {
  window.addEventListener("unhandledrejection", (e: PromiseRejectionEvent) => {
    const errorString =
      typeof e.reason === "string" ? e.reason : e.reason?.message || "";
    if (errorString.includes("provider destroyed")) {
      e.preventDefault(); // Swallows the console noise globally
    }
  });
}

export interface AssetHandles {
  mediaElement:
    HTMLImageElement | HTMLIFrameElement | MediaPlayerInstance | null;
  captionElement: HTMLElement | null;
}

export function AssetStatusCard({
  status,
  description,
}: {
  status: "loading" | "error";
  description?: string;
}) {
  return (
    <div
      className={`asset-status-card is-${status}`}
      role="status"
      aria-live={status === "loading" ? "polite" : "assertive"}
    >
      {status === "loading" ? (
        <>
          <div className="asset-spinner-ring" />
          <span className="sr-only">Loading: {description}...</span>
        </>
      ) : (
        <span>Media Unavailable</span>
      )}
    </div>
  );
}

export const MemoMediaWrapper = React.memo(
  ({
    item,
    exposedRef,
    shouldLazyLoad = false,
    anchorCaptions = false,
  }: {
    item: MediaData;
    exposedRef?: React.RefObject<AssetHandles | null>;
    shouldLazyLoad?: boolean;
    anchorCaptions?: boolean;
  }) => {
    const resolvedSrc = resolveMediaPath(item?.src || "");
    const [loadingState, setLoadingState] = useState<
      "loading" | "loaded" | "error"
    >("loading");

    const mediaRef = useRef<any>(null);
    const captionRef = useRef<HTMLElement>(null);

    useImperativeHandle(exposedRef, () => ({
      mediaElement: mediaRef.current,
      captionElement: captionRef.current,
    }));

    // 💡 EFFECT 1: Handles asset mounting state calculations
    useEffect(() => {
      if (!resolvedSrc || item.type === "error") {
        setLoadingState("error");
        return;
      }
      const element = mediaRef.current;
      if (element && element instanceof HTMLImageElement && element.complete) {
        setLoadingState("loaded");
      }
    }, [resolvedSrc, item.type]);

    // 💡 EFFECT 2: Lightweight local unmount track audio freeze
    useEffect(() => {
      return () => {
        try {
          mediaRef.current?.remote?.pause();
        } catch {}
      };
    }, []);

    const hasCaption =
      item.type !== "video" && !!item.caption && loadingState === "loaded";
    const captionId = `caption-${item.type}-${item.src ? encodeURIComponent(item.src).slice(0, 10) : "empty"}`;
    const Comp = hasCaption ? "figure" : React.Fragment;

    const handleLoadSuccess = () => setLoadingState("loaded");
    const handleLoadError = () => setLoadingState("error");

    const vidstackSrc = resolvedSrc || undefined;
    const nativeSrc = resolvedSrc || undefined;

    return (
      <Comp
        {...(hasCaption
          ? {
              className: "universal-asset-figure-wrapper",
              "data-anchor-captions": anchorCaptions || undefined,
              role: "figure",
              "aria-describedby": captionId,
            }
          : {})}
      >
        <div className={`media-viewport-frame state-${loadingState}`}>
          {loadingState === "error" ? (
            <AssetStatusCard status="error" description={item.caption} />
          ) : (
            <>
              {item.type === "video" ? (
                <MediaPlayer
                  ref={mediaRef}
                  src={vidstackSrc}
                  className="universal-media-asset player-wrapper w-full h-full aspect-video"
                  muted
                  autoplay
                  loop
                  playsInline
                  controls
                  load="visible"
                  logLevel="warn"
                  aria-label={item.caption || "Video player"}
                  aria-describedby={hasCaption ? captionId : undefined}
                  onCanPlay={handleLoadSuccess}
                  onError={handleLoadError}
                >
                  <MediaProvider />
                  <DefaultVideoLayout icons={defaultLayoutIcons} />
                </MediaPlayer>
              ) : item.type === "image" ? (
                <img
                  ref={mediaRef}
                  src={nativeSrc}
                  className="universal-media-asset"
                  alt={item.alt || ""}
                  aria-describedby={hasCaption ? captionId : undefined}
                  loading={shouldLazyLoad ? "lazy" : "eager"}
                  decoding="async"
                  onLoad={handleLoadSuccess}
                  onError={handleLoadError}
                />
              ) : (
                <iframe
                  ref={mediaRef}
                  src={nativeSrc}
                  className="universal-media-asset"
                  title={item.caption || "Embedded content"}
                  aria-describedby={hasCaption ? captionId : undefined}
                  allowFullScreen
                  loading={shouldLazyLoad ? "lazy" : "eager"}
                  onLoad={handleLoadSuccess}
                  onError={handleLoadError}
                />
              )}
            </>
          )}
        </div>

        {loadingState === "loading" && (
          <div
            className="asset-status-wrapper"
            role="status"
            aria-live="polite"
          >
            <AssetStatusCard
              status="loading"
              description={item.caption || "Loading media"}
            />
          </div>
        )}

        {hasCaption && (
          <span ref={captionRef} className="sr-only" id={captionId}>
            {item.caption}
          </span>
        )}
      </Comp>
    );
  },
);

MemoMediaWrapper.displayName = "MemoMediaWrapper";
export default MemoMediaWrapper;
