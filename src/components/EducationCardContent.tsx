import type { InfoCardProps } from "./InfoCard";
import { myinfo } from "../data/myinfo.json";

export const EducationCardContent: Array<InfoCardProps> = [
  {
    headerContent: (
      <>
        {myinfo.education.school}
        {`[${myinfo.education.timeframe}]`}
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
