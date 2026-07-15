// src/routes.ts
import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";
import { ROUTE_KEYS } from "./config/routes.config";

export default [
  layout("./components/core/AppShell.tsx", [
    index("./layouts/PageLayout.tsx", { id: "home-view" }),
    route(ROUTE_KEYS.about, "./layouts/PageLayout.tsx", { id: "about-view" }),
    route(ROUTE_KEYS.contact, "./layouts/PageLayout.tsx", {
      id: "contact-view",
    }),

    route(
      ROUTE_KEYS.project,
      "./components/ui/project-showcase/ProjectModal.tsx",
      {
        id: "project-view",
      },
    ),
  ]),
] satisfies RouteConfig;
