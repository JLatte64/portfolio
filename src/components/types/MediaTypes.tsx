export type ImageData = {
  src: string;
  alt: string;
};

export interface Media {
  id: string;
  mediaType: string;
  content: string | string[] | ImageData;
  caption?: string;
}
