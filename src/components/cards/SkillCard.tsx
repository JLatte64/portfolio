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
      {/* 🚀 ACCESSIBILITY FIX: Replaced the unsemantic inner <div> wrapper with a clean,
          semantic text element to handle font family and tracking variables cleanly */}
      <span className={`${className}-text-badge`.trim()}>{purifiedSkill}</span>
    </Card>
  );
};

export default SkillCard;
