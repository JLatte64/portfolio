
export type ProjectData = {
  title: string;
  thumbnail: string;
  tags:string[];
  body: ProjectBodyText[];
  media: string[];
};

export type ProjectBodyText = {
  heading: string;
  text: string;
};
