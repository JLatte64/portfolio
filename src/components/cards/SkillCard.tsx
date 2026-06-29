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
  const purifiedSkill = purifyString(cardData.skill);

  return (
    <Card className={`${className}`.trim()}>
      <span className={`${className}-text-badge`.trim()}>{purifiedSkill}</span>
    </Card>
  );
};

export default SkillCard;
