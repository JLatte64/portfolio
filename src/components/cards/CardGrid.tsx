import React, { type ComponentPropsWithoutRef } from "react";
import type { CardData } from "./Card";

interface CardGridProps extends Omit<
  ComponentPropsWithoutRef<"ul">, // 🚀 ACCESSIBILITY UPDATE: Change base type from div to semantic ul
  "onClick"
> {
  items?: CardData<any>[];
  renderComponent: React.ComponentType<{
    cardData: CardData<any>;
    className?: string;
    onClick?: (item: CardData<any>) => void;
    [key: string]: any;
  }>;
  onClick?: (item: CardData<any>) => void;
}

export const CardGrid = ({
  className = "",
  items = [],
  renderComponent: RenderComponent,
  onClick,
  ...props
}: CardGridProps) => (
  /* 🚀 SEMANTIC UPDATE: Converted container element to a native unstyled list */
  <ul className={`${className}-cards-container`.trim()} {...props}>
    {items.map((item, index) => (
      <RenderComponent
        key={item.id || index} // Safe build-time static keys
        cardData={item}
        className={className}
        onClick={onClick}
      />
    ))}
  </ul>
);
