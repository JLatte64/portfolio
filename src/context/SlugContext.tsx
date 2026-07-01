// src/context/SlugContext.tsx
import React, {createContext, useContext, useMemo} from "react";
import {projects} from "../data/projects.json";
import type {ProjectData} from "../components/types/ProjectTypes";

interface SlugContextType {
  processedProjects: ProjectData[];
  slugToProject: Map<string, ProjectData>;
  titleToSlug: Record<string, string>;
}

const SlugContext = createContext<SlugContextType | undefined>(undefined);

export function generateSlug(title: string | undefined): string {
  if (!title) return "project";
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export const SlugProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const lookupTables = useMemo(() => {
    const slugToProject = new Map<string, ProjectData>();
    const titleToSlug: Record<string, string> = {};

    const processedProjects = (projects as ProjectData[]).map((project) => {
      const calculatedSlug = generateSlug(project.title);

      if (project.title) {
        titleToSlug[project.title] = calculatedSlug;
      }

      const injectedProject: ProjectData = {
        ...project,
        id: project.id || `proj-${calculatedSlug}`,

        bodySections: (project.bodySections ?? []).map((section, secIndex) => ({
          ...section,
          id: section.id || `sec-${calculatedSlug}-${secIndex}`,

          sectionMedia: (section.sectionMedia ?? []).map(
            (media, mediaIndex) => ({
              ...media,
              id:
                media.id || `media-${calculatedSlug}-${secIndex}-${mediaIndex}`,
            }),
          ),
        })),
      };

      slugToProject.set(calculatedSlug, injectedProject);

      return injectedProject;
    });

    return {processedProjects, slugToProject, titleToSlug};
  }, []);

  return (
    <SlugContext.Provider value={lookupTables}>{children}</SlugContext.Provider>
  );
};

export const useSlugs = () => {
  const context = useContext(SlugContext);
  if (!context) {
    throw new Error(
      "useSlugs must be executed strictly within a valid <SlugProvider /> wrapper.",
    );
  }
  return context;
};
