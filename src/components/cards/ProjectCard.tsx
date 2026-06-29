import { Card } from "./Card";
import "../styles/card-styles/projectCard.css";
import purifyString from "../functions/PurifyString";
import type { CardData } from "../cards/Card";
import type { ProjectData } from "../types/ProjectTypes";
import displayMedia from "../functions/DisplayMedia";

interface ProjectCardProps {
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
    <Card onClick={() => onClick?.(cardData)} className="project">
      {displayMedia(
        cardData.thumbnail,
        `${className}-card-thumbnail`.trim(),
        false,
      )}

      <span
        className={`${className}-card-title-background`.trim()}
        aria-hidden="true"
      />

      <strong className={`${className}-card-title`}>{purifiedTitle}</strong>
    </Card>
  );
}
