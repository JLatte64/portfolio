import type { InfoCardProps } from "./InfoCard";
import { myinfo } from "../data/myinfo.json";
import purifyString from "./PurifyString";

export const ExperienceCardContent: Array<InfoCardProps> =
  myinfo.resume.roles.map((role, index) => ({
    headerContent: (
      <>
        <h3>{`${purifyString(role.companyName)} | ${purifyString(role.jobTitle)}`}</h3>
        <h3>{`[${purifyString(role.timeframe)}]`}</h3>
      </>
    ),
    bodyContent: (
      <ul>
        {role.responsibilities.map((resp, respIndex) => (
          <li key={respIndex}>{purifyString(resp)}</li>
        ))}
      </ul>
    ),
    key: index,
  }));

export default ExperienceCardContent;
