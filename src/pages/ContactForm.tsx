import { myinfo } from "../data/myinfo.json";
import LILogo from "../assets/LI-In-Bug.png"
import GHLogo from "../assets/GitHub_Invertocat_Black.svg"

export function ContactForm() {
    return (
    <>
    <h1>Get in Touch</h1>
    <p>
        <a href={"tel:+"+myinfo.contact.phone}>
            <span className="material-icons">call</span>
            {myinfo.contact.phone}
        </a>
        <br />
        <a href={"mailto:"+myinfo.contact.email}>
            <span className="material-icons">mail</span>
            {myinfo.contact.email}
        </a>
        <a href={myinfo.contact.linkedin}>
            <img src={LILogo} alt="LinkedIn Logo" />
            LinkedIn
        </a>
        <a href={myinfo.contact.github}>
            <img src={GHLogo} alt="GitHub Logo" />
            GitHub
        </a>
    </p>
    
    </>);
}