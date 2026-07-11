import type { MediaData } from "./mediaTypes";

export interface ProfileData {
  readonly name: string;
  readonly title: string;
  readonly tagline: string;
  readonly phone: string;
  readonly email: string;
  readonly github: string;
  readonly linkedin: string;
}

export interface ProjectSectionData {
  readonly heading?: string;
  readonly subheading?: string;
  readonly paragraph?: string;
  readonly list?: readonly string[];
  readonly media?: readonly MediaData[];
}

export interface ProjectData {
  readonly title: string;
  readonly description: string;
  readonly year: number;
  readonly thumbnail: MediaData;
  readonly carouselMedia: readonly MediaData[];
  readonly sections: readonly ProjectSectionData[];
}

export interface PortfolioData {
  readonly profile: ProfileData;
  readonly projects: readonly ProjectData[];
}
