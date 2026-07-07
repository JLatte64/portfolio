import "../components/styles/page-styles/about.css";
import { resolveMediaSrc } from "../components/functions/DisplayMedia";
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
import DisplayMedia from "../components/functions/DisplayMedia";

export function About() {
  if (!myinfo) {
    return (
      <main className="about-main-content">
        <p style={{ color: "#ffffff", padding: "2rem", textAlign: "center" }}>
          Loading profile information...
        </p>
      </main>
    );
  }

  return (
    <main
      className="about-main-content"
      aria-label="About and Resume Breakdown Profile"
    >
      <header className="about-intro">
        <p className="about-story">{purifyString(myinfo.aboutDescription)}</p>
        <div className="about-photo-link">
          <DisplayMedia
            media={myinfo.aboutPhoto as Media}
            className={"about-photo"}
            shouldLazyLoad={false}
          />
          <a
            href={resolveMediaSrc(myinfo.resume.pdf.content)}
            target="_blank"
            rel="noopener noreferrer"
            className="resume-button button"
            aria-label="Download or view full resume PDF in a new tab"
          >
            Download Resume
          </a>
        </div>
      </header>

      <div className="about-content">
        <section className="about-roles" aria-labelledby="experience-heading">
          <h2 id="experience-heading">Professional Experience</h2>
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
        <div className="about-skills-software">
          <section
            className="about-software"
            aria-labelledby="software-heading"
          >
            <h2 id="software-heading">Software</h2>
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
          </section>

          <section className="about-skills" aria-labelledby="skills-heading">
            <h2 id="skills-heading">Skills</h2>
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
          </section>
        </div>
        <section
          className="about-education"
          aria-labelledby="education-heading"
        >
          <h2 id="education-heading">Education</h2>
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
        <section
          className="about-languages"
          aria-labelledby="languages-heading"
        >
          <h2 id="languages-heading">Languages</h2>
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
  );
}
