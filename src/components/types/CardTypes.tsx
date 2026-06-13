import type { EduCardData } from "../EducationCard";
import type { ExpCardData } from "../ExperienceCard";
import type { ProjectData } from "./ProjectTypes";
import type { SoftwareCardData } from "../SoftwareCard";

export type CardData =
  | ExpCardData
  | SoftwareCardData
  | ProjectData
  | EduCardData;
