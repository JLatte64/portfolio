export type ProjectContent =
  | CarouselContent
  | VideoContent
  | GalleryContent
  | TextContent;

export type ProjectData = {
  name: string;
  subheading:string;
  thumbnail: string;
  alt:string;
  tags:string[];
  content: ProjectContent[];
};

export type CarouselContent = {
  type: "carousel";
  data: {
    src: string;
    alt: string;
  }[];
};

export type VideoContent = {
  type: "video";
  data: string;
};

export type GalleryContent = {
  type: "gallery";
  data: {
    src: string;
    alt: string;
  }[];
};

export type TextContent = {
  type: "text";
  data: string;
};
