// src/layouts/PageLayout.tsx
import { Outlet } from "react-router";
import HeroHeader from "../components/sections/HeroHeader";
import WorkSection from "../components/sections/work/WorkSection";
import AboutSection from "../components/sections/AboutSection";
import ContactFooter from "../components/sections/ContactFooter";
import Navbar from "../components/core/Navbar";
import { useProject } from "../hooks/useProject";
import { useLayoutState } from "../hooks/useLayoutState";

export default function PageLayout() {
  const { mountPageLayout } = useLayoutState();
  const { projectData } = useProject();

  return (
    <>
      {mountPageLayout && (
        <>
          <div className="portfolio-scroll-container">
            <HeroHeader />
            <main>
              <WorkSection />
              <AboutSection />
              <ContactFooter />
            </main>
          </div>
          <Navbar />
        </>
      )}
      {projectData && <Outlet />}
    </>
  );
}
