import type { InfoCardProps } from "./InfoCard";
import { myinfo } from "../data/myinfo.json";
import purifyString from "./PurifyString";

export const EducationCardContent: Array<InfoCardProps> = [
  {
    headerContent: (
      <>
        <h3>{purifyString(myinfo.education.school)}</h3>
        <h3>{`[${purifyString(myinfo.education.timeframe)}]`}</h3>
      </>
    ),
    bodyContent: (
      <ul>
        <li>{purifyString(myinfo.education.degree)}</li>
      </ul>
    ),
  },
];

export default EducationCardContent;
