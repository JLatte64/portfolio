import type { ImageData, Media } from "./MediaTypes";

export interface ProjectData {
  title: string;
  thumbnail: ImageData;
  tags: string[];
  showcaseMedia?: Media[];
  bodySections?: ProjectSectionData[];
}

export type ProjectSectionData = {
  sectionHeading: string;
  sectionMedia: Media[];
};
