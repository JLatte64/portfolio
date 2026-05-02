import { Link } from "react-router";

export function NotFoundPage() {
    return (<>
    <section>
        <p>Page not found.</p> <br />
        <Link to={"/portfolio"}>
            <button>Click to return to Home.</button>
        </Link>
    </section>
    </>);
}