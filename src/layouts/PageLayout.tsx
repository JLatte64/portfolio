import { useParams, useNavigate } from "react-router";
import { portfolioData, projectSlugLUT } from "../data/portfolioData";
import { useEffect } from "react";

import Navbar from "../components/Navbar";
import HeroHeader from "../components/HeroHeader";
import WorkSection from "../components/WorkSection";
import AboutSection from "../components/AboutSection";
import ContactFooter from "../components/ContactFooter";
import ProjectModal from "../components/ProjectModal";

export default function PageLayout() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && slug) {
        navigate("/"); // Safely clears out the path param segment, unmounting the overlay
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [slug, navigate]);

  const activeIndex = slug ? projectSlugLUT[slug] : undefined;
  const project =
    activeIndex !== undefined ? portfolioData.projects[activeIndex] : null;

  return (
    <div className="portfolio-app-root" style={{ position: "relative" }}>
      <main className="portfolio-scroll-container">
        <HeroHeader />
        <WorkSection />

        <AboutSection />
        <ContactFooter />
      </main>

      <Navbar />

      {project && (
        <ProjectModal project={project} onClose={() => navigate("/")} />
      )}
    </div>
  );
}

// 🚀 THE CRITICAL FIX FOR THE BLANK ELEMENT VIEWPORTS:
// Exporting an empty clientLoader tells the React Router v7 SSG build engine
// to treat this route as a purely client-hydrated SPA element, forcing your
// PageLayout component layout to render on the screen instantly!
export async function clientLoader() {
  return null;
}
