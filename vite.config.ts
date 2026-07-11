import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";

export default defineConfig(() => {
  return {
    base: "/",
    plugins: [reactRouter()],
    resolve: {
      tsconfigPaths: true, // Enables native high-performance path mappings
    },
  };
});
