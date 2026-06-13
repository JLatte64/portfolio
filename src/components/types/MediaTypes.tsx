export type ImageData = {
  src: string;
  alt: string;
};

export type Media = {
  mediaType: string;
  content: string | string[] | ImageData[] | ImageData;
};
