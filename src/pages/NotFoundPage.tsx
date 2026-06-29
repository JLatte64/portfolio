import { Link } from "react-router";
import { getPagePath } from "../components/functions/GetPagePath"; // Ensure accurate pathing function utility
import "../components/styles/page-styles/notFound.css"; // Connect clean custom styles

export function NotFoundPage() {
  return (
    /* 🚀 ACCESSIBILITY FIX: Wrapped inside a single, dedicated main landmark container */
    <main className="not-found-main" aria-label="Page Not Found Error Profile">
      <section className="not-found-card">
        {/* 🚀 ACCESSIBILITY FIX: Explicit H1 baseline node communicates current location state */}
        <h1 className="not-found-heading">404 Error</h1>
        <p className="not-found-text">
          The page you are looking for does not exist.
        </p>

        {/* 🚀 ACCESSIBILITY FIX: Stripped out the nested button tag. The Link component 
            acts as its own native, highly functional button trigger for keyboard 'Tab' paths! */}
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
