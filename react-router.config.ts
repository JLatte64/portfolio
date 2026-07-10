import type { Config } from "@react-router/dev/config";
import fs from "fs";

// Pure Node-safe slug converter
const getBuildSlug = (name: string): string =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default {
  // Instructs React Router v7 to use build-time SSG rendering
  async prerender() {
    // Locate the source data module file safely
    const jsonUrl = new URL("./src/data/portfolioData.json", import.meta.url);

    const rawData = fs.readFileSync(jsonUrl, "utf-8");
    const projects = JSON.parse(rawData);

    // Dynamic slug extraction loop
    const dynamicProjectPaths = projects
      .filter(
        (project: { title?: string }) =>
          project && typeof project.title === "string",
      )
      .map(
        (project: { title: string }) =>
          `/projects/${getBuildSlug(project.title)}`,
      );

    // Return the root landing folder alongside all dynamic route variants
    return ["/", ...dynamicProjectPaths];
  },
} satisfies Config;
