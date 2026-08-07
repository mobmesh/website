import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://mobmesh.org",
  // Mirrors the /gcm-api proxy in netlify.toml so the stats also work in dev.
  // Same-origin either way, so CORS never applies.
  vite: {
    server: {
      proxy: {
        "/gcm-api": {
          target: "https://explorer.gulfcoastmesh.org",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/gcm-api/, ""),
        },
      },
    },
  },
});
