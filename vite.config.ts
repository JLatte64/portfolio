import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";

export default defineConfig({
  base: "/portfolio/",
  plugins: [
    reactRouter(), // 👈 Swapped out from react() or injectSeoLayout()
  ],
});
