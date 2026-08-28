# SoulPlus AI V2 — Supabase

Blank-project setup for the **V2** app. Do not link this folder to the V1 project.

Migrations are **one feature at a time**. Planned full schema: [`erd.md`](./erd.md).

## Apply on a new project

```bash
npx supabase login
npx supabase link --project-ref <V2_PROJECT_REF>
npx supabase db push
npx supabase functions deploy quiz-complete
```

Set function secret `SITE_URL` to the V2 app origin. Point the frontend `.env` at this project (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`).

Auth dashboard: Email + Google + Apple, confirm email on, automatic linking of matching emails on. Magic-link redirect: `{SITE_URL}/login/callback`.

## Applied now (step 1 — identity)

| File | What it creates |
|------|-----------------|
| `20260828000100_helpers.sql` | `set_updated_at()` |
| `20260828000200_soul_profiles.sql` | Identity, auth trigger, RLS helpers |

`soul_profiles` is the only product table. Quiz email writes it through `quiz-complete`. Anon has no table access.

## Next (do not add until that screen is wired)

See [`erd.md`](./erd.md) for the target ERD and the 003 → 008 order (subscriptions, notifications, people, readings, insights, chat).
