import { getPagePath } from "./components/functions/GetPagePath";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useParams,
} from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { About } from "./pages/About";
import { ContactFooter } from "./components/ContactFooter";
import { NavBar } from "./components/NavBar";
import TopNavButton from "./components/TopNavButton";
import { DashboardProvider } from "./components/DashboardContext";

function RootLayout() {
  const { projectName } = useParams();
  const isFullscreenProjectActive = Boolean(projectName);

  if (isFullscreenProjectActive) {
    return <Outlet />;
  }

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

const pageRouter = createBrowserRouter(
  [
    {
      element: <RootLayout />,
      children: [
        {
          path: getPagePath("dashboard"), // "/"
          element: <Dashboard />,
        },
        {
          path: getPagePath("about"), // "/about"
          element: <About />,
        },
        {
          path: "/project/:projectName",
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
  return (
    <DashboardProvider>
      <RouterProvider router={pageRouter} />
    </DashboardProvider>
  );
}
