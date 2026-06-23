import Card, { type CardData } from "./Card";
import type { IconData } from "../types/IconTypes";
import { handleIconDisplay } from "../functions/HandleIconDisplay";
import "../styles/card-styles/softwareCard.css";

export interface SoftwareCardData extends IconData {}

interface SoftwareCardProps {
  cardData: CardData<SoftwareCardData>;
  className?: string;
}

export const SoftwareCard = ({
  cardData,
  className = "",
}: SoftwareCardProps) => {
  return (
    <Card className={`${className}`.trim()}>
      <div className={`${className}-card`.trim()}>
        {handleIconDisplay(cardData)}
        {cardData.ariaLabel}
      </div>
    </Card>
  );
};

export default SoftwareCard;
