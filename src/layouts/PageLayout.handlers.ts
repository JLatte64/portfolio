// src/layouts/PageLayout.handlers.ts
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { projectSlugToIndexLUT, portfolioData } from "../data/portfolioData";

export interface LoaderData {
  title: string;
  description: string;
  image: string;
  url: string;
  profileSocials: {
    github: string;
    linkedin: string;
    email: string;
    phone: string;
    name: string;
  };
}

const fixPath = (path: string) => (path.startsWith("/") ? path : `/${path}`);

export function loader({ params, request }: LoaderFunctionArgs): LoaderData {
  const { slug } = params as { slug?: string };
  const activeIndex = projectSlugToIndexLUT[slug ?? ""] ?? undefined;
  const isHome = slug === undefined || activeIndex === undefined;
  const urlInstance = new URL(request.url);
  const siteOrigin = urlInstance.origin;
  const background = portfolioData.backgroundInfo;
  const name = background.name;
  const github =
    background.socials.find((s) => "GitHub" in s)?.["GitHub"] || "";
  const linkedin =
    background.socials.find((s) => "LinkedIn" in s)?.["LinkedIn"] || "";
  const email = background.contacts.find((c) => "Email" in c)?.["Email"] || "";
  const phone = background.contacts.find((c) => "Phone" in c)?.["Phone"] || "";
  const profileSocials = { github, linkedin, email, phone, name };
  const project = !isHome ? portfolioData.projects[activeIndex!] : null;
  const targetTitle = isHome
    ? portfolioData.siteTitle
    : `${project!.title} | ${name}`;
  const targetDesc = isHome
    ? portfolioData.siteDescription
    : project!.description ||
      `Explore project details about ${project!.title}.`;
  const relativeAssetPath = isHome
    ? portfolioData.bannerImage.src
    : project!.thumbnailImage.src;

  return {
    title: targetTitle,
    description: targetDesc,
    image: `${siteOrigin}${fixPath(relativeAssetPath)}`,
    url: `${siteOrigin}${urlInstance.pathname}`,
    profileSocials,
  };
}

export const meta: MetaFunction<typeof loader> = ({ loaderData }) => {
  if (!loaderData) return [{ title: "Portfolio" }];

  const { github, linkedin, name } = loaderData.profileSocials;
  const { title, description, image, url } = loaderData;

  return [
    { title },
    { name: "description", content: description },
    { name: "author", content: name },
    { name: "robots", content: "index, follow" },

    { property: "og:type", content: "website" },
    { property: "og:site_name", content: `${name} Portfolio` },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    { property: "og:url", content: url },

    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },

    {
      name: "linkedin:profile",
      content: linkedin ? `https://${linkedin}` : "",
    },
    { name: "github:profile", content: github ? `https://${github}` : "" },
  ];
};
