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
  const purifiedCompany = purifyString(cardData.companyName);
  const purifiedTitle = purifyString(cardData.jobTitle);
  const purifiedTimeframe = purifyString(cardData.timeframe);

  return (
    <Card className={className}>
      <div className="role-card-header">
        <h3>{`${purifiedCompany} | ${purifiedTitle}`}</h3>
        <span className="role-card-timeframe-span">
          <span className="sr-only">Timeframe: </span>
          {`[${purifiedTimeframe}]`}
        </span>
      </div>

      <ul className="role-card-body">
        {cardData.responsibilities.map((resp, respIndex) => (
          <li key={`${cardData.id}-resp-${respIndex}`}>{purifyString(resp)}</li>
        ))}
      </ul>
    </Card>
  );
};

export default RoleCard;
