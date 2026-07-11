import type { PortfolioData } from "../types/portfolioTypes";
import portfolioJson from "./portfolioData.json";

export const portfolioData: PortfolioData = portfolioJson;

export const projectIndexToSlugLUT: Record<number, string> = {}; //number -> slug (For ProjectCard)
export const projectSlugToIndexLUT: Record<string, number> = {}; //slug -> number (For Layout/Modal)

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

portfolioData.projects.forEach((project, index) => {
  const customSlug = generateSlug(project.title);

  projectIndexToSlugLUT[index] = customSlug;
  projectSlugToIndexLUT[customSlug] = index;
});
