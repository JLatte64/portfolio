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

export async function clientLoader() {
  return null;
}
