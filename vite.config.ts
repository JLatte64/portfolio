import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/portfolio/",
  plugins: [react()],
  server: {
    headers: {
      "Permissions-Policy":
        'compute-pressure=(self "https://youtube-nocookie.com")',
    },
  },
});
