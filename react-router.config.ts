import type { Config } from "@react-router/dev/config";
import { projectSlugToIndexLUT } from "./src/data/portfolioData";
import { getDynamicBaseUrl } from "./get-base-url.ts";
import { RELATIVE_ROUTES } from "./src/config/routes.config.ts";

export default {
  appDirectory: "src",
  ssr: true,
  basename: getDynamicBaseUrl(),

  routeDiscovery: {
    mode: "initial",
  },

  async prerender() {
    const projectSlugs = Object.keys(projectSlugToIndexLUT);
    const dynamicProjectPaths = projectSlugs.map((slug: string) =>
      RELATIVE_ROUTES.toProject(slug),
    );

    return [
      RELATIVE_ROUTES.home, // "/"
      RELATIVE_ROUTES.about, // "/about"
      RELATIVE_ROUTES.contact, // "/contact"
      ...dynamicProjectPaths, // ["/work/slug-1", "/work/slug-2"]
    ];
  },
} satisfies Config;
