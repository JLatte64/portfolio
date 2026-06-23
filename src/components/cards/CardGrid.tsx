import React, { type ComponentPropsWithoutRef } from "react";
import type { CardData } from "./Card";

interface CardGridProps extends Omit<
  ComponentPropsWithoutRef<"div">,
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
  <div className={`${className}-cards-container`.trim()} {...props}>
    {items.map((item, index) => (
      <RenderComponent
        key={item.id || index}
        cardData={item}
        className={className}
        onClick={onClick}
      />
    ))}
  </div>
);
