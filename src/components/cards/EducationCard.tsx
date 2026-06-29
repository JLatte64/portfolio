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
  const purifiedSchool = purifyString(cardData.school);
  const purifiedTimeframe = purifyString(cardData.timeframe);

  return (
    <Card className={className}>
      <div className={`${className}-card-header`}>
        <h3>{purifiedSchool}</h3>

        <span className={`${className}-timeframe-span`}>
          <span className="sr-only">Timeframe: </span>
          {`[${purifiedTimeframe}]`}
        </span>
      </div>
      <ul className={`${className}-card-body`}>
        <li>{purifyString(cardData.degree)}</li>
      </ul>
    </Card>
  );
};

export default EducationCard;
