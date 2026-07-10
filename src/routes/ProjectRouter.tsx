// import { useParams, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
// import ProjectModal from "../components/ProjectModal";

// Import your custom interfaces
import type { Project } from "../types/portfolioTypes";

// Import raw JSON data file assets
import rawPortfolioData from "../data/portfolioData.json";

/**
 * 1. Fully Type-Safe Data Wrapper
 * Asserts the shape of your JSON asset file directly at import time.
 * Your IDE will now auto-recognize portfolioData as a true Project[] array.
 */
export const portfolioData: Project[] = rawPortfolioData as Project[];

/**
 * URL Slug Generator Utility
 * Converts human title strings like "E-Commerce Mesh Platform" into clean web slugs like "e-commerce-mesh-platform"
 */
export const getSlug = (title: string): string =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Convert spaces and special characters into single dashes
    .replace(/(^-|-$)/g, ""); // Strip hanging dashes from the outer edges

/**
 * 2. High-Performance Projects Hash Map Generator
 * Automatically recognizes 'project' as the strict Project type.
 */
export const projectsHash = portfolioData.reduce<Record<string, Project>>(
  (hash, project) => {
    const slugKey = getSlug(project.title);
    hash[slugKey] = project;
    return hash;
  },
  {},
);

/**
 * 3. ProjectRouter Route Module Component
 */
export default function ProjectRouter() {
  const { slug } = useParams<{ slug: string }>();
  // const navigate = useNavigate();

  // Instant string lookup execution against the compiled projects table
  const project = slug ? projectsHash[slug] : null;

  // Gracefully return empty if a user typos a URL link path string
  if (!project) {
    return null;
  }

  return (
    <>
      {/* Search Engine Crawler Visibility Anchoring */}
      <Helmet>
        <title>{project.title} | Portfolio</title>
        <meta name="description" content={project.description} />

        {/* Open Graph Metadata for Social Link Sharing Previews */}
        <meta property="og:title" content={`${project.title} | Portfolio`} />
        <meta property="og:description" content={project.description} />
      </Helmet>

      {/* Renders your presentation element, handling closure by dropping back to home path "/" */}
      {/* <ProjectModal 
        project={project} 
        onClose={() => navigate("/")} 
      /> */}
    </>
  );
}
