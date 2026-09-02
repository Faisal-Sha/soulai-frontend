-- =============================================================================
-- V2 / 13 destiny_metrics + get_user_context
-- Personal Destiny Matrix for the agent. Not shown on V2 product screens.
-- Agent RPC names stay the same (save_matrix, get_user_context).
-- Depends on: 02 soul_profiles, 03 subscriptions, 10 agent_helpers
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.destiny_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_profile_id uuid NOT NULL
    REFERENCES public.soul_profiles(id) ON DELETE CASCADE,
  title text NOT NULL DEFAULT 'My Destiny Matrix',
  matrix_type text NOT NULL DEFAULT 'personal',
  birth_date date NOT NULL,
  birth_date_partner date,
  matrix_data jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT destiny_metrics_type_chk
    CHECK (matrix_type = 'personal'),
  CONSTRAINT destiny_metrics_owner_type_key
    UNIQUE (owner_profile_id, matrix_type)
);

CREATE INDEX IF NOT EXISTS destiny_metrics_owner_idx
  ON public.destiny_metrics (owner_profile_id);

COMMENT ON TABLE public.destiny_metrics IS
  'Personal Destiny Matrix numbers for the AI agent. Written at account create / birth-date change.';

DROP TRIGGER IF EXISTS destiny_metrics_set_updated_at ON public.destiny_metrics;
CREATE TRIGGER destiny_metrics_set_updated_at
  BEFORE UPDATE ON public.destiny_metrics
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.destiny_metrics ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS destiny_metrics_select_own ON public.destiny_metrics;
CREATE POLICY destiny_metrics_select_own
  ON public.destiny_metrics FOR SELECT TO authenticated
  USING (public.owner_profile_matches(owner_profile_id));

DROP POLICY IF EXISTS destiny_metrics_insert_own ON public.destiny_metrics;
CREATE POLICY destiny_metrics_insert_own
  ON public.destiny_metrics FOR INSERT TO authenticated
  WITH CHECK (public.owner_profile_matches(owner_profile_id));

DROP POLICY IF EXISTS destiny_metrics_update_own ON public.destiny_metrics;
CREATE POLICY destiny_metrics_update_own
  ON public.destiny_metrics FOR UPDATE TO authenticated
  USING (public.owner_profile_matches(owner_profile_id))
  WITH CHECK (public.owner_profile_matches(owner_profile_id));

REVOKE ALL ON public.destiny_metrics FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.destiny_metrics TO authenticated;
GRANT ALL ON public.destiny_metrics TO service_role;

