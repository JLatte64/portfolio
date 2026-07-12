// src/components/RenderMedia.tsx
import React, {
  useState,
  useEffect,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import type { MediaData } from "../types/mediaTypes";
import { generateSlug } from "../data/portfolioData";
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

const registry: Record<string, "loading" | "loaded" | "error"> = {};

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
    const isErr = !item?.src || item.type === "error",
      assetKey = item?.src
        ? btoa(generateSlug(item.src)).slice(0, 16)
        : "empty";
    const [loadingState, setLoadingState] = useState<
      "loading" | "loaded" | "error"
    >(isErr ? "error" : registry[assetKey] || "loading");
    const mediaRef = useRef<any>(null),
      captionRef = useRef<HTMLElement>(null);

    useImperativeHandle(exposedRef, () => ({
      mediaElement: mediaRef.current,
      captionElement: captionRef.current,
    }));

    const setGlobalStatus = useCallback(
      (status: "loaded" | "error") => {
        if (isErr) return;
        registry[assetKey] = status;
        setLoadingState(status);
        document
          .querySelectorAll(`[data-asset-key="${assetKey}"]`)
          .forEach((el) => el.setAttribute("data-media-status", status));
      },
      [assetKey, isErr],
    );

    useEffect(() => {
      if (isErr) return setLoadingState("error");
      if (!registry[assetKey]) registry[assetKey] = "loading";
      if (registry[assetKey] !== "loading") {
        setGlobalStatus(registry[assetKey]);
        return;
      }

      const n = mediaRef.current;
      if (
        n &&
        ((n instanceof HTMLImageElement && n.complete) || n.state?.canPlay)
      )
        setGlobalStatus("loaded");

      return () => {
        if (registry[assetKey] === "loading") {
          delete registry[assetKey];
        }
      };
    }, [assetKey, isErr, setGlobalStatus]);

    if (loadingState === "error")
      return <AssetStatusCard status="error" description={item.caption} />;

    const hasCaption =
      item.type !== "video" && !!item.caption && loadingState === "loaded";
    const Comp = hasCaption ? "figure" : React.Fragment;
    const ev = {
      onCanPlay: () => setGlobalStatus("loaded"),
      onLoad: () => setGlobalStatus("loaded"),
      onError: () => setGlobalStatus("error"),
    };

    return (
      <Comp
        {...(hasCaption
          ? {
              className: "universal-asset-figure-wrapper",
              "data-anchor-captions": anchorCaptions || undefined,
              "aria-describedby": `asset-caption-id-${assetKey}`,
            }
          : {})}
      >
        {item.type === "video" ? (
          <MediaPlayer
            ref={mediaRef}
            src={item.src}
            key={assetKey}
            className="universal-media-asset project-media-asset player-wrapper w-full h-full aspect-video"
            muted
            autoplay
            loop
            playsInline
            controls
            load="visible"
            data-asset-key={assetKey}
            data-media-status={loadingState}
            logLevel="warn"
            {...ev}
          >
            <MediaProvider />
            <DefaultVideoLayout icons={defaultLayoutIcons} />
          </MediaPlayer>
        ) : item.type === "image" ? (
          <img
            ref={mediaRef}
            key={assetKey}
            src={item.src}
            className="universal-media-asset"
            alt={item.alt || item.caption}
            loading={shouldLazyLoad ? "lazy" : "eager"}
            decoding="async"
            data-asset-key={assetKey}
            data-media-status={loadingState}
            {...ev}
          />
        ) : (
          <iframe
            ref={mediaRef}
            key={assetKey}
            src={item.src}
            className="universal-media-asset"
            title={item.caption}
            allowFullScreen
            loading={shouldLazyLoad ? "lazy" : "eager"}
            data-asset-key={assetKey}
            data-media-status={loadingState}
            {...ev}
          />
        )}
        <div data-status-overlay={assetKey} className="asset-status-wrapper">
          {loadingState === "loading" && (
            <AssetStatusCard status="loading" description={item.caption} />
          )}
        </div>
        {/* Hidden fallback reference keeps your carousel metrics functioning cleanly */}
        <span
          ref={captionRef}
          className="sr-only"
          id={`asset-caption-id-${assetKey}`}
        >
          {item.caption}
        </span>
      </Comp>
    );
  },
);

MemoMediaWrapper.displayName = "MemoMediaWrapper";
