import type { Config } from "@react-router/dev/config";
import fs from "fs";

const getBuildSlug = (name: string): string =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default {
  // Instructs React Router v7 that your code files live in "src/"
  appDirectory: "src",

  // 🚀 THE CRITICAL FIX: Enabling ssr tells the compiler to generate true static pages (SSG),
  // which instantly fixes the internal 302 redirect crash loop!
  ssr: true,
  basename: "/portfolio/",

  async prerender() {
    const jsonUrl = new URL("./src/data/portfolioData.json", import.meta.url);
    const rawData = fs.readFileSync(jsonUrl, "utf-8");
    const portfolioData = JSON.parse(rawData);
    const projects = portfolioData.projects || [];

    const dynamicProjectPaths = projects
      .filter((p: any) => p && typeof p.title === "string")
      .map((p: any) => `/projects/${getBuildSlug(p.title)}`);

    // Build your root homepage alongside all project case study folders statically
    return ["/", ...dynamicProjectPaths];
  },
} satisfies Config;
