import DOMPurify from "dompurify";

export function sanitize(value: string | undefined | null): string {
  if (!value) return "";

  if (typeof window === "undefined") {
    return value;
  }
  return DOMPurify.sanitize(value);
}
