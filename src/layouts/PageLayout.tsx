import { Outlet } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import HeroHeader from "../components/HeroHeader";
// import WorkSection from "../components/WorkSection";
// import AboutSection from "../components/AboutSection";
// import ContactFooter from "../components/ContactFooter";

export default function PageLayout() {
  return (
    <div className="portfolio-app-root" style={{ position: "relative" }}>
      <main className="portfolio-scroll-container">
        {/* <HeroHeader />
        <WorkSection />
        <AboutSection />
        <ContactFooter /> */}
      </main>

      {/* <Navbar /> */}

      {/* Renders the Dialog */}
      <Outlet />
    </div>
  );
}
