import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";
import { ROUTE_KEYS } from "./config/routes.config";

export default [
  layout("./layouts/PageLayout.tsx", [
    index("./layouts/PageLayout.tsx", { id: "home-view" }),
    route(ROUTE_KEYS.about, "./layouts/PageLayout.tsx", { id: "about-view" }), //"about"
    route(ROUTE_KEYS.contact, "./layouts/PageLayout.tsx", {
      id: "contact-view",
    }), //"contact"
    route(ROUTE_KEYS.project, "./layouts/PageLayout.tsx", {
      id: "project-view",
    }), //"work/:slug"
  ]),
] satisfies RouteConfig;
