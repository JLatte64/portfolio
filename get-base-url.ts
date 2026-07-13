import process from "node:process";

export function getDynamicBaseUrl(): string {
  if (typeof process !== "undefined" && process.env?.VITE_APP_BASE) {
    return process.env.VITE_APP_BASE;
  }

  return "/";
}
