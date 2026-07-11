// src/layouts/PageLayout.tsx

import { useParams } from "react-router";
import { projectSlugToIndexLUT } from "../data/portfolioData";
import "./PageLayout.css";

import Navbar from "../components/Navbar";
import HeroHeader from "../components/HeroHeader";
import WorkSection from "../components/WorkSection";
import AboutSection from "../components/AboutSection";
import ContactFooter from "../components/ContactFooter";
import ProjectModal from "../components/ProjectModal";

export default function PageLayout() {
  const { slug } = useParams<{ slug?: string }>();
  const activeIndex =
    slug !== undefined ? projectSlugToIndexLUT[slug] : undefined;

  return (
    <div className="portfolio-app-root" style={{ position: "relative" }}>
      <main className="portfolio-scroll-container">
        <HeroHeader />
        <WorkSection />
        <AboutSection />
        <ContactFooter />
      </main>

      <Navbar />
      {activeIndex !== null && (
        <ProjectModal key={`active-modal-node-${activeIndex}`} />
      )}
    </div>
  );
}

export async function clientLoader() {
  return null;
}
