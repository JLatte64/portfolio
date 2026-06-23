import type { ComponentPropsWithoutRef } from "react";

interface CardProps extends ComponentPropsWithoutRef<"div"> {}

export type CardData<T = Record<string, unknown>> = T & {
  id: string;
};

export const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <div className={`${className}-card-container`.trim()} {...props}>
      {children}
    </div>
  );
};

export default Card;
