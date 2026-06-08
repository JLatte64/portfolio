import { Outlet, ScrollRestoration, createBrowserRouter } from "react-router";
import { Dashboard } from "../pages/Dashboard";
import { NavBar } from "./NavBar";
import { ContactFooter } from "./ContactFooter";
import { About } from "../pages/About";
import TopNavButton from "./TopNavButton";

export function getPagePath(name: string): string {
  switch (name) {
    case "dashboard":
      return "/";
    case "about":
      return "/about";
    default:
      return "/";
  }
}

const pageElements = [
  { path: getPagePath("dashboard"), element: <Dashboard /> },
  { path: getPagePath("about"), element: <About /> },
];

export const pageRouter = createBrowserRouter([
  {
    path: getPagePath("dashboard"),
    element: (
      <>
        <div className="nav-spacer"></div>
        <Outlet />
        <ScrollRestoration />
        <footer>
          <ContactFooter />
        </footer>
        <TopNavButton />
        <NavBar />
      </>
    ),
    children: pageElements,
  },
]);
