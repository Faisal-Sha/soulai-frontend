# SoulPlus AI V2 — Supabase

Blank-project setup for the **V2** app. Do not link this folder to the V1 project.

Migrations are **one feature at a time**. Planned full schema: [`erd.md`](./erd.md).

## Apply on a new project

```bash
npx supabase login
npx supabase link --project-ref <V2_PROJECT_REF>
npx supabase db push
npx supabase functions deploy quiz-complete create-checkout-session stripe-webhook cancel-subscription charge-agent-credits
npx supabase config push
```

Secrets:

```bash
npx supabase secrets set SITE_URL=http://localhost:8080
npx supabase secrets set STRIPE_SECRET_KEY=sk_test_...
npx supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...
npx supabase secrets set RESEND_API_KEY=re_...
npx supabase secrets set RESEND_FROM_EMAIL=noreply@soulplus-ai.com
```

Stripe webhook events (V2 endpoint only — enable these on the sandbox endpoint). Each of these **re-fetches the live Stripe subscription** and copies status/dates; we do not invent trial/cancel dates.

- `checkout.session.completed`
- `payment_intent.succeeded` (agent credit pack only — metadata.kind=agent_credits)
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `customer.subscription.paused`
- `customer.subscription.resumed`
- `customer.subscription.trial_will_end`
- `invoice.created`
- `invoice.finalized`
- `invoice.paid`
- `invoice.payment_failed`
- `invoice.payment_action_required`

Cancel (JWT): `cancel-subscription` with `{ "action": "cancel" }` or `{ "action": "resume" }`. Sets Stripe `cancel_at_period_end` — access stays until trial/period end, no $6.99 if they cancel during trial. Idempotent. Emails on cancel only.

Frontend `.env`: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` for this V2 project. Stripe secret keys stay on the functions — not in Vite.

Local Stripe webhook (while `npm run dev` is on 8080):

```bash
stripe listen --forward-to https://<PROJECT_REF>.supabase.co/functions/v1/stripe-webhook
```

Use the `whsec_...` that `stripe listen` prints as `STRIPE_WEBHOOK_SECRET`.

## Auth (required — dashboard must match)

No passwords. Account is created **only after payment** (service role). Login is returning subscribers.

Deleting a row in **Authentication → Users** follows the FK policy in [`erd.md`](./erd.md): `auth.users` CASCADE `soul_profiles` CASCADE `subscriptions`. A trigger also deletes `quiz_intents` for that email. `stripe_events` and Stripe itself are not FKs and stay.

New user-owned tables must use `owner_profile_id → soul_profiles(id) ON DELETE CASCADE`. Never `SET NULL`. Never FK to `auth.users`.

| Setting | Value |
|---------|--------|
| Allow new users to sign up (global) | **off** — Google/Apple/email cannot create accounts |
| Email provider | **on** — if this is off, magic links fail with “Email logins are disabled” |
| Confirm email | off (we confirm the user when creating after payment) |
| Site URL | `http://localhost:8080` |
| Redirect URLs | `http://localhost:8080/login/callback` |
| Confirm email | off (we confirm the user when creating after payment) |
| Automatic linking of matching emails | **on** |
| Magic link / OTP expiry | **86400 seconds (24 hours)** |
| JWT expiry | 3600 |
| Session timebox | **180 days** |
| Inactivity timeout | **90 days** |
| Email + Google + Apple | login must **not** create users |

Same values live in `config.toml` (`npx supabase config push`). Re-check them in the hosted Auth dashboard after push.

## Flow

1. Quiz (no account). Email is stored in the browser only.
2. Free results stay on `/quiz`.
3. Paywall → `create-checkout-session` writes `quiz_intents` and opens Stripe.
4. `stripe-webhook` on `checkout.session.completed` creates `auth.users` + `soul_profiles` + `subscriptions`, then sends the magic login link.
5. `/paid` tells them to check email. The app (home, account, …) is for signed-in paying users.

## Applied (run in this order)

`npx supabase db push` applies them by timestamp. Do not skip or reorder.

| File | What it does |
|------|----------------|
| `20260828000100_01_helpers.sql` | `set_updated_at()` + delete-policy note |
| `20260828000200_02_soul_profiles.sql` | Identity hub. `auth_user_id → auth.users ON DELETE CASCADE` |
| `20260831000100_03_subscriptions.sql` | `quiz_intents`, `subscriptions` (CASCADE from profile), `stripe_events` (no user FK) |
| `20260901000100_04_soul_profiles_auth_cascade.sql` | Live follow-up: SET NULL → CASCADE (no-op if 02 already CASCADE) |
| `20260901000200_05_quiz_intents_purge_on_delete.sql` | Email trigger: delete `quiz_intents` with Auth / profile |
| `20260901000300_06_fk_delete_policy_comments.sql` | Catalog comments for the locked delete policy |
| `20260901000400_07_people.sql` | `people` + `people_reports` |
| `20260901000500_08_readings.sql` | `readings`, `reading_chapters`, `daily_notes` |
| `20260901000600_09_saved_insights.sql` | `saved_insights` |
| `20260902000100_10_agent_helpers.sql` | `soul_profile_id_for_auth` + vector extension |
| `20260902000200_11_rag_search.sql` | RAG tables (IF NOT EXISTS) + `match_document_chunks` + `get_energy_summaries` |
| `20260902000300_12_agent_memory_and_chat.sql` | `memories`, `chat_history`, `conversation_context` + agent RPCs |
| `20260902000400_13_destiny_metrics.sql` | `destiny_metrics` + `save_matrix` + `get_user_context` (reads `soul_profiles`) |

## Next (do not add until that screen is wired)

Chat, then notifications / PWA. Readings **content** is a static pack until generate-reading.
