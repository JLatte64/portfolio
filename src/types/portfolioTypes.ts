import type { MediaData } from "./mediaTypes";

export interface WorkExperienceData {
  title: string;
  company: string;
  timeframe: string;
  details: string[];
}

export interface BackgroundData {
  name: string;
  occupation: string;
  aboutBlurb: string;
  heroImage: MediaData;
  contacts: (
    { Email: string; Phone?: never } | { Phone: string; Email?: never }
  )[];
  socials: (
    { GitHub: string; LinkedIn?: never } | { LinkedIn: string; GitHub?: never }
  )[];
  skills: string[];
  software: string[];
  experience: WorkExperienceData[];
}

export interface ProjectSectionData {
  heading: string;
  subheading: string;
  paragraph: string;
  list: string[];
  media: MediaData[];
}

export interface ProjectData {
  title: string;
  description: string;
  year: number;
  thumbnailImage: MediaData;
  carouselMedia: MediaData[];
  sections: ProjectSectionData[];
}

export interface PortfolioData {
  siteTitle: string;
  siteDescription: string;
  tagline: string;
  bannerImage: MediaData;
  backgroundInfo: BackgroundData; // Hidden JSON property key hook
  projects: ProjectData[];
}
