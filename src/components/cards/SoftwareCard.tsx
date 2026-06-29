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
  /* 🚀 ACCESSIBILITY FIX: Because the software name is already fully visible on the card,
     we pass a modified object with a blank label into our image utility. This treats the 
     inline logo image as purely decorative (alt="") and avoids a redundant double-readout. */
  const decorativeIconData = {
    ...cardData,
    ariaLabel: "",
  };

  return (
    <Card className={`${className}`.trim()}>
      {handleIconDisplay(decorativeIconData)}

      {/* 🚀 ACCESSIBILITY FIX: Wrapped text inside a semantic inline element 
          to guarantee clear line-height layouts and font tracking rules */}
      <span className={`${className}-text-label`.trim()}>
        {cardData.ariaLabel}
      </span>
    </Card>
  );
};

export default SoftwareCard;
