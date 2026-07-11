// vite.config.ts
import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";

export default defineConfig(({ command }) => {
  // ✅ PERFECT ASSET ENGINE:
  // - In local dev (serve): Makes sure asset script tags load from "/portfolio/"
  // - In production (build): Scales your static script tags straight to the root "/" domain
  const activeBaseUrl = command === "serve" ? "/portfolio/" : "/";

  return {
    base: activeBaseUrl,
    plugins: [reactRouter()],
  };
});
