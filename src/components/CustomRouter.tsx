import {Outlet, createBrowserRouter} from "react-router";
import {Home} from "../pages/Home";
import {NavBar} from "./NavBar";
import {ContactFooter} from "./ContactFooter";
import {Experience} from "../pages/Experience";
import {About} from "../pages/About";
import {WorkSamples} from "../pages/WorkSamples";
import TopNavButton from "./TopNavButton";

export const navPaths = [
  "/portfolio",
  "/portfolio/work",
  "/portfolio/about",
  "/portfolio/resume",
];

export const pageElements = [
  {path: "/portfolio", element: <Home />},
  {path: "/portfolio/work", element: <WorkSamples />},
  {path: "/portfolio/about", element: <About />},
  {path: "/portfolio/resume", element: <Experience />},
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <div className="nav-spacer"></div>
        <Outlet />
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
