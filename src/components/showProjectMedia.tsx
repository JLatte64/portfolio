import type {ImageContent, Media} from "./ProjectContentTypes";

export function showProjectMedia(media: Media) {
  switch (media?.mediaType) {
    case "image":
      const image = media?.content as ImageContent;
      return <img src={image?.src} alt={image?.alt} />;
    case "imageGallery":
      const imageGallery = media?.content as ImageContent[];
      return imageGallery.map((galleryItem, galleryIndex) => (
        <img src={galleryItem.src} alt={galleryItem.alt} key={galleryIndex} />
      ));
    case "list":
      return (
        <ul>
          {(media?.content as string[]).map((listItem, listIndex) => (
            <li key={listIndex}>{listItem}</li>
          ))}
        </ul>
      );
    case "embed":
      return (
        <iframe
          src={media?.content as string}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          width="100%"
          height="100%"
        />
      );
    case "paragraph":
      return <p>{media?.content as string}</p>;
    default:
      return <p>Error: Unrecognized project type.</p>;
  }
}

export default showProjectMedia;
