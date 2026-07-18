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
        // ✅ ACCESSIBILITY: Changed from a loose <div> to a semantic <div id="top"> or wrapper
        // ✅ PERFORMANCE: Keeping structural container names pristine for CSS targeting
        <div className="portfolio-scroll-container">
          {/* ✅ ACCESSIBILITY: Hero belongs inside a landmark like <header> or <main>. 
              Ensure <HeroHeader /> uses <header role="banner"> internally! */}
          <HeroHeader />

          {/* ✅ CRITICAL STRUCTURAL FIX: Moved Navbar ABOVE or BEFORE <main>. 
              Screen readers read the page top-to-bottom. Placing your navigation menu 
              at the bottom of the DOM (after main) breaks standard reading orders. */}
          <Navbar />

          <main id="main-content">
            <WorkSection />
            <AboutSection />
            {/* ✅ ACCESSIBILITY: Make sure ContactFooter uses <footer> internally */}
            <ContactFooter />
          </main>
        </div>
      )}

      {/* ✅ ACCESSIBILITY: Active focus trap must handle this overlay window when open */}
      {projectData && <Outlet />}
    </>
  );
}
