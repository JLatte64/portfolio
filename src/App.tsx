import { getPagePath } from "./components/GetPagePath";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { About } from "./pages/About";
import SmartScrollRestoration from "./components/SmartScrollRestoration";
import { ContactFooter } from "./components/ContactFooter";
import { NavBar } from "./components/NavBar";
import TopNavButton from "./components/TopNavButton";

const pageElements = [
  { path: getPagePath("dashboard"), element: <Dashboard /> },
  { path: getPagePath("about"), element: <About /> },
];

export const pageRouter = createBrowserRouter([
  {
    path: getPagePath("dashboard"),
    element: (
      <>
        <SmartScrollRestoration />
        <div className="nav-spacer" />
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

export default function App() {
  return <RouterProvider router={pageRouter} />;
}
