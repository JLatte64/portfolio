import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router";
import App from "./App";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Experience } from "./pages/Experience";

const customRouter = createBrowserRouter([
    { path:"/portfolio", element: <><Home /></>},
    { path:"/about", element:<><About /></>},
    { path:"/resume", element:<><Experience /></>},
    { path:"/", element:<><App /></>}
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={customRouter} />
  </StrictMode>,
);
