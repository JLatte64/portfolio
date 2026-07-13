import portfolioJson from "./portfolioData.json" with { type: "json" };

export const portfolioData = JSON.parse(JSON.stringify(portfolioJson));

const scramble = (str: string): string => {
  const codes = Array.from(str).map((char) => char.charCodeAt(0));
  return JSON.stringify(codes);
};

export const projectIndexToSlugLUT: Record<number, string> = {};
export const projectSlugToIndexLUT: Record<string, number> = {};

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

portfolioData.projects.forEach((project: any, index: number) => {
  const customSlug = generateSlug(project.title);
  projectIndexToSlugLUT[index] = customSlug;
  projectSlugToIndexLUT[customSlug] = index;
});

const emailObj = portfolioData.backgroundInfo.contacts.find(
  (c: any) => "Email" in c,
);
const phoneObj = portfolioData.backgroundInfo.contacts.find(
  (c: any) => "Phone" in c,
);

if (emailObj) emailObj["Email"] = scramble(emailObj["Email"] || "");
if (phoneObj) phoneObj["Phone"] = scramble(phoneObj["Phone"] || "");
