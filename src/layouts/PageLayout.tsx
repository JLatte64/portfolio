// src/layouts/PageLayout.tsx

import { useParams, useNavigate } from "react-router";
import { portfolioData, projectSlugLUT } from "../data/portfolioData";
import "./PageLayout.css";

import Navbar from "../components/Navbar";
import HeroHeader from "../components/HeroHeader";
import WorkSection from "../components/WorkSection";
import AboutSection from "../components/AboutSection";
import ContactFooter from "../components/ContactFooter";
import ProjectModal from "../components/ProjectModal";

export default function PageLayout() {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  // ✅ THE DYNAMIC LUT CACHE LOOKUP:
  // Symmetrically maps the text parameter primitive against your pre-built keys!
  const activeIndex = slug ? projectSlugLUT[slug] : undefined;
  const project =
    activeIndex !== undefined ? portfolioData.projects[activeIndex] : null;

  return (
    <div className="portfolio-app-root" style={{ position: "relative" }}>
      {/* 
        ✅ IMMUNE TO DUPLICATION AND COLLAPSES:
        Because we removed <Outlet /> and the nested layout loop wrapper,
        your homepage elements render exactly ONCE. When you close the modal,
        the background sections remain fully visible and active down the DOM tree!
      */}
      <main className="portfolio-scroll-container">
        <HeroHeader />
        <WorkSection />
        <AboutSection />
        <ContactFooter />
      </main>

      <Navbar />

      {/* ✅ The modal is pure; it mounts immediately when the card link populates the slug parameter */}
      {project && (
        <ProjectModal
          project={project}
          onClose={() => navigate("/")} // ⚡ Resets the parameter trailing path cleanly on close
        />
      )}
    </div>
  );
}

export async function clientLoader() {
  return null;
}
