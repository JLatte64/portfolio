import { Link } from "react-router";
import "../components/styles/page-styles/about.css";
import { myinfo } from "../data/myinfo.json";
import { handleIconDisplay, type Widget } from "../components/Widget";

export function About() {
  return (
    <main>
      <div className="about-content">
        <section className="about-intro">
          <p className="about-story">
            I'm {myinfo.name}. {myinfo.about.full}
          </p>
          <div className="about-photo-link">
            <img
              src={`${import.meta.env.BASE_URL}/photos/${myinfo.photo}`}
              alt={`${myinfo.name} photo`}
              className="about-photo"
            />
            <Link to="/portfolio/resume">Download/View Resume (PDF)</Link>
          </div>
        </section>

        <section className="about-experience">
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
        <section className="about-skills-software">
          <div className="about-software">
            <h2>Software</h2>
            <div className="widgets-container">
              {myinfo.software.map((software, swIndex) => (
                <div className="widget-container" key={swIndex}>
                  {handleIconDisplay(software as Widget)}
                </div>
              ))}
            </div>
          </div>
          <div className="about-skills">
            <h2>Skills</h2>
            {myinfo.resume.skills.map((skill) => (
              <p>{skill}</p>
            ))}
          </div>
        </section>
        <section className="about-education">
          <h2>Education</h2>
          <div className="experience-card">
            <div className="experience-card-header">
              <h3>{myinfo.education.school}</h3>
              <h3>[{myinfo.education.timeframe}]</h3>
            </div>
            <div className="experience-card-body">
              {myinfo.education.degree}
            </div>
          </div>
        </section>
        <section className="about-languages">
          <h2>Languages</h2>
          <ul>
            {myinfo.languages.map((language) => (
              <li>{language}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
