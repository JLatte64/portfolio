import {useMemo} from "react";
import type {Media} from "../types/MediaTypes";
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

interface DisplayMediaProps {
  media: Media;
  className?: string | null;
  shouldLazyLoad?: boolean;
  ref?: React.Ref<any>;
}

export default function DisplayMedia({
  media,
  className,
  shouldLazyLoad = true,
  ref,
}: DisplayMediaProps) {
  const mediaClass = `${className || ""}`;
  const loadingStrategy = shouldLazyLoad ? "lazy" : "eager";

  const captionText = media?.caption ? purifyString(media.caption) : "";
  const hasCaption = Boolean(captionText);

  const parsedMedia = useMemo(() => {
    if (!media) return null;

    switch (media.mediaType) {
      case "code": {
        const code = purifyString(media.content);
        return (
          <code ref={ref} className={mediaClass}>
            {code}
          </code>
        );
      }

      case "paragraph": {
        const text = purifyString(media.content);
        return (
          <p ref={ref} className={mediaClass}>
            {text}
          </p>
        );
      }

      case "list": {
        return (
          <ul ref={ref} className={mediaClass}>
            {media.content.map((listItem, listIndex) => (
              <li key={`list-item-${listIndex}`}>{purifyString(listItem)}</li>
            ))}
          </ul>
        );
      }

      case "image": {
        const src = resolveMediaSrc(media.content.src);
        return (
          <img
            ref={ref}
            src={src}
            alt={media.content.alt || "Project showcase screenshot image asset"}
            className={mediaClass}
            loading={loadingStrategy}
            decoding="async"
          />
        );
      }

      case "video": {
        const rawUrl = media.content;
        const isYouTube =
          rawUrl.includes("youtube.com") || rawUrl.includes("youtu.be");
        const isGoogleDrive = rawUrl.includes("://google.com");

        const calculatedIframeTitle = hasCaption
          ? `Embedded demonstration: ${captionText}`
          : "Embedded interactive media player showcase presentation";

        if (isYouTube || isGoogleDrive) {
          let embedUrl =
            isGoogleDrive && rawUrl.endsWith("/view")
              ? rawUrl.replace(/\/view.*/, "/preview")
              : rawUrl;
          let allowStr = "";

          if (isYouTube) {
            embedUrl = embedUrl
              .replace("youtube.com", "youtube-nocookie.com")
              .replace("youtu.be/", "://youtube-nocookie.com");
          }

          if (isGoogleDrive) {
            allowStr += "web-share; ";
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
              allow={`accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; ${allowStr}`}
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
        const pdfUrl = media.content;
        const src = resolveMediaSrc(pdfUrl);

        const encodedSrc = encodeURIComponent(src);
        const googleViewerUrl = `https://google.com${encodedSrc}&embedded=true`;

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
            <div
              className="pdf-fallback-container"
              style={{width: "100%", height: "100%", minHeight: "500px"}}
            >
              <iframe
                src={googleViewerUrl}
                title="Google Docs Document Viewer PDF Preview Fallback"
                width="100%"
                height="100%"
                style={{border: "none"}}
                loading="lazy"
              />

              <div style={{padding: "20px", textAlign: "center"}}>
                <p>PDF Preview failed to load natively.</p>
                <br />
                <a
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pdf-download-link"
                >
                  Open / Download PDF Directly
                </a>
              </div>
            </div>
          </object>
        );
      }

      default: {
        return (
          <p ref={ref} className={mediaClass}>
            Error: Unrecognized content type.
          </p>
        );
      }
    }
  }, [
    media,
    mediaClass,
    loadingStrategy,
    shouldLazyLoad,
    ref,
    captionText,
    hasCaption,
  ]);

  if (hasCaption) {
    return (
      <figure>
        {parsedMedia}
        <figcaption>{captionText}</figcaption>
      </figure>
    );
  }

  return parsedMedia;
}
