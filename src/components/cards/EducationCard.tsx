import { Card, type CardData } from "./Card";
import "../styles/card-styles/educationCard.css";
import purifyString from "../functions/PurifyString";

export interface EducationCardData {
  school: string;
  degree: string;
  timeframe: string;
}

interface EducationCardProps {
  cardData: CardData<EducationCardData>;
  className?: string;
}

export const EducationCard = ({
  cardData,
  className = "",
}: EducationCardProps) => {
  return (
    <Card className={className}>
      <div className={`${className}-card-header`}>
        <h3>{purifyString(cardData.school)}</h3>
        <h4>{`[${purifyString(cardData.timeframe)}]`}</h4>
      </div>
      <ul className={`${className}-card-body`}>
        <li>{purifyString(cardData.degree)}</li>
      </ul>
    </Card>
  );
};

export default EducationCard;
