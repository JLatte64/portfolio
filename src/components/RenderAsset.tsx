import { useMemo, lazy, Suspense, useState, useEffect } from "react";
import type { MediaItem } from "../types/mediaTypes";
import "./RenderAsset.css";

const LazyPlayer = lazy(() => import("./LazyPlayer"));

interface RenderAssetProps {
  media: readonly MediaItem[];
}

function SingleAsset({ item }: { item: MediaItem }) {
  const [isAssetLoading, setIsAssetLoading] = useState(true);
  const [hasError, setHasError] = useState(false); // ✅ 1. Track resource load health status

  const assetKey = useMemo(() => {
    return item.src ? btoa(item.src).slice(0, 16) : "empty-asset";
  }, [item.src]);

  // Reset states completely if the parent carousel flips to a fresh URL node item
  useEffect(() => {
    setIsAssetLoading(true);
    setHasError(false);
  }, [item.src]);

  const assetElement = useMemo(() => {
    if (!item.src) return null;

    const handleLoaded = () => setIsAssetLoading(false);
    const handleLoadError = () => {
      setIsAssetLoading(false);
      setHasError(true); // ✅ 2. Fire error toggle hook if network returns a 404 block
    };

    // If an error is caught, immediately unmount the asset and return the fallback structure layout
    if (hasError) {
      return (
        <div className="asset-error-fallback-card">
          <span className="error-badge-icon">⚠️</span>
          <p className="error-fallback-heading">Asset Unavailable</p>
          <span className="error-fallback-subtext">
            The requested resource failed to load (404 / Missing)
          </span>
        </div>
      );
    }

    switch (item.type) {
      case "video":
        return (
          <Suspense fallback={null}>
            <LazyPlayer
              url={item.src}
              mediaKey={assetKey}
              onReady={handleLoaded}
              onError={handleLoadError} // ✅ Catch streaming errors / dead embeds
            />
          </Suspense>
        );

      case "image":
        return (
          <img
            key={assetKey}
            src={item.src}
            className="universal-media-asset image-asset"
            alt={item.alt || item.caption || "Media asset"}
            loading="lazy"
            decoding="async"
            onLoad={handleLoaded}
            onError={handleLoadError} // ✅ Catch broken image paths instantly
          />
        );

      case "embed":
      default:
        return (
          <iframe
            key={assetKey}
            src={item.src}
            className="universal-media-asset embed-asset"
            title="Media Player Embed Fallback"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            onLoad={handleLoaded}
            onError={handleLoadError} // Catch blocked embedded sandboxes
          />
        );
    }
  }, [item.src, item.type, item.alt, item.caption, assetKey, hasError]);

  return (
    <div
      className={`asset-content-wrapper ${isAssetLoading ? "is-loading" : "is-ready"}`}
    >
      {isAssetLoading && (
        <div className="asset-skeleton-overlay">
          <div className="asset-spinner-ring" />
        </div>
      )}
      {assetElement}
    </div>
  );
}

export default function RenderAsset({ media }: RenderAssetProps) {
  if (!media || media.length === 0) return null;

  return (
    <div className="universal-asset-group">
      {media.map((item, index) => (
        <div className="universal-asset-container" key={`${item.src}-${index}`}>
          <SingleAsset item={item} />
        </div>
      ))}
    </div>
  );
}
