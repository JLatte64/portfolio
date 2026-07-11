import type { PortfolioData } from "../types/portfolioTypes";
// Assuming your raw JSON file path is relative to this file:
import rawPortfolioJSON from "./portfolioData.json";

// ✅ STEP 1: Cast the raw JSON payload to a clean, type-safe database instance
export const portfolioData = rawPortfolioJSON as unknown as PortfolioData;

// ✅ STEP 2: Initialize your fast route-matching index lookup table
// Inside src/data/portfolioData.ts

export const projectSlugLUT: Record<string, number> = {};

portfolioData.projects.forEach((project, index) => {
  const encodedSlug = encodeURIComponent(project.title);
  projectSlugLUT[encodedSlug] = index;
});
