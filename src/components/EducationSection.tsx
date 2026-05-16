import {myinfo} from "../data/myinfo.json";

export function EducationSection() {
  return (
    <section id="education">
      <h2>Education</h2>
      <h4>{myinfo.education.school}</h4>
      <h5>
        {myinfo.education.degree} ({myinfo.education.timeframe})
      </h5>
    </section>
  );
}

export default EducationSection;
