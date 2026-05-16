import "../components/styles/page-styles/about.css";
import EducationSection from "../components/EducationSection";
import ProficienciesSection from "../components/ProficienciesSection";
import AboutFullSection from "../components/AboutFullSection";
//import { IconsList } from "../components/IconList";

export function About() {
  return (
    <main>
      <div className="about-full-content">
        <AboutFullSection />
        <ProficienciesSection />
        <EducationSection />
      </div>
    </main>
  );
}
