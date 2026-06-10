import type { ComponentPropsWithoutRef, ReactNode } from "react";

export interface CardProps extends ComponentPropsWithoutRef<"div"> {
  children?: ReactNode;
}

export function Card({
  children,
  content,
  className = "",
  ...props
}: CardProps) {
  return (
    <div className={`${className}card`} {...props}>
      {children}
    </div>
  );
}
