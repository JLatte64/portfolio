import { Card } from "./Card";
import "../styles/card-styles/projectCard.css";
import purifyString from "../functions/PurifyString";
import type { CardData } from "../cards/Card";
import type { ProjectData } from "../types/ProjectTypes";
import displayMedia from "../functions/DisplayMedia";

interface ProjectCardProps {
  // 🚀 TYPE SAFETY FIX: Explicitly enforce the structural ProjectData interface
  cardData: CardData<ProjectData>;
  className?: string;
  onClick?: (item: CardData<ProjectData>) => void;
}

export default function ProjectCard({
  cardData,
  className = "",
  onClick,
}: ProjectCardProps) {
  const purifiedTitle = purifyString(cardData.title);

  return (
    /* 🚀 ACCESSIBILITY FIX: Passing onClick triggers our central Card's role="button" 
       and tabIndex={0} structures, fully unlocking standard keyboard access hooks! */
    <Card onClick={() => onClick?.(cardData)} className="project">
      {displayMedia(
        cardData.thumbnail,
        `${className}-card-thumbnail`.trim(),
        false,
      )}

      {/* Structural background mask layer safely ignored by assistive tech speech streams */}
      <span
        className={`${className}-card-title-background`.trim()}
        aria-hidden="true"
      />

      {/* 🚀 SEMANTIC UPDATE: Swapped out generic span for a standard visible label header */}
      <strong className={`${className}-card-title`}>{purifiedTitle}</strong>
    </Card>
  );
}
