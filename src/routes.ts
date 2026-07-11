import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./layouts/PageLayout.tsx", { id: "home-index" }),
  route("/:slug?", "./layouts/PageLayout.tsx", { id: "project-slug" }),
] satisfies RouteConfig;
