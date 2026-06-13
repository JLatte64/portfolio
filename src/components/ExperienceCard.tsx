import Card from "./Card";
import purifyString from "./PurifyString";
import type { CardData } from "./types/CardTypes";

export type ExpCardData = {
  companyName: string;
  jobTitle: string;
  responsibilities: string[];
  timeframe: string;
};

export const ExperienceCard = ({
  cardData,
  className,
}: {
  cardData: CardData;
  className?: string;
}) => {
  const expData = cardData as ExpCardData;

  return (
    <Card className={`${className} card`.trim()}>
      <div className={`${className} card-header`.trim()}>
        <h3>{`${purifyString(expData.companyName)} | ${purifyString(expData.jobTitle)}`}</h3>
        <h3>{`[${purifyString(expData.timeframe)}]`}</h3>
      </div>
      <ul className={`${className} card-body`.trim()}>
        {expData.responsibilities.map((resp, respIndex) => (
          <li key={respIndex}>{purifyString(resp)}</li>
        ))}
      </ul>
    </Card>
  );
};
export default ExperienceCard;
