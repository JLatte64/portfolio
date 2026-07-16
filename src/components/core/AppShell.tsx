// src/components/core/AppShell.tsx
import "./AppShell.css";
import { Outlet } from "react-router";
import { LayoutStateProvider } from "../../context/LayoutStateContext";

export { loader, meta } from "./AppShell.handlers";

export default function AppShell() {
  return (
    <LayoutStateProvider>
      <div className="portfolio-app-root" style={{ position: "relative" }}>
        <Outlet />
      </div>
    </LayoutStateProvider>
  );
}
