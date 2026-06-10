import { CardGrid } from "./CardGrid";
import { InfoCard, type InfoCardProps } from "./InfoCard";
import { myinfo } from "../data/myinfo.json";

export interface InfoCardGridProps {
  className?: string;
  cardContent: Array<InfoCardProps>;
}

export default function InfoCardGrid(props: InfoCardGridProps) {
  if (!myinfo) return <h3>Loading info...</h3>;

  return (
    <CardGrid className={props.className}>
      {props.cardContent.map((card, index) => (
        <InfoCard
          headerContent={card.headerContent}
          bodyContent={card.bodyContent}
          className={props.className}
          key={index}
        ></InfoCard>
      ))}
    </CardGrid>
  );
}
