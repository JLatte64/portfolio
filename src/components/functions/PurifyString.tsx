import parse from "html-react-parser";
import DOMPurify from "dompurify";
import type { ReactNode } from "react";
import type React from "react";

// Removing the manual 'Element' type lets TypeScript correctly infer React's output
export default function purifyString(
  dirtyString: string,
): string | React.JSX.Element | React.JSX.Element[] | ReactNode {
  const cleanHtmlString = DOMPurify.sanitize(dirtyString);
  return parse(cleanHtmlString);
}
