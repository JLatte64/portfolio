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
  return (
    <Card className={`${className}`.trim()}>{purifyString(cardData.lang)}</Card>
  );
};

export default LanguageCard;
