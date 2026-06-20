import { getPagePath } from "./components/functions/GetPagePath";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { About } from "./pages/About";
import { ContactFooter } from "./components/ContactFooter";
import { NavBar } from "./components/NavBar";
import TopNavButton from "./components/TopNavButton";

function RootLayout() {
  return (
    <>
      <div className="nav-spacer" />
      <Outlet />
      <footer>
        <ContactFooter />
      </footer>
      <TopNavButton />
      <NavBar />
    </>
  );
}

export const pageRouter = createBrowserRouter(
  [
    {
      element: <RootLayout />,
      children: [
        {
          path: getPagePath("dashboard"),
          element: <Dashboard />,
        },
        {
          path: getPagePath("about"),
          element: <About />,
        },
        {
          path: ":projectName",
          element: <Dashboard />,
        },
      ],
    },
  ],
  {
    basename: "/portfolio",
  },
);

export default function App() {
  return <RouterProvider router={pageRouter} />;
}
