import {Link} from "react-router";
import {myinfo} from "../data/myinfo.json";

export function Experience() {
  const webResumeText = myinfo.resume.roles.map((roles) => (
    <>
      <h4>{roles.role === "" ? null : roles.role}</h4>
      <h4>({roles.timeframe === "" ? null : roles.timeframe})</h4>
      <p>{roles.desc === "" ? null : roles.desc}</p>
    </>
  ));

  return (
    <>
      <section id="experience">
        <h2>Experience</h2>
        <Link to="">Resume (PDF)</Link>
        {webResumeText}
      </section>
    </>
  );
}
