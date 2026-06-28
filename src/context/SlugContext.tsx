// src/context/SlugContext.tsx
import React, { createContext, useContext, useMemo } from "react";
import { projects } from "../data/projects.json";
import type { ProjectData } from "../components/types/ProjectTypes";

/* ========================================================
   1. TYPESCRIPT HOOK INTERFACES
   ======================================================== */
interface SlugContextType {
  processedProjects: ProjectData[]; // Flat collection stream fed into your card layouts
  slugToProject: Map<string, ProjectData>; // Immediate lookup: URL Slug ➔ Project Data
  titleToSlug: Record<string, string>; // Immediate lookup: Title Text ➔ URL Slug
}

const SlugContext = createContext<SlugContextType | undefined>(undefined);

/* ========================================================
   2. RUNTIME SLUG STRING GENERATOR UTILITY
   ======================================================== */
export const generateSlug = (title: string | undefined): string => {
  if (!title) return "project";
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Strips complex glyph symbols/brackets out safely
    .replace(/\s+/g, "-"); // Flattens space margins to neat URL string baselines
};

/* ========================================================
   3. THE CENTRAL PROVIDER COMPONENT (MOUNTED AT APP ROOT)
   ======================================================== */
export const SlugProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // useMemo compiles these arrays EXACTLY once when the browser first bundles this context layer.
  // It completely stops re-calculation during subsequent state refreshes or page scrolling.
  const lookupTables = useMemo(() => {
    const slugToProject = new Map<string, ProjectData>();
    const titleToSlug: Record<string, string> = {};

    // Map over your raw json data directly to inject missing structural IDs and cache hashes
    const processedProjects = (projects as ProjectData[]).map((project) => {
      const calculatedSlug = generateSlug(project.title);

      // Seed our direct text lookup index object instantly
      if (project.title) {
        titleToSlug[project.title] = calculatedSlug;
      }

      /* --------------------------------------------------------
         🚀 RUNTIME INJECTION LOGIC
         Provides stable unique identifier tags for React loop tracking
         -------------------------------------------------------- */
      const injectedProject: ProjectData = {
        ...project,
        // If raw JSON contains no ID, fall back to project slug tokens
        id: project.id || `proj-${calculatedSlug}`,

        // Deeply map section blocks to append project-specific unique strings
        bodySections: (project.bodySections ?? []).map((section, secIndex) => ({
          ...section,
          id: section.id || `sec-${calculatedSlug}-${secIndex}`,

          // Deeply map inner layout image/video media nodes to lock keys
          sectionMedia: (section.sectionMedia ?? []).map(
            (media, mediaIndex) => ({
              ...media,
              id:
                media.id || `media-${calculatedSlug}-${secIndex}-${mediaIndex}`,
            }),
          ),
        })),
      };

      // Store the fully injected object into the Map, instantly referenceable via URL parameters
      slugToProject.set(calculatedSlug, injectedProject);

      return injectedProject;
    });

    return { processedProjects, slugToProject, titleToSlug };
  }, []);

  return (
    <SlugContext.Provider value={lookupTables}>{children}</SlugContext.Provider>
  );
};

/* ========================================================
   4. THE CUSTOM O(1) PERFORMANCE HOOK
   ======================================================== */
export const useSlugs = () => {
  const context = useContext(SlugContext);
  if (!context) {
    throw new Error(
      "useSlugs must be executed strictly within a valid <SlugProvider /> wrapper.",
    );
  }
  return context;
};
