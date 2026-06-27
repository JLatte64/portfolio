import "../components/styles/page-styles/about.css";
import "../components/styles/button-styles/buttons.css";
import displayMedia, {
  resolveMediaSrc,
} from "../components/functions/DisplayMedia";
import type { Media } from "../components/types/MediaTypes";
import { myinfo } from "../data/myinfo.json";
import purifyString from "../components/functions/PurifyString";
import { CardGrid } from "../components/cards/CardGrid";
import type { CardData } from "../components/cards/Card";
import RoleCard, { type RoleCardData } from "../components/cards/RoleCard";
import SoftwareCard, {
  type SoftwareCardData,
} from "../components/cards/SoftwareCard";
import EducationCard, {
  type EducationCardData,
} from "../components/cards/EducationCard";
import LanguageCard, {
  type LangCardData,
} from "../components/cards/LanguageCard";
import SkillCard, { type SkillCardData } from "../components/cards/SkillCard";

export function About() {
  if (!myinfo) {
    return (
      <main>
        <p>Loading profile information...</p>
      </main>
    );
  }

  return (
    <>
      <header className="about-intro">
        <p className="about-story">{purifyString(myinfo.aboutDescription)}</p>
        <div className="about-photo-link">
          {displayMedia(myinfo.aboutPhoto as Media, "about-photo", false)}
          <a
            href={resolveMediaSrc(myinfo.resume.pdf.content)}
            target="_blank"
            rel="noopener noreferrer"
            className="resume-button button"
          >
            Download/View Resume (PDF)
          </a>
        </div>
      </header>
      <main>
        <div className="about-content">
          <section className="about-roles">
            <h2>Professional Experience</h2>
            <CardGrid
              className="role"
              items={
                (myinfo?.resume.roles ?? []).map((role, idx) => ({
                  ...role,
                  id: (role as any).id || `role-${idx}`,
                })) as CardData<RoleCardData>[]
              }
              renderComponent={RoleCard}
            />
          </section>

          <section className="about-skills-software">
            <div className="about-software">
              <h2>Software</h2>
              <CardGrid
                className="software"
                items={
                  (myinfo?.software ?? []).map((soft, idx) => ({
                    ...soft,
                    id:
                      (soft as any).id ||
                      `soft-${soft.ariaLabel.toLowerCase()}-${idx}`,
                  })) as CardData<SoftwareCardData>[]
                }
                renderComponent={SoftwareCard}
              />
            </div>

            <div className="about-skills">
              <h2>Skills</h2>
              <CardGrid
                className="skill"
                items={
                  (myinfo?.resume.skills ?? []).map((skill, idx) => ({
                    skill: skill,
                    id: `skill-${idx}`,
                  })) as CardData<SkillCardData>[]
                }
                renderComponent={SkillCard}
              />
            </div>
          </section>

          <section className="about-education">
            <h2>Education</h2>
            <CardGrid
              className="education"
              items={
                [myinfo?.education].filter(Boolean).map((edu, idx) => ({
                  ...edu,
                  id: (edu as any).id || `edu-${idx}`,
                })) as CardData<EducationCardData>[]
              }
              renderComponent={EducationCard}
            />
          </section>

          <section className="about-languages">
            <h2>Languages</h2>
            <CardGrid
              className="lang"
              items={
                (myinfo?.languages ?? []).map((language, idx) => ({
                  lang: language,
                  id: `lang-${idx}`,
                })) as CardData<LangCardData>[]
              }
              renderComponent={LanguageCard}
            />
          </section>
        </div>
      </main>
    </>
  );
}
