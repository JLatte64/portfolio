// src/routes.ts
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // 1. ✅ Home index route path: Fires instantly at your clean base directory root (/portfolio/)
  index("./layouts/PageLayout.tsx", { id: "home-index" }),

  // 2. ✅ Explicit, flat project parameter segment route path:
  // Pre-renders exactly under your requested project identifier ID configuration layout!
  route(":slug", "./layouts/PageLayout.tsx", { id: "project-slug" }),
] satisfies RouteConfig;
