import { Link, Links, Meta, Outlet, Scripts, ScrollRestoration, ServerRouter, UNSAFE_withComponentProps, useNavigate, useParams } from "react-router";
import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";
import { jsx, jsxs } from "react/jsx-runtime";
import { HelmetProvider } from "react-helmet-async";
import { useEffect, useMemo, useRef } from "react";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/@react-router/dev/dist/config/defaults/entry.server.web.tsx
var entry_server_web_exports = /* @__PURE__ */ __exportAll({
	default: () => handleRequest,
	streamTimeout: () => streamTimeout
});
var streamTimeout = 5e3;
async function handleRequest(request, responseStatusCode, responseHeaders, routerContext, _loadContext) {
	if (request.method.toUpperCase() === "HEAD") return new Response(null, {
		status: responseStatusCode,
		headers: responseHeaders
	});
	let shellRendered = false;
	let userAgent = request.headers.get("user-agent");
	const body = await renderToReadableStream(/* @__PURE__ */ jsx(ServerRouter, {
		context: routerContext,
		url: request.url
	}), {
		signal: AbortSignal.timeout(6e3),
		onError(error) {
			responseStatusCode = 500;
			if (shellRendered) console.error(error);
		}
	});
	shellRendered = true;
	if (userAgent && isbot(userAgent) || routerContext.isSpaMode) await body.allReady;
	responseHeaders.set("Content-Type", "text/html");
	return new Response(body, {
		headers: responseHeaders,
		status: responseStatusCode
	});
}
//#endregion
//#region src/root.tsx
var root_exports = /* @__PURE__ */ __exportAll({ default: () => root_default });
var root_default = UNSAFE_withComponentProps(function Root() {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsxs("head", { children: [
			/* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
			/* @__PURE__ */ jsx("meta", {
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			}),
			/* @__PURE__ */ jsx(Meta, {}),
			/* @__PURE__ */ jsx(Links, {})
		] }), /* @__PURE__ */ jsxs("body", { children: [
			/* @__PURE__ */ jsx(HelmetProvider, { children: /* @__PURE__ */ jsx(Outlet, {}) }),
			/* @__PURE__ */ jsx(ScrollRestoration, {}),
			/* @__PURE__ */ jsx(Scripts, {})
		] })]
	});
});
//#endregion
//#region src/data/portfolioData.ts
var portfolioData = { "projects": [
	{
		"title": "E-Commerce Mesh Platform",
		"description": "A high-performance, distributed e-commerce architecture designed to eliminate transactional checkout latency during peak traffic spikes. Built by decoupling legacy checkout micro-states and shifting execution pipelines to edge-cached gateway workers, the platform leverages a custom global WebSocket mesh for real-time data sync. This engineering overhaul compressed global analytical payloads by 42% and introduced strict multi-region fault isolation, ensuring sub-second execution latencies and zero-downtime reliability under heavy concurrent loads.",
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
		"description": "An advanced telemetry and visualization platform designed to stream and map machine learning inference graphs at the network edge. The system aggregates massive data pipelines down to single-digit millisecond latencies by utilizing optimized memory allocation models directly within browser threads. It features highly responsive multi-monitor layouts, automated indexing structures for multi-tier relational logs, and asynchronous worker routines to compile historical trend data into performant, vector-based visual charts.",
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
		"description": "A mission-critical, double-entry financial ledger engine engineered for high-throughput cross-border asset settlements. Designed for distributed validation topologies, the system natively handles cryptographic reconciliation pipelines capable of processing up to 50,000 transactions per second with zero mismatch discrepancies under multi-month load stresses. The architecture integrates end-to-end cryptographic hashing protocols, distributed in-memory hubs, and zero-knowledge data masking to guarantee strict compliance and anti-tampering protection.",
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
] };
var getSlug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
var projectSlugLUT = {};
portfolioData.projects.forEach((project, idx) => {
	projectSlugLUT[getSlug(project.title)] = idx;
});
//#endregion
//#region src/components/Navbar.tsx
function Navbar() {
	return /* @__PURE__ */ jsx("nav", { children: "Here's the NavBar." });
}
//#endregion
//#region src/components/HeroHeader.tsx
function HeroHeader() {
	return /* @__PURE__ */ jsx("header", { children: "Hey, this is a header!" });
}
//#endregion
//#region src/components/ProjectCard.tsx
function ProjectCard({ project }) {
	const slug = getSlug(project.title);
	const thumbnailUrl = `/projects/${slug}/thumbnail.png`;
	return /* @__PURE__ */ jsx(Link, {
		to: `/projects/${slug}`,
		className: "project-card-link",
		children: /* @__PURE__ */ jsxs("article", {
			className: "project-card",
			children: [/* @__PURE__ */ jsx("div", {
				className: "thumbnail-wrapper",
				children: /* @__PURE__ */ jsx("img", {
					src: thumbnailUrl,
					alt: `${project.title} Preview`
				})
			}), /* @__PURE__ */ jsxs("div", {
				className: "card-details",
				children: [/* @__PURE__ */ jsx("h3", { children: project.title }), /* @__PURE__ */ jsx("span", {
					className: "project-year",
					children: project.year
				})]
			})]
		})
	});
}
//#endregion
//#region src/components/WorkSection.tsx
function WorkSection() {
	return /* @__PURE__ */ jsxs("section", {
		id: "portfolio",
		className: "portfolio-section",
		children: [/* @__PURE__ */ jsx("h2", { children: "This is the Work Section." }), /* @__PURE__ */ jsx("div", {
			className: "portfolio-grid",
			children: portfolioData.projects.map((project, idx) => /* @__PURE__ */ jsx(ProjectCard, { project }, `${project.title}-${idx}`))
		})]
	});
}
//#endregion
//#region src/components/AboutSection.tsx
function AboutSection() {
	return /* @__PURE__ */ jsx("section", { children: "This is the About Section!" });
}
//#endregion
//#region src/components/ContactFooter.tsx
function ContactFooter() {
	return /* @__PURE__ */ jsx("footer", { children: "This is the Contact Footer." });
}
//#endregion
//#region src/components/ProjectMedia.tsx
function ProjectMedia({ value }) {
	switch (useMemo(() => {
		if (!value) return "unknown";
		const cleanUrl = value.toLowerCase().split(/[?#]/)[0];
		if (cleanUrl.endsWith(".mp4") || cleanUrl.endsWith(".webm") || cleanUrl.endsWith(".ogg") || cleanUrl.includes("://vimeo.com")) return "video";
		if (cleanUrl.includes("youtube.com") || cleanUrl.includes("youtu.be") || cleanUrl.includes("://vimeo.com")) return "embed";
		return "image";
	}, [value])) {
		case "video": return /* @__PURE__ */ jsx("video", {
			src: value,
			className: "project-media-asset video-asset",
			muted: true,
			autoPlay: true,
			loop: true,
			playsInline: true,
			controlsList: "nodownload"
		});
		case "embed": return /* @__PURE__ */ jsx("iframe", {
			src: value,
			className: "project-media-asset embed-asset",
			title: "Project Media Player",
			frameBorder: "0",
			allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
			allowFullScreen: true,
			loading: "lazy"
		});
		default: return /* @__PURE__ */ jsx("img", {
			src: value,
			className: "project-media-asset image-asset",
			alt: "Project showcase item",
			loading: "lazy",
			decoding: "async"
		});
	}
}
//#endregion
//#region src/components/ProjectModal.tsx
function ProjectModal({ project, onClose }) {
	const dialogRef = useRef(null);
	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;
		dialog.showModal();
		const handleCancel = (e) => {
			e.preventDefault();
			onClose();
		};
		dialog.addEventListener("cancel", handleCancel);
		return () => dialog.removeEventListener("cancel", handleCancel);
	}, [project, onClose]);
	const handleBackdropClick = (event) => {
		if (event.target === dialogRef.current) onClose();
	};
	return /* @__PURE__ */ jsx("dialog", {
		ref: dialogRef,
		className: "project-modal-dialog",
		onClick: handleBackdropClick,
		children: /* @__PURE__ */ jsxs("aside", {
			className: "modal-sidebar",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "modal-header",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "header-meta",
						children: [/* @__PURE__ */ jsx("h2", { children: project.title }), /* @__PURE__ */ jsx("span", {
							className: "modal-year",
							children: project.year
						})]
					}), /* @__PURE__ */ jsx("button", {
						className: "close-button",
						onClick: onClose,
						"aria-label": "Close modal",
						children: "✕"
					})]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "modal-description",
					children: project.description
				}),
				project.carouselMedia && project.carouselMedia.length > 0 && /* @__PURE__ */ jsx("div", {
					className: "modal-carousel-container",
					children: /* @__PURE__ */ jsx("div", {
						className: "modal-carousel-track",
						children: project.carouselMedia.map((mediaUrl, idx) => /* @__PURE__ */ jsx("div", {
							className: "modal-carousel-item",
							children: /* @__PURE__ */ jsx(ProjectMedia, { value: mediaUrl })
						}, `carousel-${idx}`))
					})
				}),
				/* @__PURE__ */ jsx("div", {
					className: "modal-sections-stack",
					children: project.sections.map((section, idx) => /* @__PURE__ */ jsxs("div", {
						className: "modal-section-block",
						children: [
							section.heading && /* @__PURE__ */ jsx("h3", { children: section.heading }),
							section.subheading && /* @__PURE__ */ jsx("h4", { children: section.subheading }),
							section.paragraph && /* @__PURE__ */ jsx("p", { children: section.paragraph }),
							section.list && section.list.length > 0 && /* @__PURE__ */ jsx("ul", {
								className: "modal-bullet-list",
								children: section.list.map((item, itemIdx) => /* @__PURE__ */ jsx("li", { children: item }, `list-${itemIdx}`))
							}),
							section.media && section.media.length > 0 && /* @__PURE__ */ jsx("div", {
								className: "modal-section-media-grid",
								children: section.media.map((mediaUrl, mediaIdx) => /* @__PURE__ */ jsx("div", {
									className: "inline-media-item",
									children: /* @__PURE__ */ jsx(ProjectMedia, { value: mediaUrl })
								}, `sec-media-${mediaIdx}`))
							})
						]
					}, `section-${idx}`))
				})
			]
		})
	});
}
//#endregion
//#region src/layouts/PageLayout.tsx
var PageLayout_exports = /* @__PURE__ */ __exportAll({
	clientLoader: () => clientLoader,
	default: () => PageLayout_default
});
var PageLayout_default = UNSAFE_withComponentProps(function PageLayout() {
	const { slug } = useParams();
	const navigate = useNavigate();
	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === "Escape" && slug) navigate("/");
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [slug, navigate]);
	const activeIndex = slug ? projectSlugLUT[slug] : void 0;
	const project = activeIndex !== void 0 ? portfolioData.projects[activeIndex] : null;
	return /* @__PURE__ */ jsxs("div", {
		className: "portfolio-app-root",
		style: { position: "relative" },
		children: [
			/* @__PURE__ */ jsxs("main", {
				className: "portfolio-scroll-container",
				children: [
					/* @__PURE__ */ jsx(HeroHeader, {}),
					/* @__PURE__ */ jsx(WorkSection, {}),
					/* @__PURE__ */ jsx(AboutSection, {}),
					/* @__PURE__ */ jsx(ContactFooter, {})
				]
			}),
			/* @__PURE__ */ jsx(Navbar, {}),
			project && /* @__PURE__ */ jsx(ProjectModal, {
				project,
				onClose: () => navigate("/")
			})
		]
	});
});
async function clientLoader() {
	return null;
}
//#endregion
//#region \0virtual:react-router/server-manifest
var server_manifest_default = {
	"entry": {
		"module": "/portfolio/assets/entry.client-BthVmzD4.js",
		"imports": ["/portfolio/assets/jsx-runtime-DuQWNfc-.js"],
		"css": ["/portfolio/assets/src-DGNrK5qb.css"]
	},
	"routes": {
		"root": {
			"id": "root",
			"parentId": void 0,
			"path": "",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/portfolio/assets/root-CzsMJ5xJ.js",
			"imports": ["/portfolio/assets/jsx-runtime-DuQWNfc-.js", "/portfolio/assets/lib-DgfukTpE.js"],
			"css": ["/portfolio/assets/src-DGNrK5qb.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"home-index": {
			"id": "home-index",
			"parentId": "root",
			"path": void 0,
			"index": true,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": true,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/portfolio/assets/PageLayout-main-BSYMeokj.js",
			"imports": ["/portfolio/assets/jsx-runtime-DuQWNfc-.js", "/portfolio/assets/lib-DgfukTpE.js"],
			"css": ["/portfolio/assets/PageLayout-x1XGuNl0.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": "/portfolio/assets/PageLayout-client-loader-Bbmu_Q_i.js",
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"project-slug": {
			"id": "project-slug",
			"parentId": "root",
			"path": "projects/:slug",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": true,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/portfolio/assets/PageLayout-main-BSYMeokj.js",
			"imports": ["/portfolio/assets/jsx-runtime-DuQWNfc-.js", "/portfolio/assets/lib-DgfukTpE.js"],
			"css": ["/portfolio/assets/PageLayout-x1XGuNl0.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": "/portfolio/assets/PageLayout-client-loader-Bbmu_Q_i.js",
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		}
	},
	"url": "/portfolio/assets/manifest-1fdc001f.js",
	"version": "1fdc001f",
	"sri": void 0
};
//#endregion
//#region \0virtual:react-router/server-build
var assetsBuildDirectory = "build\\client";
var basename = "/portfolio/";
var future = {
	"unstable_enableNodeReadableStream": false,
	"unstable_optimizeDeps": false
};
var ssr = true;
var isSpaMode = false;
var prerender = ["/"];
var routeDiscovery = {
	"mode": "lazy",
	"manifestPath": "/__manifest"
};
var publicPath = "/portfolio/";
var entry = { module: entry_server_web_exports };
var routes = {
	"root": {
		id: "root",
		parentId: void 0,
		path: "",
		index: void 0,
		caseSensitive: void 0,
		module: root_exports
	},
	"home-index": {
		id: "home-index",
		parentId: "root",
		path: void 0,
		index: true,
		caseSensitive: void 0,
		module: PageLayout_exports
	},
	"project-slug": {
		id: "project-slug",
		parentId: "root",
		path: "projects/:slug",
		index: void 0,
		caseSensitive: void 0,
		module: PageLayout_exports
	}
};
var allowedActionOrigins = false;
//#endregion
export { allowedActionOrigins, server_manifest_default as assets, assetsBuildDirectory, basename, entry, future, isSpaMode, prerender, publicPath, routeDiscovery, routes, ssr };
