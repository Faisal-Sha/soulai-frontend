-- Fix ambiguous owner_profile_id / free_* / credit_balance in wallet RPCs.
-- RETURNS TABLE output names collide with agent_wallets columns in PL/pgSQL.

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

  INSERT INTO public.agent_wallets AS aw (owner_profile_id)
  VALUES (v_profile_id)
  ON CONFLICT ON CONSTRAINT agent_wallets_pkey DO NOTHING;

  RETURN QUERY
  SELECT q.owner_profile_id, q.free_remaining, q.free_granted, q.credit_balance
  FROM (
    SELECT
      aw.owner_profile_id,
      aw.free_remaining,
      aw.free_granted,
      aw.credit_balance
    FROM public.agent_wallets AS aw
    WHERE aw.owner_profile_id = v_profile_id
  ) AS q;
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
  SELECT e.owner_profile_id, e.free_remaining, e.free_granted, e.credit_balance
  FROM public.agent_wallet_ensure(p_user_id) AS e;
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

  INSERT INTO public.agent_wallets AS aw (owner_profile_id)
  VALUES (v_profile_id)
  ON CONFLICT ON CONSTRAINT agent_wallets_pkey DO NOTHING;

  UPDATE public.agent_wallets AS aw
  SET credit_balance = aw.credit_balance + v_credits,
      updated_at = now()
  WHERE aw.owner_profile_id = v_profile_id;

  INSERT INTO public.agent_credit_ledger (
    owner_profile_id, delta_free, delta_credits, reason,
    free_after, credit_balance_after, meta
  )
  SELECT
    aw.owner_profile_id,
    0,
    v_credits,
    COALESCE(NULLIF(trim(p_reason), ''), 'topup'),
    aw.free_remaining,
    aw.credit_balance,
    COALESCE(p_meta, '{}'::jsonb)
  FROM public.agent_wallets AS aw
  WHERE aw.owner_profile_id = v_profile_id;

  RETURN QUERY
  SELECT q.owner_profile_id, q.free_remaining, q.free_granted, q.credit_balance
  FROM (
    SELECT
      aw.owner_profile_id,
      aw.free_remaining,
      aw.free_granted,
      aw.credit_balance
    FROM public.agent_wallets AS aw
    WHERE aw.owner_profile_id = v_profile_id
  ) AS q;
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
  v_granted integer;
  v_charge numeric(14, 4);
  v_event jsonb;
BEGIN
  v_profile_id := public.soul_profile_id_for_auth(p_user_id);
  IF v_profile_id IS NULL THEN
    RAISE EXCEPTION 'soul_profile not found for auth user %', p_user_id;
  END IF;

  INSERT INTO public.agent_wallets AS aw (owner_profile_id)
  VALUES (v_profile_id)
  ON CONFLICT ON CONSTRAINT agent_wallets_pkey DO NOTHING;

  IF EXISTS (
    SELECT 1 FROM public.agent_usage_turns AS t WHERE t.turn_id = p_turn_id
  ) THEN
    RETURN QUERY
    SELECT
      q.owner_profile_id,
      q.free_remaining,
      q.free_granted,
      q.credit_balance,
      q.credits_charged,
      p_billing_mode
    FROM (
      SELECT
        aw.owner_profile_id,
        aw.free_remaining,
        aw.free_granted,
        aw.credit_balance,
        COALESCE(u.credits_charged, 0::numeric) AS credits_charged
      FROM public.agent_wallets AS aw
      LEFT JOIN public.agent_usage_turns AS u ON u.turn_id = p_turn_id
      WHERE aw.owner_profile_id = v_profile_id
    ) AS q;
    RETURN;
  END IF;

  SELECT aw.free_remaining, aw.credit_balance, aw.free_granted
  INTO v_free, v_balance, v_granted
  FROM public.agent_wallets AS aw
  WHERE aw.owner_profile_id = v_profile_id
  FOR UPDATE;

  v_charge := 0;

  IF p_burn_free THEN
    IF v_free <= 0 THEN
      RAISE EXCEPTION 'no free messages remaining';
    END IF;
    v_free := v_free - 1;
    UPDATE public.agent_wallets AS aw
    SET free_remaining = v_free, updated_at = now()
    WHERE aw.owner_profile_id = v_profile_id;

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
    UPDATE public.agent_wallets AS aw
    SET credit_balance = v_balance, updated_at = now()
    WHERE aw.owner_profile_id = v_profile_id;

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
    v_granted,
    v_balance,
    CASE WHEN p_burn_free THEN 0::numeric ELSE v_charge END,
    p_billing_mode;
END;
$$;
