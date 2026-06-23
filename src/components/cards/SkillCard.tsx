import Card, { type CardData } from "./Card";
import "../styles/card-styles/skillCard.css";
import purifyString from "../functions/PurifyString";

export interface SkillCardData {
  skill: string;
}

interface SkillCardProps {
  cardData: CardData<SkillCardData>;
  className?: string;
}

export const SkillCard = ({ cardData, className = "" }: SkillCardProps) => {
  return (
    <Card className={`${className}`.trim()}>
      <div className={`${className}-card`.trim()}>
        {purifyString(cardData.skill)}
      </div>
    </Card>
  );
};

export default SkillCard;
