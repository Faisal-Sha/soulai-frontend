/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly VITE_ENABLE_ADMIN?: string
  readonly VITE_ENABLE_LEGACY_ROUTES?: string
  readonly VITE_ENABLE_AUTH?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
