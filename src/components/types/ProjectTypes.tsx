import type { ImageData, Media } from "./MediaTypes";

export interface ProjectData {
  id: string;
  title: string;
  thumbnail: ImageData;
  tags: string[];
  showcaseMedia?: Media[];
  bodySections?: ProjectSectionData[];
}

export interface ProjectSectionData {
  id: string;
  sectionHeading: string;
  sectionMedia: Media[];
}
