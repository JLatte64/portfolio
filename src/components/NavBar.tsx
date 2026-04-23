import '../components/styles/NavBar.css'
import { myinfo } from "../assets/data/myinfo.json";

export default function NavBar() {
    return (<nav className="nav">
        <a href="/" className="site-title">{myinfo.about.name}</a>
        <ul>
            <li>
                <a href="/resume">Resume</a>
            </li>
            <li>
                <a href="/about">About</a>
            </li>
            <li>
                <a href="/contact">Contact</a>
            </li>
        </ul>
    </nav>);
}