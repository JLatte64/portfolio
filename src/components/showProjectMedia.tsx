import type { ImageContent, Media } from "./ProjectContentTypes";

export default function showMedia(media: Media, className?: string | null) {
  switch (media?.mediaType) {
    case "image":
      const image = media?.content as ImageContent;
      return (
        <img
          src={image?.src}
          alt={image?.alt}
          className={`base-style ${className || ""}`}
          key={image?.src}
        />
      );
    case "imageGallery":
      const imageGallery = media?.content as ImageContent[];
      return imageGallery.map((galleryItem, galleryIndex) => (
        <img
          src={galleryItem.src}
          alt={galleryItem.alt}
          key={galleryIndex}
          className={`base-style ${className || ""}`}
        />
      ));
    case "list":
      return (
        <ul>
          {(media?.content as string[]).map((listItem, listIndex) => (
            <li key={listIndex} className={`base-style ${className || ""}`}>
              {listItem}
            </li>
          ))}
        </ul>
      );
    case "embed":
      return (
        <iframe
          src={media?.content as string}
          className={`base-style ${className || ""}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          width="100%"
          height="100%"
          key={media?.content as string}
        />
      );
    case "paragraph":
      return (
        <p
          className={`base-style ${className || ""}`}
          key={media?.content as string}
        >
          {media?.content as string}
        </p>
      );
    default:
      return (
        <p className={`base-style ${className || ""}`}>
          Error: Unrecognized project type.
        </p>
      );
  }
}
