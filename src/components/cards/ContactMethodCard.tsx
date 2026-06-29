import Card, { type CardData } from "./Card";
import type { IconData } from "../types/IconTypes";
import { handleIconDisplay } from "../functions/HandleIconDisplay";
import "../styles/card-styles/contactMethodCard.css";

export interface ContactCardData extends IconData {
  url: string;
  ariaLabel: string;
}

interface ContactCardDataProps {
  cardData: CardData<ContactCardData>;
  className?: string;
}

export const ContactCard = ({
  cardData,
  className = "",
}: ContactCardDataProps) => {
  return (
    <a
      href={cardData.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={cardData.ariaLabel}
      className={`${className}-card-link-wrapper`.trim()}
      onClick={(e) => e.stopPropagation()}
    >
      <Card className={`${className}`.trim()}>
        {handleIconDisplay(cardData)}
      </Card>
    </a>
  );
};

export default ContactCard;
