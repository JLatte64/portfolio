import purifyString from "./functions/PurifyString";
import Card from "./Card";
import "../components/styles/educationCard.css";
import type { CardData } from "./types/CardTypes";

export type EduCardData = {
  school: string;
  timeframe: string;
  degree: string;
};

interface EduCardProps {
  cardData: CardData;
  className?: string;
}

export const EducationCard = ({ cardData, className = "" }: EduCardProps) => {
  const data = cardData as EduCardData;

  return (
    <Card className={className}>
      <div className={`education-card-header`.trim()}>
        <h3>{purifyString(data.school)}</h3>
        <h3>{`[${purifyString(data.timeframe)}]`}</h3>
      </div>

      <ul className={`education-card-body`.trim()}>
        <li>{purifyString(data.degree)}</li>
      </ul>
    </Card>
  );
};
export default EducationCard;
