import { type RefObject } from "react";
import type { ImageData, Media } from "../types/MediaTypes";
import purifyString from "./PurifyString";

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
            <li key={`list-item-${listIndex}`}>
              {/* 🚀 ACCESSIBILITY FIX: Placed the plain text string directly inside the list item 
                  node to prevent jagged double-landmark announcements. */}
              {purifyString(listItem)}
            </li>
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
          alt={image?.alt || "Project showcase screenshot image asset"}
          className={mediaClass}
          loading={loadingStrategy}
          decoding="async"
        />
      );
    }
    case "video": {
      const rawUrl = media?.content as string;
      const isYouTube =
        rawUrl.includes("youtube.com") || rawUrl.includes("youtu.be");
      const isGoogleDrive = rawUrl.includes("://google.com");

      const calculatedIframeTitle = media.caption
        ? `Embedded demonstration: ${purifyString(media.caption)}`
        : "Embedded interactive media player showcase presentation";

      if (isYouTube || isGoogleDrive) {
        let embedUrl =
          isGoogleDrive && rawUrl.endsWith("/view")
            ? rawUrl.replace(/\/view.*/, "/preview")
            : rawUrl;

        if (isYouTube) {
          embedUrl = embedUrl
            .replace("youtube.com", "youtube-nocookie.com")
            .replace("youtu.be/", "://youtube-nocookie.com");
        }

        return (
          <iframe
            ref={ref}
            src={embedUrl}
            className={mediaClass}
            title={calculatedIframeTitle}
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            width="100%"
            height="auto"
            loading={loadingStrategy}
            /* ========================================================
               🚀 PERMISSIONS POLICY & WARNING SUPPRESSION FIX
               Explicitly restricts the sandbox context to multimedia tools,
               silencing the browser's "compute-pressure" warning logs.
               ======================================================== */
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
        );
      }

      const videoSrc = resolveMediaSrc(rawUrl);
      return (
        <video
          ref={ref}
          src={videoSrc}
          className={mediaClass}
          controls
          preload={shouldLazyLoad ? "metadata" : "auto"}
        >
          Your browser does not support the video tag.
        </video>
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
          title="Document viewer panel hosting downloadable PDF breakdown"
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
