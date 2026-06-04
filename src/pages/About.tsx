import { Link } from "react-router";
import "../components/styles/page-styles/about.css";
import { myinfo } from "../data/myinfo.json";

export function About() {
  return (
    <main>
      <div className="about-full-content">
        <div className="about-intro">
          <p className="about-story">
            I'm {myinfo.name}. {myinfo.about.full}
          </p>
          <img
            src={`${import.meta.env.BASE_URL}/photos/${myinfo.photo}`}
            alt={`${myinfo.name} photo`}
            className="about-photo"
          />
        </div>
        <Link to="/portfolio/resume">Download/View Resume (PDF)</Link>
        <section className="about-intro">
          <h2>Professional Experience</h2>
          {myinfo.resume.experience.map((experience, index) => (
            <div className="experience-card" key={index}>
              <div className="experience-card-header">
                <h3>
                  {experience.companyName === ""
                    ? null
                    : experience.companyName}{" "}
                  | {experience.jobTitle === "" ? null : experience.jobTitle}
                </h3>
                <h3>
                  [{experience.timeframe === "" ? null : experience.timeframe}]
                </h3>
              </div>
              <div className="experience-card-body">
                <ul>
                  <li>Job Responsibility 1</li>
                  <li>Job Responsibility 2</li>
                  <li>Job Responsibility 3</li>
                  <li>Job Responsibility 4</li>
                </ul>
              </div>
            </div>
          ))}
        </section>
        <section className="about-proficiencies">
          <h2>Software</h2>
          {/* {myinfo.software.map((icon, iconIndex) => (
        <img
          src={`${import.meta.env.BASE_URL}/icons/${icon.iconFilename}`}
          aria-label={contactMethod.ariaLabel}
          key={contactIndex}
        />
      ))} */}
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
        <section id="education">
          <h2>Education</h2>
          <h4>{myinfo.education.school}</h4>
          <h5>
            {myinfo.education.degree} ({myinfo.education.timeframe})
          </h5>
        </section>
      </div>
    </main>
  );
}
