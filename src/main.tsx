import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import { initMetaPixel } from "@/pages/quiz/lib/metaPixel";
import App from "./App.tsx";
import "./index.css";

// Meta Pixel from VITE_META_PIXEL_ID (.env). Not index.html
initMetaPixel();

if (import.meta.env.PROD) {
  registerSW({ immediate: true });
} else if ("serviceWorker" in navigator) {
  // Drop leftover SW from earlier PWA-in-dev experiments (ngrok interstitial cache).
  void navigator.serviceWorker.getRegistrations().then((regs) => {
    for (const reg of regs) void reg.unregister();
  });
}

createRoot(document.getElementById("root")!).render(<App />);
