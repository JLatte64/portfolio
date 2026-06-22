import { projects } from "../data/projects.json";
import type { ProjectData } from "../components/types/ProjectTypes";

const generateSlug = (title: string | undefined) => {
  if (!title) return "";
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
};

export const projectSlugs = new Map(
  (projects as unknown as ProjectData[]).map((p) => [generateSlug(p.title), p]),
);