CREATE OR REPLACE FUNCTION public.save_matrix(
  p_user_id uuid,
  p_title text,
  p_matrix_type text,
  p_birth_date date,
  p_matrix_data jsonb,
  p_birth_date_partner date DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_profile_id uuid;
  saved_row public.destiny_metrics%ROWTYPE;
  clean_type text;
BEGIN
  IF p_user_id IS NULL THEN
    RAISE EXCEPTION 'user_id is required';
  END IF;
  IF p_birth_date IS NULL THEN
    RAISE EXCEPTION 'birth_date is required';
  END IF;
  IF p_matrix_data IS NULL THEN
    RAISE EXCEPTION 'matrix_data is required';
  END IF;

  clean_type := COALESCE(NULLIF(trim(p_matrix_type), ''), 'personal');
  IF clean_type <> 'personal' THEN
    RAISE EXCEPTION 'save_matrix only accepts matrix_type=personal (got %)', clean_type;
  END IF;

  v_profile_id := public.soul_profile_id_for_auth(p_user_id);
  IF v_profile_id IS NULL THEN
    RAISE EXCEPTION 'soul_profile not found for auth user %', p_user_id;
  END IF;

  INSERT INTO public.destiny_metrics (
    owner_profile_id, title, matrix_type, birth_date, birth_date_partner, matrix_data
  )
  VALUES (
    v_profile_id,
    COALESCE(NULLIF(trim(p_title), ''), 'My Destiny Matrix'),
    'personal',
    p_birth_date,
    p_birth_date_partner,
    p_matrix_data
  )
  ON CONFLICT (owner_profile_id, matrix_type)
  DO UPDATE SET
    title = EXCLUDED.title,
    birth_date = EXCLUDED.birth_date,
    birth_date_partner = EXCLUDED.birth_date_partner,
    matrix_data = EXCLUDED.matrix_data,
    updated_at = now()
  RETURNING * INTO saved_row;

  RETURN jsonb_build_object(
    'id', saved_row.id,
    'user_id', p_user_id,
    'owner_profile_id', saved_row.owner_profile_id,
    'title', saved_row.title,
    'matrix_type', saved_row.matrix_type,
    'birth_date', saved_row.birth_date,
    'birth_date_partner', saved_row.birth_date_partner,
    'matrix_data', saved_row.matrix_data,
    'created_at', saved_row.created_at,
    'updated_at', saved_row.updated_at
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.save_matrix(uuid, text, text, date, jsonb, date)
  TO anon, authenticated, service_role;

DROP FUNCTION IF EXISTS public.get_user_context(uuid);
DROP FUNCTION IF EXISTS public.get_user_context(uuid, text[]);

CREATE OR REPLACE FUNCTION public.get_user_context(
  p_user_id uuid,
  p_fields text[] DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result jsonb;
BEGIN
  SELECT jsonb_build_object(
    'profile',
    (
      SELECT jsonb_build_object(
        'id', p.auth_user_id,
        'soul_profile_id', p.id,
        'name', p.full_name,
        'email', p.email,
        'dob', p.birth_date
      )
      FROM public.soul_profiles p
      WHERE p.auth_user_id = p_user_id
    ),
    'subscription',
    (
      SELECT jsonb_build_object(
        'status', s.status,
        'plan_type', s.plan_type,
        'expires_at', s.expires_at,
        'is_premium', (s.status IN ('active', 'trialing'))
      )
      FROM public.subscriptions s
      JOIN public.soul_profiles p ON p.id = s.owner_profile_id
      WHERE p.auth_user_id = p_user_id
    ),
    'current_personal_matrix',
    (
      SELECT jsonb_build_object(
        'id', m.id,
        'title', m.title,
        'matrix_type', m.matrix_type,
        'birth_date', m.birth_date,
        'birth_date_partner', m.birth_date_partner,
        'matrix_data', m.matrix_data
      )
      FROM public.destiny_metrics m
      JOIN public.soul_profiles p ON p.id = m.owner_profile_id
      WHERE p.auth_user_id = p_user_id
        AND m.matrix_type = 'personal'
      ORDER BY m.updated_at DESC
      LIMIT 1
    ),
    'metadata',
    jsonb_build_object(
      'user_exists',
      EXISTS (
        SELECT 1 FROM public.soul_profiles p WHERE p.auth_user_id = p_user_id
      ),
      'has_subscription',
      EXISTS (
        SELECT 1
        FROM public.subscriptions s
        JOIN public.soul_profiles p ON p.id = s.owner_profile_id
        WHERE p.auth_user_id = p_user_id
      ),
      'has_personal_matrix',
      EXISTS (
        SELECT 1
        FROM public.destiny_metrics m
        JOIN public.soul_profiles p ON p.id = m.owner_profile_id
        WHERE p.auth_user_id = p_user_id
          AND m.matrix_type = 'personal'
      )
    )
  )
  INTO result;

  IF p_fields IS NULL THEN
    RETURN result;
  END IF;

  RETURN (
    SELECT jsonb_object_agg(key, value)
    FROM jsonb_each(result)
    WHERE key = ANY (p_fields) OR key = 'metadata'
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_user_context(uuid, text[])
  TO anon, authenticated, service_role;
