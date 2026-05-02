import { Link } from 'react-router';
import '../components/styles/NavBar.css'

export function NavBar() {
    return (<nav className="nav">
        <Link to='/portfolio'>Jordan Latta</Link>
        <ul>
            <li>
                <Link to='/portfolio'>Portfolio</Link>
            </li>
            <li>
                <Link to='/resume'>Resume</Link>
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