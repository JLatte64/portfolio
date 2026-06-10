import { Card } from "./Card";
import "../components/styles/infoCard.css";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export interface InfoCardProps extends ComponentPropsWithoutRef<"div"> {
  bodyContent: ReactNode;
  headerContent: ReactNode;
}

export function InfoCard({
  headerContent,
  bodyContent,
  className = "",
  ...props
}: InfoCardProps) {
  return (
    <Card className={className} {...props}>
      <div className={`${className}-card-header`}>
        <div className={`${className}-card-title`}>{headerContent}</div>
      </div>
      <div className={`${className}-card-body`}>{bodyContent}</div>
    </Card>
  );
}
