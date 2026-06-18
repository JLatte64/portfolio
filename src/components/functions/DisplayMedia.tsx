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
  mediaIndex?: number,
) {
  const mediaClass = `base-style ${className || "project-media"}`;

  const loadingStrategy = shouldLazyLoad ? "lazy" : "eager";

  switch (media?.mediaType) {
    case "paragraph": {
      const text = purifyString(media?.content as string);
      return (
        <p
          className={mediaClass}
          key={`${media.mediaType}-${mediaIndex}-${text}`}
        >
          {text}
        </p>
      );
    }
    case "list":
      return (
        <ul className={mediaClass}>
          {(media?.content as string[]).map((listItem, listIndex) => (
            <li
              key={`${media.mediaType}-${mediaIndex}-${listIndex}-${listItem}`}
            >
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
          src={src}
          alt={image?.alt || ""}
          className={mediaClass}
          key={`${media.mediaType}-${mediaIndex}-${src}`}
          loading={loadingStrategy}
          decoding="async"
        />
      );
    }
    case "imageGallery": {
      const imageGallery = media?.content as ImageData[];
      return imageGallery.map((galleryItem, galleryIndex) => {
        const src = resolveMediaSrc(galleryItem.src);
        return (
          <img
            src={src}
            alt={galleryItem.alt || ""}
            key={`${media.mediaType}-${mediaIndex}-${galleryIndex}-${src}`}
            className={mediaClass}
            loading={loadingStrategy}
            decoding="async"
          />
        );
      });
    }
    case "video": {
      const rawUrl = media?.content as string;

      const isYouTube =
        rawUrl.includes("youtube.com") || rawUrl.includes("youtu.be");
      const isGoogleDrive = rawUrl.includes("://google.com");

      if (isYouTube || isGoogleDrive) {
        const embedUrl =
          isGoogleDrive && rawUrl.endsWith("/view")
            ? rawUrl.replace(/\/view.*/, "/preview")
            : rawUrl;

        return (
          <iframe
            src={embedUrl}
            className={mediaClass}
            title="Embedded video player"
            frameBorder="0"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            width="100%"
            height="100%"
            key={`${media.mediaType}-${mediaIndex}-${embedUrl}`}
            loading={loadingStrategy}
          />
        );
      }

      const videoSrc = resolveMediaSrc(rawUrl);
      return (
        <video
          src={videoSrc}
          className={mediaClass}
          key={videoSrc}
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
          data={`${src}#toolbar=1`}
          type="application/pdf"
          className={mediaClass}
          width="100%"
          height="100%"
          key={`${media.mediaType}-${mediaIndex}-${src}`}
        >
          {/* Safe internal element fallback to prevent React Router interception */}
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
      return <p className={mediaClass}>Error: Unrecognized content type.</p>;
  }
}
