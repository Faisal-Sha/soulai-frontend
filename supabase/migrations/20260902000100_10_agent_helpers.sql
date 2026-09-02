-- =============================================================================
-- V2 / 10 agent helpers
-- Shared lookup used by agent tables and RPCs.
-- Depends on: 01 helpers (set_updated_at), 02 soul_profiles
-- Safe to re-run.
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA extensions;

CREATE OR REPLACE FUNCTION public.soul_profile_id_for_auth(p_auth_user_id uuid)
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id
  FROM public.soul_profiles
  WHERE auth_user_id = p_auth_user_id
  LIMIT 1;
$$;

COMMENT ON FUNCTION public.soul_profile_id_for_auth(uuid) IS
  'Maps auth.users.id (the id the agent sends) to soul_profiles.id.';

REVOKE ALL ON FUNCTION public.soul_profile_id_for_auth(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.soul_profile_id_for_auth(uuid)
  TO anon, authenticated, service_role;
