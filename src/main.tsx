import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./App";
import "./index.css";

// Re-instantiate your client-side browser router scheme using your App.tsx routes array
const router = createBrowserRouter(routes, {
  basename: "/", // Perfectly matches your subfolder deploy path configuration
});

startTransition(() => {
  hydrateRoot(
    document.getElementById("root")!,
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
});
