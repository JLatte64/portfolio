import type { ComponentPropsWithoutRef } from "react";

// 🚀 ACCESSIBILITY UPDATE: Change base type to "li" since cards belong in a structural list tree
interface CardProps extends ComponentPropsWithoutRef<"li"> {
  onClick?: (
    e: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>,
  ) => void;
}

export type CardData<T = Record<string, unknown>> = T & {
  id: string;
};

export const Card = ({ children, className, onClick, ...props }: CardProps) => {
  const isClickable = Boolean(onClick);

  // 🚀 KEYBOARD INTERACTION TRIGGER: Handles spacebar and enter keys safely on focused cards
  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
    if (!onClick) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault(); // Prevents page scrolling behavior on spacebar tap
      onClick(e);
    }
  };

  return (
    <li
      className={`${className}-card-container`.trim()}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      /* 🚀 ACCESSIBILITY FIX: Explicitly grant structural button semantics if clickable */
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined} // Allows keyboard navigators to 'Tab' onto active cards
      {...props}
    >
      {children}
    </li>
  );
};

export default Card;
