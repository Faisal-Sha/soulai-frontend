# SoulPlus AI V2 — Supabase

Blank-project setup for the **V2** app. Do not link this folder to the V1 project.

Migrations are **one feature at a time**. Planned full schema: [`erd.md`](./erd.md).

## Apply on a new project

```bash
npx supabase login
npx supabase link --project-ref <V2_PROJECT_REF>
npx supabase db push
npx supabase functions deploy quiz-complete create-checkout-session stripe-webhook cancel-subscription
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

Stripe webhook events (V2 endpoint only): `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `customer.subscription.trial_will_end`.

Cancel (JWT): `cancel-subscription` with `{ "action": "cancel" }` or `{ "action": "resume" }`. Sets Stripe `cancel_at_period_end` — access stays until trial/period end, no $6.99 if they cancel during trial. Idempotent. Emails on cancel only.

Frontend `.env`: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` for this V2 project. Stripe secret keys stay on the functions — not in Vite.

Local Stripe webhook (while `npm run dev` is on 8080):

```bash
stripe listen --forward-to https://<PROJECT_REF>.supabase.co/functions/v1/stripe-webhook
```

Use the `whsec_...` that `stripe listen` prints as `STRIPE_WEBHOOK_SECRET`.

## Auth (required — dashboard must match)

No passwords. Account is created **only after payment** (service role). Login is returning subscribers.

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

## Applied

| File | What it creates |
|------|-----------------|
| `20260828000100_helpers.sql` | `set_updated_at()` |
| `20260828000200_soul_profiles.sql` | Identity, auth trigger, RLS helpers |
| `20260831000100_subscriptions.sql` | `quiz_intents`, `subscriptions`, `stripe_events` |

## Next (do not add until that screen is wired)

See [`erd.md`](./erd.md) — 004 notification prefs, then people, readings, insights, chat.
