import { Link } from 'react-router';
import '../components/styles/NavBar.css'
import { myinfo } from "../data/myinfo.json";

export default function NavBar() {
    return (<nav className="nav">
        <a href="/" className="site-title">{myinfo.about.name}</a>
        <ul>
            <li>
                <Link to='/portfolio'>Home</Link>
            </li>
            <li>
                <Link to='/about'>About</Link>
            </li>
            <li>
                <Link to='/contact'>Contact</Link>
            </li>
        </ul>
    </nav>);
}