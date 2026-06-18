import { Card } from "./Card";
import "./styles/projectCard.css";
import purifyString from "./functions/PurifyString";
import type { CardData } from "./types/CardTypes";
import type { ProjectData } from "./types/ProjectTypes";

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
      <img
        src={data.thumbnail?.src ?? ""}
        alt={data.thumbnail?.alt ?? ""}
        className={`${className}-card-thumbnail`.trim()}
      />
      <span className={`${className}-card-title`.trim()}>
        {purifyString(data.title)}
      </span>
    </Card>
  );
}
