export type ImageData = {
  src: string;
  alt: string;
};

interface BaseMedia {
  id: string;
  caption?: string;
  enableLightbox?: string;
}

export type Media =
  | (BaseMedia & {mediaType: "code"; content: string})
  | (BaseMedia & {mediaType: "paragraph"; content: string})
  | (BaseMedia & {mediaType: "list"; content: string[]})
  | (BaseMedia & {mediaType: "image"; content: ImageData})
  | (BaseMedia & {mediaType: "video"; content: string})
  | (BaseMedia & {mediaType: "pdf"; content: string});
