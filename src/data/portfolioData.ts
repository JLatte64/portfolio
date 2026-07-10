import portfolioJson from "./portfolioData.json";
import type { PortfolioData } from "../types/portfolioTypes";

// 🚀 ZERO typecasting, ZERO validation functions.
// Your existing tsconfig resolves and matches the types natively.
export const portfolioData: PortfolioData = portfolioJson;

// Pure URL slug converter utility
export const getSlug = (name: string): string =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// ⚡ Ultra-Fast Hash LUT Block
export const projectSlugLUT: Record<string, number> = {};

portfolioData.projects.forEach((project, idx) => {
  if (project.title) {
    projectSlugLUT[getSlug(project.title)] = idx;
  }
});
