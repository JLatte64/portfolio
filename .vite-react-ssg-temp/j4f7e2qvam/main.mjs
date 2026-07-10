import { ViteReactSSG } from "vite-react-ssg";
import { Outlet, useParams } from "react-router-dom";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Helmet, HelmetProvider } from "react-helmet-async";
//#region src/layouts/PageLayout.tsx
function PageLayout() {
	return /* @__PURE__ */ jsxs("div", {
		className: "portfolio-app-root",
		style: { position: "relative" },
		children: [/* @__PURE__ */ jsx("main", { className: "portfolio-scroll-container" }), /* @__PURE__ */ jsx(Outlet, {})]
	});
}
//#endregion
//#region src/routes/ProjectRouter.tsx
/**
* 1. Fully Type-Safe Data Wrapper
* Asserts the shape of your JSON asset file directly at import time.
* Your IDE will now auto-recognize portfolioData as a true Project[] array.
*/
var portfolioData = [
	{
		"title": "E-Commerce Mesh Platform",
		"description": "asdasdasdas",
		"year": 2026,
		"carouselMedia": [
			"https://pexels.com",
			"https://vimeo.com",
			"https://pexels.com"
		],
		"sections": [{
			"heading": "The Core Challenge",
			"subheading": "Optimizing transactional bottlenecks over distributed networks",
			"paragraph": "Legacy checkout infrastructure introduced massive execution delays during peak traffic events. Our main mandate required decoupling checkout micro-states onto an edge-cached gateway worker pipeline.",
			"list": [
				"Reduced sub-second checkout latencies globally by 34%",
				"Decoupled structural payment processing bottlenecks",
				"Implemented global redundancy failovers for multi-region runtime isolation"
			],
			"media": ["https://unsplash.com"]
		}, {
			"heading": "Infrastructure Transformation",
			"subheading": "Implementing distributed state meshes",
			"paragraph": "Migrated state frames to a custom global WebSocket mesh layout. We successfully compressed runtime analytical payloads globally.",
			"list": [
				"Deployed real-time synchronization pipelines over WebSockets",
				"Minimized structural re-renders on low-end client endpoints",
				"Audited transmission frames to eliminate data overhead leaks"
			],
			"media": ["https://unsplash.com", "https://vimeo.com"]
		}]
	},
	{
		"title": "AI Analytics Dashboard",
		"year": 2025,
		"carouselMedia": ["https://pexels.com", "https://pexels.com"],
		"sections": [{
			"heading": "Real-time Telemetry Systems",
			"subheading": "Visualizing machine learning inferencing graphs at the edge",
			"paragraph": "Architected edge data-streaming visual dashboards showing real-time client transaction metrics. This interface continuously aggregates pipeline operations down to single-digit millisecond latency metrics.",
			"list": [
				"Integrated real-time neural network tensor charting wrappers",
				"Streamlined memory allocation layers inside client browser threads",
				"Optimized responsive view grids for multi-monitor operation centers"
			],
			"media": ["https://unsplash.com", "https://unsplash.com"]
		}, {
			"heading": "Analytical Modeling Aggregations",
			"subheading": "Optimizing relational dataset visual loads",
			"paragraph": "Built automated indexing structures that map complex multi-tier analytical data logs directly into human-readable chart configurations.",
			"list": [
				"Isolated historical trend comparisons using async worker routines",
				"Generated raw vector layouts dynamically to ensure layout sharpness",
				"Configured secure access logs to track active client view scopes"
			],
			"media": ["https://unsplash.com"]
		}]
	},
	{
		"title": "FinTech Ledger Engine",
		"year": 2025,
		"carouselMedia": ["https://pexels.com", "https://vimeo.com"],
		"sections": [{
			"heading": "Cryptographic Reconciliation Pipelines",
			"subheading": "Securing cross-border settlement ledgers at scale",
			"paragraph": "Designed a high-throughput transaction ledger engine running double-entry bookkeeping checks natively compiled for distributed validation topologies.",
			"list": [
				"Audited processing flows to settle up to 50,000 requests per second",
				"Zero ledger mismatch discrepancies across multi-month soak cycles",
				"Automated accounting verification hooks mapped natively into secure client layouts"
			],
			"media": ["https://unsplash.com"]
		}, {
			"heading": "Compliance & Security Matrix",
			"subheading": "End-to-end cryptographic verification protocols",
			"paragraph": "Integrated automated hashing verification check routines across transaction steps to protect against middleman tampering loops.",
			"list": [
				"Passed strict external auditing checks with zero compliance gaps",
				"Implemented zero-knowledge data masking for client field variables",
				"Accelerated validation checks using distributed runtime memory hubs"
			],
			"media": ["https://unsplash.com", "https://unsplash.com"]
		}]
	}
];
/**
* URL Slug Generator Utility
* Converts human title strings like "E-Commerce Mesh Platform" into clean web slugs like "e-commerce-mesh-platform"
*/
var getSlug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
/**
* 2. High-Performance Projects Hash Map Generator
* Automatically recognizes 'project' as the strict Project type.
*/
var projectsHash = portfolioData.reduce((hash, project) => {
	const slugKey = getSlug(project.title);
	hash[slugKey] = project;
	return hash;
}, {});
/**
* 3. ProjectRouter Route Module Component
*/
function ProjectRouter() {
	const { slug } = useParams();
	const project = slug ? projectsHash[slug] : null;
	if (!project) return null;
	return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Helmet, { children: [
		/* @__PURE__ */ jsxs("title", { children: [project.title, " | Portfolio"] }),
		/* @__PURE__ */ jsx("meta", {
			name: "description",
			content: project.description
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:title",
			content: `${project.title} | Portfolio`
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:description",
			content: project.description
		})
	] }) });
}
//#endregion
//#region src/main.tsx
/**
* ViteReactSSG Universal Lifecycle Bootstrapper
* Accepts the raw array without executing any explicit JSX node returns.
*/
var createRoot = ViteReactSSG({
	routes: [{
		path: "/",
		element: /* @__PURE__ */ jsx(HelmetProvider, { children: /* @__PURE__ */ jsx(PageLayout, {}) }),
		children: [{
			path: "projects/:slug",
			element: /* @__PURE__ */ jsx(ProjectRouter, {})
		}]
	}],
	basename: "/portfolio"
});
//#endregion
export { createRoot };
