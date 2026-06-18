import Card from "./Card";
import "../components/styles/roleCard.css";
import purifyString from "./functions/PurifyString";
import type { CardData } from "./types/CardTypes";

export type ExpCardData = {
  companyName: string;
  jobTitle: string;
  responsibilities: string[];
  timeframe: string;
};

interface ExpCardProps {
  cardData: CardData;
  className?: string;
}

export const ExperienceCard = ({ cardData, className = "" }: ExpCardProps) => {
  const expData = cardData as ExpCardData;

  return (
    <Card className={className}>
      <div className={`role-card-header`}>
        <h3>{`${purifyString(expData.companyName)} | ${purifyString(expData.jobTitle)}`}</h3>
        <h3>{`[${purifyString(expData.timeframe)}]`}</h3>
      </div>
      <ul className={`role-card-body`}>
        {expData.responsibilities.map((resp, respIndex) => (
          <li key={respIndex}>{purifyString(resp)}</li>
        ))}
      </ul>
    </Card>
  );
};
export default ExperienceCard;
