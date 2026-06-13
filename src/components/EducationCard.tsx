import purifyString from "./PurifyString";
import Card from "./Card";
import type { CardData } from "./types/CardTypes";

export type EduCardData = {
  school: string;
  timeframe: string;
  degree: string;
};

export const EducationCard = ({
  cardData,
  className,
}: {
  cardData: CardData;
  className?: string;
}) => {
  const data = cardData as EduCardData;

  return (
    <Card className={`${className} card`.trim()}>
      <div className={`${className} card-header`.trim()}>
        <h3>{purifyString(data.school)}</h3>
        <h3>{`[${purifyString(data.timeframe)}]`}</h3>
      </div>

      <ul className={`${className} card-body`.trim()}>
        <li>{purifyString(data.degree)}</li>
      </ul>
    </Card>
  );
};
export default EducationCard;
