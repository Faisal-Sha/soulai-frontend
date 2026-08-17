-- Tracks completed upsell purchases (Upsell B and any future add-ons)
-- Separate from subscriptions — these are one-time charges

CREATE TABLE IF NOT EXISTS public.upsell_purchases (
  id                      uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                 uuid        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  addon                   text        NOT NULL,   -- e.g. 'compatibility_deep_dive'
  amount                  numeric     NOT NULL,   -- e.g. 9.99
  currency                text        NOT NULL DEFAULT 'usd',
  stripe_payment_intent_id text       UNIQUE,     -- pi_xxx — idempotency key
  stripe_customer_id      text,
  status                  text        NOT NULL DEFAULT 'succeeded',
  created_at              timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_upsell_purchases_user
  ON public.upsell_purchases (user_id);

CREATE INDEX IF NOT EXISTS idx_upsell_purchases_addon
  ON public.upsell_purchases (addon);

-- RLS
ALTER TABLE public.upsell_purchases ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "upsell_purchases_user_select" ON public.upsell_purchases;
CREATE POLICY "upsell_purchases_user_select"
  ON public.upsell_purchases
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "upsell_purchases_service_insert" ON public.upsell_purchases;
CREATE POLICY "upsell_purchases_service_insert"
  ON public.upsell_purchases
  FOR INSERT
  TO service_role
  WITH CHECK (true);

COMMENT ON TABLE public.upsell_purchases IS
  'One-time upsell charges. Each row is a completed add-on purchase.';
COMMENT ON COLUMN public.upsell_purchases.addon IS
  'Identifier for the add-on: compatibility_deep_dive, etc.';
COMMENT ON COLUMN public.upsell_purchases.stripe_payment_intent_id IS
  'Used as idempotency key — prevents duplicate records on webhook replay.';
