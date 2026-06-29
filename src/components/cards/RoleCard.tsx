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
        {/* 🚀 ACCESSIBILITY FIX: Fits perfectly as an H3 child under your About section's H2 */}
        <h3>{`${purifiedCompany} | ${purifiedTitle}`}</h3>

        {/* 🚀 SEMANTIC FIX: Converted timeframe to a clean text label node with hidden screen-reader guidance */}
        <span className="role-card-timeframe-span">
          <span className="sr-only">Timeframe: </span>
          {`[${purifiedTimeframe}]`}
        </span>
      </div>

      <ul className="role-card-body">
        {cardData.responsibilities.map((resp, respIndex) => (
          /* 🚀 PERFORMANCE FIX: Combined your stable Context ID with the index to lock in a permanent, frozen key */
          <li key={`${cardData.id}-resp-${respIndex}`}>{purifyString(resp)}</li>
        ))}
      </ul>
    </Card>
  );
};

export default RoleCard;
