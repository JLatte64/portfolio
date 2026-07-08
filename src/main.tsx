import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// 1. Tell Vite to find your fonts and return direct URL strings
const fontUrls = import.meta.glob("./assets/fonts/*.{ttf,otf}", {
  eager: true,
  as: "url",
});

// Debug log: Open your browser console (F12) to see if Vite is finding files!
console.log("Vite found these fonts:", Object.keys(fontUrls));

// 2. Build a single unified stylesheet block
let cssString = "";

Object.entries(fontUrls).forEach(([path, url]) => {
  const fileName = path.split("/").pop() || "";
  const fontName = fileName.replace(/\.(ttf|otf)$/i, "");
  const ext = fileName.split(".").pop()?.toLowerCase();
  const format = ext === "otf" ? "opentype" : "truetype";

  cssString += `
    @font-face {
      font-family: '${fontName}';
      src: url('${url}') format('${format}');
      font-display: swap;
    }
  `;
});

// 3. Inject the styles into the head immediately
if (cssString) {
  const styleEl = document.createElement("style");
  styleEl.textContent = cssString;
  document.head.appendChild(styleEl);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
