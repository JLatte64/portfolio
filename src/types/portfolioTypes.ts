export interface ProjectSection {
  heading: string;
  subheading: string;
  paragraph: string;
  list: string[];
  media: string[];
}

export interface Project {
  title: string;
  description: string;
  year: number;
  carouselMedia: string[];
  sections: ProjectSection[];
}
