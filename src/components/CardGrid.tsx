import React, { type ComponentPropsWithoutRef } from "react";
import type { CardData } from "./types/CardTypes";

interface CardGridProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "onClick"
> {
  items?: CardData[];
  renderComponent: React.ComponentType<{
    cardData: CardData;
    className?: string;
    onClick?: (item: CardData) => void;
    [key: string]: any;
  }>;
  onClick?: (item: CardData) => void;
}

export const CardGrid = ({
  className = "",
  items = [],
  renderComponent: RenderComponent,
  onClick,
  ...props
}: CardGridProps) => (
  <div className={`${className}-cards-container`.trim()} {...props}>
    {items.map((item, index) => (
      <RenderComponent
        key={index}
        cardData={item}
        className={className}
        onClick={onClick}
      />
    ))}
  </div>
);
