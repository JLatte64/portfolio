import type { ComponentPropsWithoutRef } from "react";

interface CardProps extends ComponentPropsWithoutRef<"div"> {}

export const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <div className={`${className}-card-container`.trim()} {...props}>
      {children}
    </div>
  );
};

export default Card;
