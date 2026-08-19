# Legacy — Version 1 archive

Self-contained snapshot of the **V1 Soul+ AI frontend** (and its Supabase backend), preserved for reference while V2 is built in the parent `src/` tree.

**Nothing in the live V2 app imports from this folder.** The running app uses `src/App.tsx`, `src/main.tsx`, and `src/features/*` — all V1 duplicates have been removed from the parent `src/` tree.

## Source snapshot

| Item | Detail |
|------|--------|
| Git commit | `d35506d` ("cleanup of directory") |
| Frontend files | 403 files — full pre-V2-migration `src/` tree |
| Backend files | 99 files — `supabase/` (migrations, edge functions, config) |
| Exported | 2026-08-19 |

## Layout

```
legacy/
├── App.tsx              # V1 route map (all legacy routes)
├── main.tsx             # V1 bootstrap (LanguageProvider, Meta Pixel, PWA)
├── index.css            # V1 global styles
├── pages/               # V1 page components (Index, Dashboard, Calculator, …)
├── components/          # V1 UI (Navbar, Footer, Avatar*, Matrix*, …)
├── features/            # Designer screens as they existed in V1 wiring
├── contexts/            # UserContext, AnalyticsContext, LanguageContext
├── hooks/               # useUser, useCheckout, …
├── lib/                 # Services (PDF, compatibility, mixpanel, …)
├── integrations/        # Supabase client + generated types
├── content/             # Matrix sector interpretations (en/ru)
├── product/             # UX flow map, activation helpers
├── core/                # Destiny matrix calculation
├── supabase/            # V1 Supabase project (not connected to V2)
└── tsconfig.json        # Isolated TS config (`@/` → `./` within legacy)
```

## V1 routes (see `App.tsx`)

- **Public:** `/`, `/compatibility`, `/calculator`, `/about`, `/blog`, `/contact`, `/faq`, `/privacy`, `/terms`, `/rates`
- **Auth:** `/auth`, `/set-password`
- **Quiz funnel:** `/quiz/*`
- **Activation:** `/reading`, `/processing`, `/download-report`, `/upsell`, mentor/notifications onboarding
- **Retention (logged-in):** `/dashboard`, `/avatar`, `/diary`, `/notes`, `/profile`, `/agent`, `/readings/*`, `/people/*`, `/account/*`
- **Admin:** `/admin`

## How to inspect

1. **Browse** — open any file; imports use `@/` which resolves within this folder via `tsconfig.json`.
2. **Compare with V2** — live screens live in `src/features/`; this folder shows how they were wired in V1.
3. **Recover behavior** — copy the relevant page/service into `src/features/` and wire a new route in `src/App.tsx`.

## Supabase

The `supabase/` subfolder is the **V1 backend** (edge functions, migrations). It is **not** linked to the V2 Supabase project. Do not deploy or point V2 env vars at this archive.

## Do not

- Import from `@/legacy/...` in the live V2 app
- Delete this folder until all needed V1 behavior has been ported
- Mix V1 and V2 Supabase credentials
