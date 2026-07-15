import { useState, type ComponentPropsWithoutRef } from "react";
import "./CopyLinkButton.css";

interface CopyLinkButtonProps extends ComponentPropsWithoutRef<"button"> {
  // Add any custom extra props here if needed down the line
}

export default function CopyLinkButton({
  className = "",
  ...props
}: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link: ", err);
    }
  };

  return (
    <button
      type="button"
      className={`${className} ${copied ? "copied" : ""}`}
      {...props}
      onClick={handleCopy}
    >
      <span className="copy-icon-indicator">{copied ? "✓ Copied" : "🔗"}</span>
    </button>
  );
}
