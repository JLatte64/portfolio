import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Contact } from "./pages/Contact.tsx";
import { Resume } from "./pages/Resume.tsx";
import { About } from "./pages/About.tsx";

export const CustomRouter = createBrowserRouter(
  [
    {path: '/portfolio', element: <App />},
    {path: '/contact', element: <Contact />},
    {path: '/resume', element: <Resume />},
    {path: '/about', element: <About />}
  ]
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={CustomRouter} />
  </StrictMode>,
);
