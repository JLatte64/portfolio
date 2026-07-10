export interface ProjectSectionData {
  heading: string;
  subheading: string;
  paragraph: string;
  list: string[];
  media: string[];
}

export interface ProjectData {
  title: string;
  description: string;
  year: number;
  carouselMedia: string[];
  sections: ProjectSectionData[];
}

export interface PortfolioData {
  projects: ProjectData[];
}
