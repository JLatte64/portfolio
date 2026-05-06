import { Link } from 'react-router';
import '../components/styles/NavBar.css'

export function NavBar() {
    return (
    <>
        <nav className="nav">
            <Link to='/portfolio'>Jordan Latta</Link>
            <ul>
                <li>
                    <Link to='/portfolio/work'>Portfolio</Link>
                </li>
                <li>
                    <Link to='/portfolio/resume'>Resume</Link>
                </li>
                <li>
                    <Link to='/portfolio/about'>About</Link>
                </li>
                <li>
                    <Link to='/portfolio/contact'>Contact</Link>
                </li>
            </ul>
        </nav>
        <div className="nav-spacer"></div>
    </>);
}