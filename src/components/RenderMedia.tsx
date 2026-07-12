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

const registry: Record<
  string,
  { status: "loading" | "loaded" | "error"; subs: Set<(s: any) => void> }
> = {};

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
    const isErr = !item?.src || item.type === "error",
      assetKey = item?.src
        ? btoa(generateSlug(item.src)).slice(0, 16)
        : "empty";
    const [loadingState, setLoadingState] = useState<
      "loading" | "loaded" | "error"
    >(isErr ? "error" : registry[assetKey]?.status || "loading");
    const mediaRef = useRef<any>(null),
      captionRef = useRef<HTMLElement>(null);

    useImperativeHandle(exposedRef, () => ({
      mediaElement: mediaRef.current,
      captionElement: captionRef.current,
    }));

    useEffect(() => {
      if (isErr) return setLoadingState("error");
      if (!registry[assetKey])
        registry[assetKey] = { status: "loading", subs: new Set() };
      const reg = registry[assetKey];
      reg.subs.add(setLoadingState);
      if (reg.status !== loadingState) setLoadingState(reg.status);

      const n = mediaRef.current;
      if (
        n &&
        ((n instanceof HTMLImageElement && n.complete) || n.state?.canPlay)
      ) {
        reg.status = "loaded";
        reg.subs.forEach((s) => s("loaded"));
      }
      return () => {
        reg.subs.delete(setLoadingState);
        if (!reg.subs.size) delete registry[assetKey];
      };
    }, [assetKey, isErr]);

    const setGlobalStatus = useCallback(
      (status: "loaded" | "error") => {
        if (!registry[assetKey]) return;
        registry[assetKey].status = status;
        registry[assetKey].subs.forEach((s) => s(status));
      },
      [assetKey],
    );

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
              className: "media-caption",
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
            {...ev}
          />
        )}
        {loadingState === "loading" && (
          <AssetStatusCard status="loading" description={item.caption} />
        )}
        {hasCaption && (
          <figcaption
            id={`asset-caption-id-${assetKey}`}
            ref={captionRef}
            className="universal-asset-caption"
          >
            {item.caption}
          </figcaption>
        )}
      </Comp>
    );
  },
);

MemoMediaWrapper.displayName = "MemoMediaWrapper";
