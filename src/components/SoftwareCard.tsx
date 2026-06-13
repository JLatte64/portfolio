import Card from "./Card";
import type { CardData } from "./types/CardTypes";
import type { IconData } from "./types/IconTypes";
import { handleIconDisplay } from "./HandleIconDisplay";

export interface SoftwareCardData extends IconData {}

export const SoftwareCard = ({
  cardData,
  className,
}: {
  cardData: CardData;
  className?: string;
}) => {
  const sftwData = cardData as SoftwareCardData;

  return (
    <Card className={`${className} card`.trim()}>
      <div className={`${className} card-body`.trim()}>
        {handleIconDisplay(sftwData)}
        {sftwData.ariaLabel}
      </div>
    </Card>
  );
};
export default SoftwareCard;
