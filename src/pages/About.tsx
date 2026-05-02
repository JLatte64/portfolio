import { myinfo } from '../data/myinfo.json'
import '../components/styles/About.css'
import landingphoto from "../assets/landingphoto.jpg"
import { Experience } from './Experience';
import { NavBar } from '../components/NavBar';
import { IconsList, type JSONIcon } from '../components/IconList';

export function About() {
    return (
    <>
        <NavBar />
        <section className="top about flex-container">
            <div className="about flex-col-container">
                <h2 className="about">My Story</h2>
                <p className="about">I'm {myinfo.about.name}, a {myinfo.about.jobTitle} from {myinfo.about.loc}. {myinfo.about.text}</p>
            </div>
            <div className="about flex-col-container">
                <img src={landingphoto} alt="" className="about-photo"/>
                <p className="about">{myinfo.about.hobbies}</p>
            </div>
        </section>
        <Experience />
        <div className="skills">
            <h3>Skills</h3>
            {myinfo.resume.skills.map(skill => <p>{skill}</p>)}
        </div>
        <div className="software">
            <h3>Software</h3>
            <IconsList clickable={false} list={myinfo.software} />
        </div>
        <div className="education">
            <h3>Education</h3>
            <h4>{myinfo.education.school}</h4>
            <h5>{myinfo.education.degree} ({myinfo.education.timeframe})</h5>
        </div>
        <div className="languages">
            <h3>Languages</h3>
            <ul>
                {myinfo.languages.map(language => <li>{language}</li>)}
            </ul>
        </div>
    </>
    );
}