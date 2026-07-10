import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";

export default function Root() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {/* Centralized context provider layer matches your original App layout */}
        <HelmetProvider>
          <Outlet />
        </HelmetProvider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
