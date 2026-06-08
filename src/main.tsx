import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { pageRouter } from "./components/PageRoutes";
import { RouterProvider } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={pageRouter} />
  </StrictMode>,
);
