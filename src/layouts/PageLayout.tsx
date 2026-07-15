// src/layouts/PageLayout.tsx
import HeroHeader from "../components/sections/HeroHeader";
import WorkSection from "../components/sections/work/WorkSection";
import AboutSection from "../components/sections/AboutSection";
import ContactFooter from "../components/sections/ContactFooter";
import { useLayoutState } from "../context/LayoutStateContext";
import Navbar from "../components/core/Navbar";

export default function PageLayout() {
  const { mountPageLayout, setLastScrollPos } = useLayoutState();
  if (!mountPageLayout) return null;

  return (
    <>
      <div className="portfolio-scroll-container">
        <HeroHeader />
        <main>
          <WorkSection onProjectClick={setLastScrollPos} />
          <AboutSection />
          <ContactFooter />
        </main>
      </div>
      <Navbar />
    </>
  );
}
