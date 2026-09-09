-- =============================================================================
-- V2 / 15 agent credit wallet (free-5 + usage credits)
-- Agent sends auth.users.id as p_user_id → soul_profile_id_for_auth.
-- Depends on: 02 soul_profiles, 10 agent_helpers
-- Safe to re-run.
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.agent_wallets (
  owner_profile_id uuid PRIMARY KEY
    REFERENCES public.soul_profiles(id) ON DELETE CASCADE,
  free_remaining integer NOT NULL DEFAULT 5
    CHECK (free_remaining >= 0),
  free_granted integer NOT NULL DEFAULT 5
    CHECK (free_granted >= 0),
  credit_balance numeric(14, 4) NOT NULL DEFAULT 0
    CHECK (credit_balance >= 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS agent_wallets_set_updated_at ON public.agent_wallets;
CREATE TRIGGER agent_wallets_set_updated_at
  BEFORE UPDATE ON public.agent_wallets
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.agent_wallets ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS agent_wallets_select_own ON public.agent_wallets;
CREATE POLICY agent_wallets_select_own
  ON public.agent_wallets FOR SELECT TO authenticated
  USING (public.owner_profile_matches(owner_profile_id));

REVOKE ALL ON public.agent_wallets FROM PUBLIC, anon, authenticated;
GRANT SELECT ON public.agent_wallets TO authenticated;
GRANT ALL ON public.agent_wallets TO service_role;

CREATE TABLE IF NOT EXISTS public.agent_credit_ledger (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_profile_id uuid NOT NULL
    REFERENCES public.soul_profiles(id) ON DELETE CASCADE,
  turn_id uuid,
  delta_free integer NOT NULL DEFAULT 0,
  delta_credits numeric(14, 4) NOT NULL DEFAULT 0,
  reason text NOT NULL,
  free_after integer,
  credit_balance_after numeric(14, 4),
  meta jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS agent_credit_ledger_owner_created_idx
  ON public.agent_credit_ledger (owner_profile_id, created_at DESC);

ALTER TABLE public.agent_credit_ledger ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS agent_credit_ledger_select_own ON public.agent_credit_ledger;
CREATE POLICY agent_credit_ledger_select_own
  ON public.agent_credit_ledger FOR SELECT TO authenticated
  USING (public.owner_profile_matches(owner_profile_id));

REVOKE ALL ON public.agent_credit_ledger FROM PUBLIC, anon, authenticated;
GRANT SELECT ON public.agent_credit_ledger TO authenticated;
GRANT ALL ON public.agent_credit_ledger TO service_role;

CREATE TABLE IF NOT EXISTS public.agent_usage_turns (
  turn_id uuid PRIMARY KEY,
  owner_profile_id uuid NOT NULL
    REFERENCES public.soul_profiles(id) ON DELETE CASCADE,
  thread_id text NOT NULL,
  billing_mode text NOT NULL,
  raw_usd numeric(16, 10) NOT NULL DEFAULT 0,
  charge_usd numeric(16, 10) NOT NULL DEFAULT 0,
  credits_charged numeric(14, 4) NOT NULL DEFAULT 0,
  tools_used integer NOT NULL DEFAULT 0,
  model text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS agent_usage_turns_owner_created_idx
  ON public.agent_usage_turns (owner_profile_id, created_at DESC);

ALTER TABLE public.agent_usage_turns ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS agent_usage_turns_select_own ON public.agent_usage_turns;
CREATE POLICY agent_usage_turns_select_own
  ON public.agent_usage_turns FOR SELECT TO authenticated
  USING (public.owner_profile_matches(owner_profile_id));

REVOKE ALL ON public.agent_usage_turns FROM PUBLIC, anon, authenticated;
GRANT SELECT ON public.agent_usage_turns TO authenticated;
GRANT ALL ON public.agent_usage_turns TO service_role;

CREATE TABLE IF NOT EXISTS public.agent_usage_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  turn_id uuid NOT NULL
    REFERENCES public.agent_usage_turns(turn_id) ON DELETE CASCADE,
  owner_profile_id uuid NOT NULL
    REFERENCES public.soul_profiles(id) ON DELETE CASCADE,
  kind text NOT NULL,
  model text,
  tier text,
  purpose text,
  uncached_input_tokens integer NOT NULL DEFAULT 0,
  cached_input_tokens integer NOT NULL DEFAULT 0,
  cache_write_tokens integer NOT NULL DEFAULT 0,
  output_tokens integer NOT NULL DEFAULT 0,
  usd numeric(16, 10) NOT NULL DEFAULT 0,
  tool_names jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS agent_usage_events_turn_idx
  ON public.agent_usage_events (turn_id);

ALTER TABLE public.agent_usage_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS agent_usage_events_select_own ON public.agent_usage_events;
CREATE POLICY agent_usage_events_select_own
  ON public.agent_usage_events FOR SELECT TO authenticated
  USING (public.owner_profile_matches(owner_profile_id));

REVOKE ALL ON public.agent_usage_events FROM PUBLIC, anon, authenticated;
GRANT SELECT ON public.agent_usage_events TO authenticated;
GRANT ALL ON public.agent_usage_events TO service_role;

-- ---------------------------------------------------------------------------
-- RPCs
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.agent_wallet_ensure(p_user_id uuid)
RETURNS TABLE (
  owner_profile_id uuid,
  free_remaining integer,
  free_granted integer,
  credit_balance numeric
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_profile_id uuid;
BEGIN
  v_profile_id := public.soul_profile_id_for_auth(p_user_id);
  IF v_profile_id IS NULL THEN
    RAISE EXCEPTION 'soul_profile not found for auth user %', p_user_id;
  END IF;

  INSERT INTO public.agent_wallets (owner_profile_id)
  VALUES (v_profile_id)
  ON CONFLICT (owner_profile_id) DO NOTHING;

  RETURN QUERY
  SELECT
    w.owner_profile_id,
    w.free_remaining,
    w.free_granted,
    w.credit_balance
  FROM public.agent_wallets w
  WHERE w.owner_profile_id = v_profile_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.agent_wallet_get(p_user_id uuid)
RETURNS TABLE (
  owner_profile_id uuid,
  free_remaining integer,
  free_granted integer,
  credit_balance numeric
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM public.agent_wallet_ensure(p_user_id);
END;
$$;

CREATE OR REPLACE FUNCTION public.agent_wallet_topup(
  p_user_id uuid,
  p_credits numeric,
  p_reason text DEFAULT 'topup',
  p_meta jsonb DEFAULT '{}'::jsonb
)
RETURNS TABLE (
  owner_profile_id uuid,
  free_remaining integer,
  free_granted integer,
  credit_balance numeric
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_profile_id uuid;
  v_credits numeric(14, 4);
BEGIN
  IF p_credits IS NULL OR p_credits <= 0 THEN
    RAISE EXCEPTION 'p_credits must be > 0';
  END IF;

  v_credits := round(p_credits::numeric, 4);
  v_profile_id := public.soul_profile_id_for_auth(p_user_id);
  IF v_profile_id IS NULL THEN
    RAISE EXCEPTION 'soul_profile not found for auth user %', p_user_id;
  END IF;

  INSERT INTO public.agent_wallets (owner_profile_id)
  VALUES (v_profile_id)
  ON CONFLICT (owner_profile_id) DO NOTHING;

  UPDATE public.agent_wallets
  SET credit_balance = credit_balance + v_credits,
      updated_at = now()
  WHERE owner_profile_id = v_profile_id;

  INSERT INTO public.agent_credit_ledger (
    owner_profile_id, delta_free, delta_credits, reason,
    free_after, credit_balance_after, meta
  )
  SELECT
    w.owner_profile_id,
    0,
    v_credits,
    COALESCE(NULLIF(trim(p_reason), ''), 'topup'),
    w.free_remaining,
    w.credit_balance,
    COALESCE(p_meta, '{}'::jsonb)
  FROM public.agent_wallets w
  WHERE w.owner_profile_id = v_profile_id;

  RETURN QUERY
  SELECT w.owner_profile_id, w.free_remaining, w.free_granted, w.credit_balance
  FROM public.agent_wallets w
  WHERE w.owner_profile_id = v_profile_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.agent_wallet_settle_turn(
  p_user_id uuid,
  p_turn_id uuid,
  p_thread_id text,
  p_billing_mode text,
  p_raw_usd numeric,
  p_charge_usd numeric,
  p_credits_charged numeric,
  p_tools_used integer,
  p_model text,
  p_events jsonb,
  p_burn_free boolean
)
RETURNS TABLE (
  owner_profile_id uuid,
  free_remaining integer,
  free_granted integer,
  credit_balance numeric,
  credits_charged numeric,
  billing_mode text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_profile_id uuid;
  v_free integer;
  v_balance numeric(14, 4);
  v_charge numeric(14, 4);
  v_event jsonb;
BEGIN
  v_profile_id := public.soul_profile_id_for_auth(p_user_id);
  IF v_profile_id IS NULL THEN
    RAISE EXCEPTION 'soul_profile not found for auth user %', p_user_id;
  END IF;

  INSERT INTO public.agent_wallets (owner_profile_id)
  VALUES (v_profile_id)
  ON CONFLICT (owner_profile_id) DO NOTHING;

  -- Idempotent: same turn_id already settled
  IF EXISTS (
    SELECT 1 FROM public.agent_usage_turns t WHERE t.turn_id = p_turn_id
  ) THEN
    RETURN QUERY
    SELECT
      w.owner_profile_id,
      w.free_remaining,
      w.free_granted,
      w.credit_balance,
      COALESCE(
        (SELECT u.credits_charged FROM public.agent_usage_turns u WHERE u.turn_id = p_turn_id),
        0
      ),
      p_billing_mode
    FROM public.agent_wallets w
    WHERE w.owner_profile_id = v_profile_id;
    RETURN;
  END IF;

  SELECT w.free_remaining, w.credit_balance
  INTO v_free, v_balance
  FROM public.agent_wallets w
  WHERE w.owner_profile_id = v_profile_id
  FOR UPDATE;

  v_charge := 0;

  IF p_burn_free THEN
    IF v_free <= 0 THEN
      RAISE EXCEPTION 'no free messages remaining';
    END IF;
    v_free := v_free - 1;
    UPDATE public.agent_wallets
    SET free_remaining = v_free, updated_at = now()
    WHERE owner_profile_id = v_profile_id;

    INSERT INTO public.agent_credit_ledger (
      owner_profile_id, turn_id, delta_free, delta_credits, reason,
      free_after, credit_balance_after, meta
    ) VALUES (
      v_profile_id, p_turn_id, -1, 0, 'free_burn',
      v_free, v_balance,
      jsonb_build_object('thread_id', p_thread_id, 'raw_usd', p_raw_usd)
    );
  ELSE
    v_charge := GREATEST(0, round(COALESCE(p_credits_charged, 0)::numeric, 4));
    IF v_charge > v_balance THEN
      v_charge := v_balance;
    END IF;
    v_balance := v_balance - v_charge;
    UPDATE public.agent_wallets
    SET credit_balance = v_balance, updated_at = now()
    WHERE owner_profile_id = v_profile_id;

    INSERT INTO public.agent_credit_ledger (
      owner_profile_id, turn_id, delta_free, delta_credits, reason,
      free_after, credit_balance_after, meta
    ) VALUES (
      v_profile_id, p_turn_id, 0, -v_charge, 'usage',
      v_free, v_balance,
      jsonb_build_object(
        'thread_id', p_thread_id,
        'raw_usd', p_raw_usd,
        'charge_usd', p_charge_usd
      )
    );
  END IF;

  INSERT INTO public.agent_usage_turns (
    turn_id, owner_profile_id, thread_id, billing_mode,
    raw_usd, charge_usd, credits_charged, tools_used, model
  ) VALUES (
    p_turn_id, v_profile_id, p_thread_id, p_billing_mode,
    COALESCE(p_raw_usd, 0),
    CASE WHEN p_burn_free THEN 0 ELSE COALESCE(p_charge_usd, 0) END,
    CASE WHEN p_burn_free THEN 0 ELSE v_charge END,
    COALESCE(p_tools_used, 0),
    p_model
  );

  IF p_events IS NOT NULL AND jsonb_typeof(p_events) = 'array' THEN
    FOR v_event IN SELECT * FROM jsonb_array_elements(p_events)
    LOOP
      INSERT INTO public.agent_usage_events (
        turn_id, owner_profile_id, kind, model, tier, purpose,
        uncached_input_tokens, cached_input_tokens, cache_write_tokens,
        output_tokens, usd, tool_names
      ) VALUES (
        p_turn_id,
        v_profile_id,
        COALESCE(v_event->>'kind', 'llm'),
        v_event->>'model',
        v_event->>'tier',
        v_event->>'purpose',
        COALESCE((v_event->>'uncached_input_tokens')::integer, 0),
        COALESCE((v_event->>'cached_input_tokens')::integer, 0),
        COALESCE((v_event->>'cache_write_tokens')::integer, 0),
        COALESCE((v_event->>'output_tokens')::integer, 0),
        COALESCE((v_event->>'usd')::numeric, 0),
        COALESCE(v_event->'tool_names', '[]'::jsonb)
      );
    END LOOP;
  END IF;

  RETURN QUERY
  SELECT
    v_profile_id,
    v_free,
    (SELECT free_granted FROM public.agent_wallets WHERE owner_profile_id = v_profile_id),
    v_balance,
    CASE WHEN p_burn_free THEN 0::numeric ELSE v_charge END,
    p_billing_mode;
END;
$$;

GRANT EXECUTE ON FUNCTION public.agent_wallet_ensure(uuid)
  TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.agent_wallet_get(uuid)
  TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.agent_wallet_topup(uuid, numeric, text, jsonb)
  TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.agent_wallet_settle_turn(
  uuid, uuid, text, text, numeric, numeric, numeric, integer, text, jsonb, boolean
) TO anon, authenticated, service_role;

COMMENT ON TABLE public.agent_wallets IS
  'Per-user free message allowance (default 5) + purchased usage credits.';
COMMENT ON TABLE public.agent_usage_turns IS
  'One row per billed agent turn with cost rollup for audit.';
