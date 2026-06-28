import { type RefObject, useState } from "react";
import type { ImageData, Media } from "../types/MediaTypes";
import purifyString from "./PurifyString";

function getYouTubeId(url: string): string | null {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

function getGoogleDriveId(url: string): string | null {
  const match = url.match(/(?:\/d\/|id=)([\w-]+)/);
  return match ? match[1] : null;
}

interface LazyVideoPlayerProps {
  rawUrl: string;
  mediaClass: string;
  loadingStrategy: "lazy" | "eager";
  shouldLazyLoad: boolean;
}

function LazyVideoPlayer({
  rawUrl,
  mediaClass,
  loadingStrategy,
  shouldLazyLoad,
}: LazyVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const isYouTube =
    rawUrl.includes("youtube.com") || rawUrl.includes("youtu.be");
  const isGoogleDrive =
    rawUrl.includes("://google.com") || rawUrl.includes("://google.com");

  let previewSrc: string | null = null;
  let embedUrl = rawUrl;

  if (isYouTube) {
    const videoId = getYouTubeId(rawUrl);
    if (videoId) {
      previewSrc = `https://ytimg.com{videoId}/maxresdefault.jpg`;
      embedUrl = `https://youtube-nocookie.com{videoId}`;
    }
  } else if (isGoogleDrive) {
    const fileId = getGoogleDriveId(rawUrl);
    if (fileId) {
      previewSrc = `https://://google.com/thumbnail?id=${fileId}&sz=w1280`;
      embedUrl = rawUrl.endsWith("/view")
        ? rawUrl.replace(/\/view.*/, "/preview")
        : rawUrl;
    }
  }

  // Render clickable preview setup matching your aspect ratios
  if (previewSrc && !isPlaying) {
    return (
      <>
        <img
          src={previewSrc}
          alt="Video preview"
          className={mediaClass}
          loading={loadingStrategy}
          style={{ cursor: "pointer", objectFit: "cover" }}
          onClick={() => setIsPlaying(true)}
          onError={(e) => {
            if (isYouTube && !e.currentTarget.src.includes("hqdefault")) {
              const videoId = getYouTubeId(rawUrl);
              e.currentTarget.src = `https://ytimg.com{videoId}/hqdefault.jpg`;
            }
          }}
        />
        {/* Play icon centered over your slide using absolute positioning */}
        <div
          onClick={() => setIsPlaying(true)}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(0, 0, 0, 0.75)",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "22px",
            paddingLeft: "4px",
            cursor: "pointer",
            pointerEvents: "auto",
            zIndex: 2,
          }}
        >
          ▶
        </div>
      </>
    );
  }

  if (isYouTube || isGoogleDrive) {
    return (
      <iframe
        src={`${embedUrl}${isYouTube ? "?autoplay=1" : ""}`}
        className={mediaClass}
        title="Embedded video player"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        allow="autoplay; encrypted-media"
        loading={loadingStrategy}
      />
    );
  }

  const videoSrc = resolveMediaSrc(rawUrl);
  return (
    <video
      src={videoSrc}
      className={mediaClass}
      controls
      preload={shouldLazyLoad ? "none" : "auto"}
    >
      Your browser does not support the video tag.
    </video>
  );
}

export function resolveMediaSrc(src: string): string {
  if (!src) return "";

  if (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("data:")
  ) {
    return src;
  }
  const cleanSrc = src.startsWith("/") ? src.slice(1) : src;

  const baseUrl = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

  return `${baseUrl}files/${cleanSrc}`;
}

export default function displayMedia(
  media: Media,
  className?: string | null,
  shouldLazyLoad: boolean = true,
  ref?: RefObject<any>,
) {
  const mediaClass = `${className}`;
  const loadingStrategy = shouldLazyLoad ? "lazy" : "eager";

  switch (media?.mediaType) {
    case "code": {
      const code = purifyString(media?.content as string);
      return (
        <code ref={ref} className={mediaClass}>
          {code}
        </code>
      );
    }
    case "paragraph": {
      const text = purifyString(media?.content as string);
      return (
        <p ref={ref} className={mediaClass}>
          {text}
        </p>
      );
    }
    case "list":
      return (
        <ul ref={ref} className={mediaClass}>
          {(media?.content as string[]).map((listItem, listIndex) => (
            <li key={`list-item-${listIndex}`}>{purifyString(listItem)}</li>
          ))}
        </ul>
      );
    case "image": {
      const image = media?.content as ImageData;
      const src = resolveMediaSrc(image?.src);
      return (
        <img
          ref={ref}
          src={src}
          alt={image?.alt || ""}
          className={mediaClass}
          loading={loadingStrategy}
          decoding="async"
        />
      );
    }
    case "video": {
      const rawUrl = media?.content as string;
      return (
        <LazyVideoPlayer
          rawUrl={rawUrl}
          mediaClass={mediaClass}
          loadingStrategy={loadingStrategy}
          shouldLazyLoad={shouldLazyLoad}
        />
      );
    }
    case "pdf": {
      const pdfUrl = media?.content as string;
      const src = resolveMediaSrc(pdfUrl);

      return (
        <object
          ref={ref}
          data={`${src}#toolbar=1`}
          type="application/pdf"
          className={mediaClass}
          width="100%"
          height="100%"
        >
          <div style={{ padding: "20px", textAlign: "center" }}>
            <p>PDF Preview encountered an error.</p>
            <br />
            <a href={src} target="_blank" rel="noopener noreferrer">
              Open PDF Directly
            </a>
          </div>
        </object>
      );
    }
    default:
      return (
        <p ref={ref} className={mediaClass}>
          Error: Unrecognized content type.
        </p>
      );
  }
}
