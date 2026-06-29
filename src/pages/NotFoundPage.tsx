import { Link } from "react-router";
import { getPagePath } from "../components/functions/GetPagePath";
import "../components/styles/page-styles/notFound.css";

export function NotFoundPage() {
  return (
    <main className="not-found-main" aria-label="Page Not Found Error Profile">
      <section className="not-found-card">
        <h1 className="not-found-heading">404 Error</h1>
        <p className="not-found-text">
          The page you are looking for does not exist.
        </p>

        <Link
          to={getPagePath("dashboard")}
          className="button return-home-button"
        >
          Return to Portfolio Home
        </Link>
      </section>
    </main>
  );
}
