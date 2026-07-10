import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // 1. Point your main landing path straight to your master UI file wrapper
  index("./layouts/PageLayout.tsx", { id: "home-index" }),

  // 2. Point your project slug path to the exact same file
  route("projects/:slug", "./layouts/PageLayout.tsx", { id: "project-slug" }),
] satisfies RouteConfig;
