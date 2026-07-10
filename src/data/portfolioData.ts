import type { PortfolioData } from "../types/portfolioTypes";
import { data } from "./portfolioData.json";

export const portfolioData = data as unknown as PortfolioData;

// 2. Pure slug utility (identical to your config file logic)
export const getSlug = (name: string): string =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// 3. ⚡ The Ultra-Fast Hash LUT Block
// Keys are slugs, values are indices (e.g., { "ai-analytics-dashboard": 0 })
export const projectSlugLUT: Record<string, number> = {};

portfolioData.projects.forEach((project, idx) => {
  projectSlugLUT[getSlug(project.title)] = idx;
});
