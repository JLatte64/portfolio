import type { Config } from "@react-router/dev/config";
import { projectSlugToIndexLUT } from "./src/data/portfolioData";

export default {
  appDirectory: "src",
  ssr: true,
  basename: "/",

  routeDiscovery: {
    mode: "initial",
  },

  async prerender() {
    const projectSlugs = Object.keys(projectSlugToIndexLUT);
    const dynamicProjectPaths = projectSlugs.map((slug) => `/${slug}`);

    return ["/", ...dynamicProjectPaths];
  },
} satisfies Config;
