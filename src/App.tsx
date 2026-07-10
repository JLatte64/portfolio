import PageLayout from "./layouts/PageLayout";
import ProjectRouter from "./routes/ProjectRouter";
import { HelmetProvider } from "react-helmet-async";

// 1. Export only the raw routes configuration
export const routes = [
  {
    path: "/",
    // Wrap the top-level parent component right inside the element block
    element: (
      <HelmetProvider>
        <PageLayout />
      </HelmetProvider>
    ),
    children: [
      {
        path: "projects/:slug",
        element: <ProjectRouter />,
      },
    ],
  },
];

export default function App() {
  return <PageLayout />;
}
