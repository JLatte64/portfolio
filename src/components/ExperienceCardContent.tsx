import type { InfoCardProps } from "./InfoCard";
import { myinfo } from "../data/myinfo.json";

export const ExperienceCardContent: Array<InfoCardProps> =
  myinfo.resume.roles.map((role, index) => ({
    headerContent: (
      <>
        {`${role.companyName} | ${role.jobTitle}`}
        {`[${role.timeframe}]`}
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
