-- =============================================================================
-- V2 / 03 quiz_intents + subscriptions + stripe_events
-- Account is created only after Stripe payment — not at the quiz email gate.
-- subscriptions.owner_profile_id → soul_profiles ON DELETE CASCADE.
-- quiz_intents has no Auth FK (purged in 05). stripe_events has no user FK.
-- Depends on: 02 soul_profiles
-- =============================================================================

CREATE TABLE public.quiz_intents (
  id                           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email                        text NOT NULL,
  quiz_answers                 jsonb NOT NULL,
  utm_source                   text,
  utm_medium                   text,
  utm_campaign                 text,
  stripe_checkout_session_id   text UNIQUE,
  consumed_at                  timestamptz,
  created_at                   timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT quiz_intents_email_lower_chk
    CHECK (email = lower(email))
);

CREATE INDEX quiz_intents_email_idx ON public.quiz_intents (email);
CREATE INDEX quiz_intents_open_idx ON public.quiz_intents (created_at)
  WHERE consumed_at IS NULL;

COMMENT ON TABLE public.quiz_intents IS
  'Pre-payment quiz stash. No Auth FK (row exists before login). Purged by trigger when auth.users or soul_profiles for that email is deleted.';

ALTER TABLE public.quiz_intents ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.quiz_intents FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.quiz_intents TO service_role;

CREATE TABLE public.subscriptions (
  owner_profile_id         uuid PRIMARY KEY
                             REFERENCES public.soul_profiles(id) ON DELETE CASCADE,

  status                   text NOT NULL,
  plan_type                text NOT NULL,

  stripe_customer_id       text,
  stripe_subscription_id   text UNIQUE,

  expires_at               timestamptz,
  current_period_start     timestamptz,
  current_period_end       timestamptz,
  cancel_at_period_end     boolean NOT NULL DEFAULT false,
  cancel_at                timestamptz,

  created_at               timestamptz NOT NULL DEFAULT now(),
  updated_at               timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX subscriptions_stripe_customer_id_idx
  ON public.subscriptions (stripe_customer_id);

COMMENT ON TABLE public.subscriptions IS
  'App cache of Stripe state. 1:1 with soul_profiles. owner_profile_id ON DELETE CASCADE. Stripe itself is not a Postgres FK.';

CREATE TRIGGER subscriptions_set_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY subscriptions_select_own
  ON public.subscriptions
  FOR SELECT
  TO authenticated
  USING (public.owner_profile_matches(owner_profile_id));

REVOKE ALL ON public.subscriptions FROM PUBLIC, anon, authenticated;
GRANT SELECT ON public.subscriptions TO authenticated;
GRANT ALL ON public.subscriptions TO service_role;

CREATE TABLE public.stripe_events (
  id            text PRIMARY KEY,
  type          text NOT NULL,
  received_at   timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.stripe_events IS
  'Webhook idempotency (event id + type only). No user FK — do not CASCADE from Auth.';

COMMENT ON TABLE public.soul_profiles IS
  'V2 identity hub. Created after Stripe payment. Auth delete CASCADE-removes this row; children CASCADE from here.';

ALTER TABLE public.stripe_events ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.stripe_events FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.stripe_events TO service_role;
