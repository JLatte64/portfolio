import { Children, type ComponentPropsWithoutRef, type ReactNode } from "react";

interface CardGridProps extends ComponentPropsWithoutRef<"div"> {
  children?: ReactNode;
}

export function CardGrid({
  children,
  className = "",
  ...props
}: CardGridProps) {
  return (
    <div className={`${className}cards-container`}>
      {Children.map(children, (child, index) => (
        <div className={`${className}card-container`} key={index} {...props}>
          {child}
        </div>
      ))}
    </div>
  );
}
