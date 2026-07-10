import { useMemo } from "react";
import "./ProjectMedia.css";

interface ProjectMediaProps {
  value: string;
}

export default function ProjectMedia({ value }: ProjectMediaProps) {
  // 1. Determine media type via an ultra-fast path look-ahead rule
  const mediaType = useMemo(() => {
    if (!value) return "unknown";

    const cleanUrl = value.toLowerCase().split(/[?#]/)[0];

    // Check common video stream extensions
    if (
      cleanUrl.endsWith(".mp4") ||
      cleanUrl.endsWith(".webm") ||
      cleanUrl.endsWith(".ogg") ||
      cleanUrl.includes("://vimeo.com")
    ) {
      return "video";
    }

    // Check third-party embedded player networks
    if (
      cleanUrl.includes("youtube.com") ||
      cleanUrl.includes("youtu.be") ||
      cleanUrl.includes("://vimeo.com")
    ) {
      return "embed";
    }

    // Default target fallback acts as an image wrapper
    return "image";
  }, [value]);

  // 2. Render the correct semantic element instantly based on evaluation properties
  switch (mediaType) {
    case "video":
      return (
        <video
          src={value}
          className="project-media-asset video-asset"
          muted
          autoPlay
          loop
          playsInline
          controlsList="nodownload"
        />
      );

    case "embed":
      return (
        <iframe
          src={value}
          className="project-media-asset embed-asset"
          title="Project Media Player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      );

    case "image":
    default:
      return (
        <img
          src={value}
          className="project-media-asset image-asset"
          alt="Project showcase item"
          loading="lazy" // ⚡ Drastically accelerates site speed by postponing out-of-view assets
          decoding="async"
        />
      );
  }
}
