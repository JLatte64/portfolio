import type { ImageContent, Media } from "./ProjectContentTypes";

function resolveMediaSrc(src: string): string {
  if (!src) return "";

  // 1. If it's already a full remote link, leave it completely unchanged
  if (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("data:")
  ) {
    return src;
  }

  // 2. Remove any accidental leading slash from the dataset string
  // (e.g., converts "/resume.pdf" or "resume.pdf" both down to "resume.pdf")
  const cleanSrc = src.startsWith("/") ? src.slice(1) : src;

  // 3. Ensure the Vite BASE_URL always ends with exactly one slash
  const baseUrl = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

  // 4. Combine the Base URL, your target public subfolder, and the filename
  return `${baseUrl}files/${cleanSrc}`;
}

export default function showMedia(
  media: Media,
  className?: string | null,
  shouldLazyLoad: boolean = true,
) {
  const mediaClass = `base-style ${className || "project-media"}`;

  // Conditionally assign "lazy" or "eager" based on the boolean prop
  const loadingStrategy = shouldLazyLoad ? "lazy" : "eager";

  switch (media?.mediaType) {
    case "paragraph": {
      const text = media?.content as string;
      return (
        <p className={mediaClass} key={text}>
          {text}
        </p>
      );
    }
    case "list":
      return (
        <ul className={mediaClass}>
          {(media?.content as string[]).map((listItem, listIndex) => (
            <li key={listIndex}>{listItem}</li>
          ))}
        </ul>
      );
    case "image": {
      const image = media?.content as ImageContent;
      const src = resolveMediaSrc(image?.src);
      return (
        <img
          src={src}
          alt={image?.alt || ""}
          className={mediaClass}
          key={src}
          loading={loadingStrategy} // Dynamic strategy
          decoding="async"
        />
      );
    }
    case "imageGallery": {
      const imageGallery = media?.content as ImageContent[];
      return imageGallery.map((galleryItem, galleryIndex) => {
        const src = resolveMediaSrc(galleryItem.src);
        return (
          <img
            src={src}
            alt={galleryItem.alt || ""}
            key={src || galleryIndex}
            className={mediaClass}
            loading={loadingStrategy} // Dynamic strategy
            decoding="async"
          />
        );
      });
    }
    case "video": {
      const rawUrl = media?.content as string;

      // 1. Target checks for the two cloud platforms
      const isYouTube =
        rawUrl.includes("youtube.com") || rawUrl.includes("youtu.be");
      const isGoogleDrive = rawUrl.includes("://google.com");

      // 2. If it matches either platform, use the iframe player
      if (isYouTube || isGoogleDrive) {
        // Automatically swap out /view for /preview on Google Drive links
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
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            width="100%"
            height="100%"
            key={embedUrl}
            loading={loadingStrategy}
          />
        );
      }

      // 3. Otherwise, safely fall back to a local asset or direct file URL
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

      // VS Code's internal browser view runs on localhost.
      // If we are developing locally, we use object/iframe embedding.
      // If deployed live, we use Google Viewer to avoid browser download triggers.
      const isLocalhost =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";

      if (isLocalhost) {
        return (
          <object
            data={`${src}#toolbar=1`}
            type="application/pdf"
            className={mediaClass}
            width="100%"
            height="100%"
            key={src}
          >
            {/* Safe internal element fallback to prevent React Router interception */}
            <div style={{ padding: "20px", textAlign: "center" }}>
              <p>PDF Preview paused in editor container.</p>
              <br />
              <a href={src} target="_blank" rel="noopener noreferrer">
                Open Document Directly
              </a>
            </div>
          </object>
        );
      }

      const absolutePdfUrl = src.startsWith("http")
        ? src
        : `${window.location.origin}${src}`;
      const googleViewerSrc = `https://google.com{encodeURIComponent(${absolutePdfUrl})}&embedded=true`;

      return (
        <iframe
          src={googleViewerSrc}
          className={mediaClass}
          width="100%"
          height="100%"
          style={{ border: "none" }}
          title="Interactive PDF Viewer"
          key={src}
          loading={loadingStrategy}
        />
      );
    }

    default:
      return <p className={mediaClass}>Error: Unrecognized project type.</p>;
  }
}
