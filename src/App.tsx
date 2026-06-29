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
import TopNavButton from "./components/buttons/TopNavButton";
import { DashboardProvider } from "./context/DashboardContext";
import { SlugProvider, useSlugs } from "./context/SlugContext";
import { ToastEmitter } from "./components/ToastEmitter";

function RootLayout() {
  const { projectName } = useParams();
  const { slugToProject } = useSlugs();

  const isValidProject = projectName ? slugToProject.has(projectName) : false;
  const isFullscreenProjectActive = Boolean(projectName) && isValidProject;

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
        { path: getPagePath("dashboard"), element: <Dashboard /> },
        { path: getPagePath("about"), element: <About /> },
        { path: ":projectName", element: <Dashboard /> },
      ],
    },
  ],
  { basename: "/portfolio" },
);

export default function App() {
  return (
    <DashboardProvider>
      <SlugProvider>
        <RouterProvider router={pageRouter} />
        <ToastEmitter />
      </SlugProvider>
    </DashboardProvider>
  );
}
