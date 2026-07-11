import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "src",
  ssr: true,
  basename: "/",

  routeDiscovery: {
    mode: "initial",
  },
} satisfies Config;
