import "../components/styles/page-styles/about.css";
import "../components/styles/aboutCard.css";
import { myinfo } from "../data/myinfo.json";
import { handleWidgetDisplay, type Widget } from "../components/Widget";
import showMedia, { resolveMediaSrc } from "../components/showProjectMedia";
import type { Media } from "../components/ProjectContentTypes";

export function About() {
  const experienceCards = myinfo.resume.roles.map((role, expIndex) => (
    <div className="about-card" key={expIndex}>
      <div className="about-card-header">
        <h3 className="role-title">
          {role.companyName === "" ? null : role.companyName} |{" "}
          {role.jobTitle === "" ? null : role.jobTitle}
        </h3>
        <h3 className="role-responsibility">
          [{role.timeframe === "" ? null : role.timeframe}]
        </h3>
      </div>
      <div className="about-card-body">
        <ul>
          {role.responsibilities.map((responsibility, respIndex) => (
            <li key={respIndex}>{responsibility}</li>
          ))}
        </ul>
      </div>
    </div>
  ));

  const softwareWidgets = myinfo.software.map((software, swIndex) => (
    <div className="widget-container" key={swIndex}>
      {handleWidgetDisplay(software as Widget)}
    </div>
  ));

  const educationCards = (
    <div className="about-card">
      <div className="about-card-header">
        <h3>{myinfo.education.school}</h3>
        <h3>[{myinfo.education.timeframe}]</h3>
      </div>
      <div className="about-card-body">
        <ul>
          <li>{myinfo.education.degree}</li>
        </ul>
      </div>
    </div>
  );

  if (!myinfo) {
    return (
      <main>
        <p>Loading profile information...</p>
      </main>
    );
  }

  return (
    <main>
      <div className="about-content">
        <section className="about-intro">
          <p className="about-story">{myinfo.aboutDescription}</p>
          <div className="about-photo-link">
            {showMedia(myinfo.aboutPhoto as Media, "about-photo", false)}
            <a
              href={resolveMediaSrc(myinfo.resume.pdf.content)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download/View Resume (PDF)
            </a>
          </div>
        </section>

        <section className="about-experience">
          <h2>Professional Experience</h2>
          {experienceCards}
        </section>
        <section className="about-skills-software">
          <div className="about-software">
            <h2>Software</h2>
            <div className="widgets-container">{softwareWidgets}</div>
          </div>
          <div className="about-skills">
            <h2>Skills</h2>
            <ul>
              {myinfo.resume.skills.map((skill, skillIndex) => (
                <li key={skillIndex}>{skill}</li>
              ))}
            </ul>
          </div>
        </section>
        <section className="about-education">
          <h2>Education</h2>
          {educationCards}
        </section>
        <section className="about-languages">
          <h2>Languages</h2>
          <ul>
            {myinfo.languages.map((language, langIndex) => (
              <li key={langIndex}>{language}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
