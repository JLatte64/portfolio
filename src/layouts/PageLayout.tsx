// src/layouts/PageLayout.tsx
import { Outlet } from "react-router";
import HeroHeader from "../components/sections/HeroHeader";
import WorkSection from "../components/sections/work/WorkSection";
import AboutSection from "../components/sections/AboutSection";
import ContactFooter from "../components/sections/ContactFooter";
import { useLayoutState } from "../context/LayoutStateContext";
import Navbar from "../components/core/Navbar";
import { useProject } from "../hooks/useProject";

export default function PageLayout() {
  const { mountPageLayout, setLastScrollPos } = useLayoutState();
  const { projectData } = useProject();

  return (
    <>
      {mountPageLayout && (
        <div className="portfolio-scroll-container">
          <HeroHeader />
          <main>
            <WorkSection onProjectClick={setLastScrollPos} />
            <AboutSection />
            <ContactFooter />
          </main>
          <Navbar />
        </div>
      )}

      {projectData && <Outlet />}
    </>
  );
}
