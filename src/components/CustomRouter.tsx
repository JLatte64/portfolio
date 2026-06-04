import { Outlet, ScrollRestoration, createBrowserRouter } from "react-router";
import { Home } from "../pages/Home";
import { NavBar } from "./NavBar";
import { ContactFooter } from "./ContactFooter";
import { About } from "../pages/About";
import { ProjectDemo } from "../pages/ProjectDemo";
import TopNavButton from "./TopNavButton";

export const navPaths = [
  "/portfolio",
  "/portfolio/work",
  "/portfolio/about",
  "/portfolio/resume",
];

export const pageElements = [
  { path: "/portfolio", element: <Home /> },
  { path: "/portfolio/work", element: <ProjectDemo /> },
  { path: "/portfolio/about", element: <About /> },
];

export const router = createBrowserRouter([
  {
    path: "/",
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
