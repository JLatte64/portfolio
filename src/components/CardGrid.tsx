import { Children, type ComponentPropsWithoutRef, type ReactNode } from "react";

interface CardGridProps extends ComponentPropsWithoutRef<"div"> {
  children?: ReactNode;
}

export function CardGrid({
  children,
  className = "",
  ...props
}: CardGridProps) {
  const containerClass = className
    ? `${className}cards-container`
    : "cards-container";
  const itemClass = className ? `${className}card-container` : "card-container";

  return (
    // {...props} belongs on the top layer layout grid element container
    <div className={containerClass} {...props}>
      {Children.map(children, (child, index) => (
        <div className={itemClass} key={index}>
          {child}
        </div>
      ))}
    </div>
  );
}
