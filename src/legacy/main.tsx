import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { initMetaPixel } from "@/features/quiz/lib/metaPixel";
import App from "./App.tsx";
import "./index.css";

// Meta Pixel from VITE_META_PIXEL_ID (.env) — not index.html
initMetaPixel();

registerSW({ immediate: true });

createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <App />
  </LanguageProvider>
);
