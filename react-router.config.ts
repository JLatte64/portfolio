// react-router.config.ts
import type { Config } from "@react-router/dev/config";

const activeBasename =
  process.env.NODE_ENV === "development" ? "/portfolio/" : "/";

export default {
  appDirectory: "src",
  ssr: true,
  basename: activeBasename,

  // ✅ FORCE INITIAL BUNDLING:
  // Disables lazy runtime discovery completely, packaging all route tracks
  // into the initial file payload to prevent background 404 network fetch errors!
  routeDiscovery: {
    mode: "initial",
  },
} satisfies Config;
