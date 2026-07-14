import "./PageLayout.css";

import Navbar from "../components/Navbar";
import HeroHeader from "../components/HeroHeader";
import WorkSection from "../components/WorkSection";
import AboutSection from "../components/AboutSection";
import ContactFooter from "../components/ContactFooter";
import { Outlet } from "react-router";
import { useProject } from "../hooks/useProject";

export { loader, meta } from "./PageLayout.handlers";

export default function PageLayout() {
  const { projectData } = useProject();

  return (
    <div className="portfolio-app-root" style={{ position: "relative" }}>
      {!projectData ? (
        <>
          <HeroHeader />
          <main className="portfolio-scroll-container">
            <WorkSection />
            <AboutSection />
            <ContactFooter />
          </main>
          <Navbar />
        </>
      ) : null}
      <Outlet />
    </div>
  );
}
