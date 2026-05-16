import {myinfo} from "../data/myinfo.json";

export function ProficienciesSection() {
  return (
    <section className="about-proficiencies">
      <h2>Software</h2>
      {/* <IconsList
          clickable={false}
          list={myinfo.software ? myinfo.software : null}
        /> */}
      <h2>Skills</h2>
      {myinfo.resume.skills.map((skill) => (
        <p>{skill}</p>
      ))}
      <h2>Languages</h2>
      <ul>
        {myinfo.languages.map((language) => (
          <li>{language}</li>
        ))}
      </ul>
    </section>
  );
}

export default ProficienciesSection;
