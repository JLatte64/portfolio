import { APP_BASE_URL } from "../config/routes.config";

export const resolveMediaPath = (srcPath: string): string => {
  if (!srcPath) return "";
  const trimmed = srcPath.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  const cleanBase = APP_BASE_URL.endsWith("/")
    ? APP_BASE_URL
    : `${APP_BASE_URL}/`;
  const cleanPath = trimmed.startsWith("/") ? trimmed.slice(1) : trimmed;
  return `${cleanBase}${cleanPath}`;
}; //"/images/pic.webp" in dev and "/portfolio/images/pic.webp" in production subfolders
