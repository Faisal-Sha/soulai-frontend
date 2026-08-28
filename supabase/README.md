# SoulPlus AI V2 — Supabase

Blank-project setup for the **V2** app. Do not link this folder to the V1 project.

Migrations are **one feature at a time**. Planned full schema: [`erd.md`](./erd.md).

## Apply on a new project

```bash
npx supabase login
npx supabase link --project-ref <V2_PROJECT_REF>
npx supabase db push
npx supabase functions deploy quiz-complete
npx supabase config push
```

Secrets and env:

- Function secret `SITE_URL` = `http://localhost:8080` locally (Vite is 8080, not 5173)
- Frontend `.env`: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` for this V2 project

## Auth (required — dashboard must match)

No passwords. Magic link + later Google/Apple.

| Setting | Value |
|---------|--------|
| Site URL | `http://localhost:8080` |
| Redirect URLs | `http://localhost:8080/login/callback` |
| Confirm email | off (quiz-complete confirms the user) |
| Automatic linking of matching emails | **on** |
| Magic link / OTP expiry | **86400 seconds (24 hours)** — the email link expires; request a new one from Use email instead |
| JWT expiry | 3600 (refreshed in the background) |
| Session timebox | **180 days** |
| Inactivity timeout | **90 days** |
| Email + Google + Apple | enable when ready; login OTP must **not** create users |

Same values live in `config.toml` (`npx supabase config push`). Re-check them in the hosted Auth dashboard after push.

## Applied now (step 1 — identity)

| File | What it creates |
|------|-----------------|
| `20260828000100_helpers.sql` | `set_updated_at()` |
| `20260828000200_soul_profiles.sql` | Identity, auth trigger, RLS helpers |

`soul_profiles` is the only product table. Quiz email writes it through `quiz-complete`. Anon has no table access.

## Next (do not add until that screen is wired)

See [`erd.md`](./erd.md) for the target ERD and the 003 → 008 order (subscriptions, notifications, people, readings, insights, chat).
