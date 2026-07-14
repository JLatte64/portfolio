// src/routes.ts
import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";
import { ROUTE_KEYS } from "./config/routes.config";

export default [
  layout("./layouts/PageLayout.tsx", [
    // ("/")
    index("./layouts/PageLayout.tsx", { id: "home-view" }),

    // ("about/"), ("contact/")
    route(ROUTE_KEYS.about, "./layouts/PageLayout.tsx", { id: "about-view" }),
    route(ROUTE_KEYS.contact, "./layouts/PageLayout.tsx", {
      id: "contact-view",
    }),

    // ("work/:slug")
    route(ROUTE_KEYS.project, "./components/ProjectModal.tsx", {
      id: "project-view",
    }),
  ]),
] satisfies RouteConfig;
