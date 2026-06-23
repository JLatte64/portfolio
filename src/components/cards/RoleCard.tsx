import Card, { type CardData } from "./Card";
import "../styles/card-styles/roleCard.css";
import purifyString from "../functions/PurifyString";

export type RoleCardData = {
  companyName: string;
  jobTitle: string;
  responsibilities: string[];
  timeframe: string;
};

interface RoleCardProps {
  cardData: CardData<RoleCardData>;
  className?: string;
}

export const RoleCard = ({ cardData, className = "" }: RoleCardProps) => {
  return (
    <Card className={className}>
      <div className={`role-card-header`}>
        <h3>{`${purifyString(cardData.companyName)} | ${purifyString(cardData.jobTitle)}`}</h3>
        <h4>{`[${purifyString(cardData.timeframe)}]`}</h4>
      </div>
      <ul className={`role-card-body`}>
        {cardData.responsibilities.map((resp, respIndex) => (
          <li key={respIndex}>{purifyString(resp)}</li>
        ))}
      </ul>
    </Card>
  );
};

export default RoleCard;
