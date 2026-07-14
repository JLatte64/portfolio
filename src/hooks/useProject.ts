// src/hooks/useProject.ts
import { useParams } from "react-router";
import { projectSlugToIndexLUT, portfolioData } from "../data/portfolioData";

export function useProject() {
  const { slug } = useParams<{ slug?: string }>();
  const activeIndex =
    slug !== undefined ? projectSlugToIndexLUT[slug] : undefined;
  const projectData =
    activeIndex !== undefined ? portfolioData.projects[activeIndex] : null;

  return {
    slug,
    activeIndex,
    projectData,
  };
}
