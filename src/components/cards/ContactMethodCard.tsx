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
    /* 🚀 ACCESSIBILITY FIX: Converted to a clean, native external anchor link 
       that acts as the single, definitive interactive wrapper element */
    <a
      href={cardData.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={cardData.ariaLabel}
      className={`${className}-card-link-wrapper`.trim()}
      onClick={(e) => e.stopPropagation()}
    >
      {/* 🚀 ACCESSIBILITY FIX: Render Card without custom onClick props. 
          This prevents Card from injecting conflicting 'role="button"' or 
          tabIndex markers, keeping the DOM structure perfectly valid. */}
      <Card className={`${className}`.trim()}>
        {handleIconDisplay(cardData)}
      </Card>
    </a>
  );
};

export default ContactCard;
