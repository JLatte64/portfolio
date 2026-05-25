export type ImageContent = {
  src: string;
  alt: string;
};

export type MediaContent = string | string[] | ImageContent[] | ImageContent;

export type Media = {
  mediaType: string;
  content: MediaContent;
};

export type BodySection = {
  sectionHeading: string;
  sectionMedia: Media[];
};

export type Project = {
  title: string;
  thumbnail: ImageContent;
  tags: string[];
  showcaseMedia: Media[];
  bodySections: BodySection[];
};
