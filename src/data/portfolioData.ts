// src/data/portfolioData.ts
import type { PortfolioData } from "../types/portfolioTypes";
import portfolioJson from "./portfolioData.json";

export const portfolioData: PortfolioData = portfolioJson;

const scramble = (str: string): string => {
  const codes = Array.from(str).map((char) => char.charCodeAt(0));
  return JSON.stringify(codes);
};

export const projectIndexToSlugLUT: Record<number, string> = {};
export const projectSlugToIndexLUT: Record<string, number> = {};

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

const emailObj = portfolioData.backgroundInfo.contacts.find(
  (c) => "Email" in c,
);
const phoneObj = portfolioData.backgroundInfo.contacts.find(
  (c) => "Phone" in c,
);

if (emailObj) emailObj["Email"] = scramble(emailObj["Email"] || "");
if (phoneObj) phoneObj["Phone"] = scramble(phoneObj["Phone"] || "");
