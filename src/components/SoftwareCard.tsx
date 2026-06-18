import Card from "./Card";
import type { CardData } from "./types/CardTypes";
import type { IconData } from "./types/IconTypes";
import { handleIconDisplay } from "./functions/HandleIconDisplay";
import "../components/styles/softwareCard.css";

export interface SoftwareCardData extends IconData {}

interface SoftwareCardProps {
  cardData: CardData;
  className?: string;
}

export const SoftwareCard = ({
  cardData,
  className = "",
}: SoftwareCardProps) => {
  const sftwData = cardData as SoftwareCardData;

  return (
    <Card className={`${className}`.trim()}>
      <div className={`${className}-card`.trim()}>
        {handleIconDisplay(sftwData)}
        {sftwData.ariaLabel}
      </div>
    </Card>
  );
};
export default SoftwareCard;
