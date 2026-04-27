import { myinfo } from '../data/myinfo.json'
import '../components/styles/about.css'

export const About = () => {
    return (<>
    <h2>About Me</h2>
    <p>I'm {myinfo.about.name}, a {myinfo.about.jobTitle} from {myinfo.about.loc}.</p>
    <br />
    <p>{myinfo.about.text}</p>

    <section className="hobbies">
        <p>{myinfo.about.hobbies}</p>
        <img src="" alt="" />
    </section>

    </>);
}