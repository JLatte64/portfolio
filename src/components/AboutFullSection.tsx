import {myinfo} from "../data/myinfo.json";

export function AboutFullSection() {
  return (
    <section className="about-intro">
      <h2>My Story</h2>
      <p>
        I'm {myinfo.about.name}. {myinfo.about.full}
      </p>
    </section>
  );
}

export default AboutFullSection;
