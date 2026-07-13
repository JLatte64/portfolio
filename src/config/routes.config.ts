const getBaseUrl = (): string => {
  if (typeof process !== "undefined" && process.env?.VITE_APP_BASE) {
    return process.env.VITE_APP_BASE;
  }
  try {
    const actionBase = import.meta.env.VITE_APP_BASE;
    if (actionBase) return actionBase;
  } catch {}

  try {
    const viteBase = import.meta.env.BASE_URL;
    if (viteBase) return viteBase;
  } catch {}

  return "/";
};

export const APP_BASE_URL = getBaseUrl();

const CLEAN_BASE_URL = APP_BASE_URL.endsWith("/")
  ? APP_BASE_URL
  : `${APP_BASE_URL}/`;

const aboutRoute = "about";
const contactRoute = "contact";
const projectRoute = (slug: string): string => {
  const cleanSlug = slug.startsWith("/") ? slug.slice(1) : slug;
  return `work/${cleanSlug}`;
};

export const ROUTE_KEYS = {
  about: aboutRoute,
  contact: contactRoute,
  project: projectRoute(":slug"), //"work/:slug"
} as const;

export const RELATIVE_ROUTES = {
  home: "/",
  about: `/${aboutRoute}`,
  contact: `/${contactRoute}`,
  toProject: (slug: string) => `/${projectRoute(slug)}`, //"/work/project-alpha"
};

export const ABSOLUTE_ROUTES = {
  base: APP_BASE_URL,
  home: CLEAN_BASE_URL,
  about: `${CLEAN_BASE_URL}${aboutRoute}`,
  contact: `${CLEAN_BASE_URL}${contactRoute}`,
  toProject: (slug: string) => `${CLEAN_BASE_URL}${projectRoute(slug)}`, //"/portfolio-basename/work/project-alpha"
};
