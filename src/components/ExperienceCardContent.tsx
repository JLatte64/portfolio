import type { InfoCardProps } from "./InfoCard";
import { myinfo } from "../data/myinfo.json";

export const ExperienceCardContent: Array<InfoCardProps> =
  myinfo.resume.roles.map((role, index) => ({
    headerContent: (
      <>
        <h3>{`${role.companyName} | ${role.jobTitle}`}</h3>
        <h3>{`[${role.timeframe}]`}</h3>
      </>
    ),
    bodyContent: (
      <ul>
        {role.responsibilities.map((resp, respIndex) => (
          <li key={respIndex}>{resp}</li>
        ))}
      </ul>
    ),
    key: index,
  }));

export default ExperienceCardContent;
