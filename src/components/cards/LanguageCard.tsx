import Card, { type CardData } from "./Card";
import "../styles/card-styles/languageCard.css";
import purifyString from "../functions/PurifyString";

export interface LangCardData {
  lang: string;
}

interface LangCardProps {
  cardData: CardData<LangCardData>;
  className?: string;
}

export const LanguageCard = ({ cardData, className = "" }: LangCardProps) => {
  const purifiedLang = purifyString(cardData.lang);

  return (
    <Card className={`${className}`.trim()}>
      {/* 🚀 ACCESSIBILITY FIX: Wrapped text inside a semantic text node 
          to enforce clear layout text baselines and responsive font inheritance */}
      <span className={`${className}-text-label`}>{purifiedLang}</span>
    </Card>
  );
};

export default LanguageCard;
