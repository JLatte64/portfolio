import "./PageLayout.css";
import Navbar from "../components/Navbar";
import HeroHeader from "../components/HeroHeader";
import WorkSection from "../components/WorkSection";
import AboutSection from "../components/AboutSection";
import ContactFooter from "../components/ContactFooter";
import { Outlet } from "react-router";
import { LayoutStateProvider } from "../context/LayoutStateContext";
import { useLayoutState } from "../hooks/useLayoutState";

export { loader, meta } from "./PageLayout.handlers";

function PageLayoutContent() {
  const { mountPageLayout } = useLayoutState();

  return (
    <div className="portfolio-app-root" style={{ position: "relative" }}>
      {mountPageLayout ? (
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
      ) : null}

      <Outlet />
    </div>
  );
}

export default function PageLayout() {
  return (
    <LayoutStateProvider>
      <PageLayoutContent />
    </LayoutStateProvider>
  );
}
