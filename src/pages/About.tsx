import "../components/styles/page-styles/about.css";

import "../components/styles/buttons.css";
import { handleWidgetDisplay, type Widget } from "../components/Widget";
import displayMedia, { resolveMediaSrc } from "../components/DisplayMedia";
import type { Media } from "../components/ProjectContentTypes";
import InfoCardGrid from "../components/InfoCardGrid";
import ExperienceCardContent from "../components/ExperienceCardContent";
import { myinfo } from "../data/myinfo.json";
import EducationCardContent from "../components/EducationCardContent";
import purifyString from "../components/PurifyString";

export function About() {
  if (!myinfo) {
    return (
      <main>
        <p>Loading profile information...</p>
      </main>
    );
  }

  const experienceCards = (
    <InfoCardGrid className="about" cardContent={ExperienceCardContent} />
  );
  const softwareWidgets = myinfo.software.map((software, swIndex) => (
    <div className="widget-container" key={swIndex}>
      {handleWidgetDisplay(software as Widget)}
    </div>
  ));

  const educationCards = (
    <InfoCardGrid className="about" cardContent={EducationCardContent} />
  );

  return (
    <main>
      <div className="about-content">
        <section className="about-intro">
          <p className="about-story">{purifyString(myinfo.aboutDescription)}</p>
          <div className="about-photo-link">
            {displayMedia(myinfo.aboutPhoto as Media, "about-photo", false)}
            <a
              href={resolveMediaSrc(myinfo.resume.pdf.content)}
              target="_blank"
              rel="noopener noreferrer"
              className="button"
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
                <li key={skillIndex}>{purifyString(skill)}</li>
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
              <li key={langIndex}>{purifyString(language)}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
