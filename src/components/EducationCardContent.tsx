import type { InfoCardProps } from "./InfoCard";
import { myinfo } from "../data/myinfo.json";

export const EducationCardContent: Array<InfoCardProps> = [
  {
    headerContent: (
      <>
        <h3>{myinfo.education.school}</h3>
        <h3>{`[${myinfo.education.timeframe}]`}</h3>
      </>
    ),
    bodyContent: (
      <ul>
        <li>{myinfo.education.degree}</li>
      </ul>
    ),
  },
];

export default EducationCardContent;
