import { Card } from "./Card";
import "../styles/card-styles/projectCard.css";
import purifyString from "../functions/PurifyString";
import type { CardData } from "../cards/Card";
import type { ProjectData } from "../types/ProjectTypes";
import displayMedia from "../functions/DisplayMedia";
import type { Media } from "../types/MediaTypes";

interface ProjectCardProps {
  cardData: CardData;
  className?: string;
  onClick?: (item: CardData) => void;
}

export default function ProjectCard({
  cardData,
  className = "",
  onClick,
}: ProjectCardProps) {
  const data = cardData as unknown as ProjectData;

  return (
    <Card onClick={() => onClick?.(cardData)} className="project">
      {displayMedia(
        data.thumbnail,
        `${className}-card-thumbnail`.trim(),
        false,
      )}
      <span className={`${className}-card-title-background`.trim()}></span>
      <span className={`${className}-card-title`}>
        {purifyString(data.title)}
      </span>
    </Card>
  );
}
