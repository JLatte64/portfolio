import type { MediaItem } from "./mediaTypes"; // ✅ Import your shared object shape model

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
  // ✅ Swapped from raw string arrays to read-only media item objects
  readonly media?: readonly MediaItem[];
}

export interface ProjectData {
  readonly title: string;
  readonly description: string;
  readonly year: number;
  readonly thumbnail: MediaItem;
  // ✅ Swapped from raw string arrays to read-only media item objects
  readonly carouselMedia: readonly MediaItem[];
  readonly sections: readonly ProjectSectionData[];
}

export interface PortfolioData {
  readonly profile: ProfileData;
  readonly projects: readonly ProjectData[];
}
