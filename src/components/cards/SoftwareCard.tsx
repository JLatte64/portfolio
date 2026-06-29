import Card, { type CardData } from "./Card";
import type { ImageIconData } from "../types/IconTypes";
import { handleIconDisplay } from "../functions/HandleIconDisplay";
import "../styles/card-styles/softwareCard.css";

export interface SoftwareCardData extends ImageIconData {}

interface SoftwareCardProps {
  cardData: CardData<SoftwareCardData>;
  className?: string;
}

export const SoftwareCard = ({
  cardData,
  className = "",
}: SoftwareCardProps) => {
  const decorativeIconData = {
    ...cardData,
    ariaLabel: "",
  };

  return (
    <Card className={`${className}`.trim()}>
      {handleIconDisplay(decorativeIconData)}

      <span className={`${className}-text-label`.trim()}>
        {cardData.ariaLabel}
      </span>
    </Card>
  );
};

export default SoftwareCard;
