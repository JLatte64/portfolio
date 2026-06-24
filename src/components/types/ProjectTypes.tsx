import type { Media } from "./MediaTypes";

export interface ProjectData {
  id: string;
  title: string;
  thumbnail: Media;
  tags: string[];
  showcaseMedia?: Media[];
  bodySections?: ProjectSectionData[];
}

export interface ProjectSectionData {
  id: string;
  sectionHeading: string;
  sectionMedia: Media[];
}
