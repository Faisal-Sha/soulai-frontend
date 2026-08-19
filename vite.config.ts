import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

/** Serve Swagger UI from public/api-docs before the SPA catches the route. */
function apiDocsPlugin(): Plugin {
  return {
    name: "api-docs",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const url = req.url?.split("?")[0] ?? "";
        if (url === "/api-docs" || url === "/api-docs/") {
          req.url = "/api-docs/index.html";
        }
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        const url = req.url?.split("?")[0] ?? "";
        if (url === "/api-docs" || url === "/api-docs/") {
          req.url = "/api-docs/index.html";
        }
        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    // Allow ngrok tunnels (subdomain changes each session)
    allowedHosts: [".ngrok-free.dev", ".ngrok-free.app", ".ngrok.app"],
  },
  plugins: [
    react(),
    tailwindcss(),
    apiDocsPlugin(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.png", "pwa-180.png", "pwa-192.png", "pwa-512.png"],
      manifest: {
        name: "Soul+AI - Destiny Matrix Insights",
        short_name: "Soul+AI",
        description:
          "Calculate your destiny matrix using Ladini numerology. Discover your life purpose, chakra health, and energetic blueprint with Soul+AI.",
        theme_color: "#26221c",
        background_color: "#faf8f4",
        display: "standalone",
        orientation: "portrait-primary",
        scope: "/",
        start_url: "/",
        lang: "en",
        categories: ["lifestyle", "health"],
        icons: [
          {
            src: "/pwa-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/pwa-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        // Main bundle exceeds Workbox's 2 MiB default; keep installable shell offline.
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [/^\/api-docs/, /^\/openapi\.yaml/],
        // Precache app shell only — large media uses runtimeCaching below.
        globPatterns: [
          "**/*.{js,css,html,ico,svg,woff,woff2}",
          "pwa-*.png",
          "favicon.png",
        ],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "soul-images",
              expiration: {
                maxEntries: 120,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
          {
            urlPattern: ({ url }) =>
              url.origin.includes("supabase") || url.pathname.startsWith("/api"),
            handler: "NetworkFirst",
            options: {
              cacheName: "soul-api",
              networkTimeoutSeconds: 8,
              expiration: {
                maxEntries: 64,
                maxAgeSeconds: 60 * 60 * 24,
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: false,
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
}));
