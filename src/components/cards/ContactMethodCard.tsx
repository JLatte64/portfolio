import Card, { type CardData } from "./Card";
import type { IconData } from "../types/IconTypes";
import { handleIconDisplay } from "../functions/HandleIconDisplay";
import { Link } from "react-router";
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
    <Link
      to={cardData.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={cardData.ariaLabel}
      className={`${className}-card-container`.trim()}
      onClick={(e) => e.stopPropagation()}
    >
      <Card className={`${className}`.trim()}>
        <div className={`${className}-card`.trim()}>
          {handleIconDisplay(cardData)}
        </div>
      </Card>
    </Link>
  );
};

export default ContactCard;
