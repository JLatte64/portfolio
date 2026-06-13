import "../components/styles/page-styles/about.css";
import "../components/styles/buttons.css";
import displayMedia, { resolveMediaSrc } from "../components/DisplayMedia";
import type { Media } from "../components/types/MediaTypes";
import { myinfo } from "../data/myinfo.json";
import purifyString from "../components/PurifyString";
import { CardGrid } from "../components/CardGrid";
import ExperienceCard from "../components/ExperienceCard";
import type { CardData } from "../components/types/CardTypes";
import SoftwareCard from "../components/SoftwareCard";
import EducationCard from "../components/EducationCard";

export function About() {
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
          <CardGrid
            items={(myinfo?.resume.roles ?? []) as CardData[]}
            renderComponent={ExperienceCard}
          />
        </section>
        <section className="about-skills-software">
          <div className="about-software">
            <h2>Software</h2>
            <div className="widgets-container">
              <CardGrid
                items={(myinfo?.software ?? []) as CardData[]}
                renderComponent={SoftwareCard}
              />
            </div>
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
          <CardGrid
            items={[myinfo?.education].filter(Boolean) as CardData[]}
            renderComponent={EducationCard}
          />
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
