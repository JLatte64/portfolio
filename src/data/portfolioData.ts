import type { PortfolioData } from "../types/portfolioTypes";

import rawPortfolioJSON from "./portfolioData.json";
export const portfolioData = rawPortfolioJSON as unknown as PortfolioData;

export const projectSlugLUT: Record<string, number> = {};
export const projectIndexToSlugLUT: string[] = [];

// Standardized lower-case hyphenated slug helper
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

portfolioData.projects.forEach((project, index) => {
  const customSlug = generateSlug(project.title);
  projectSlugLUT[customSlug] = index;
  projectIndexToSlugLUT[index] = customSlug;
});
