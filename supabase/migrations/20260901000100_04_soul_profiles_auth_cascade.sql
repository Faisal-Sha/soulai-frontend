-- =============================================================================
-- V2 / 04 soul_profiles auth CASCADE
-- Follow-up for projects that applied 02 while auth_user_id was SET NULL.
-- Idempotent: DROP + ADD CASCADE. Safe on a blank project (02 already CASCADE).
-- Depends on: 02 soul_profiles
-- =============================================================================

ALTER TABLE public.soul_profiles
  DROP CONSTRAINT IF EXISTS soul_profiles_auth_user_id_fkey;

ALTER TABLE public.soul_profiles
  ADD CONSTRAINT soul_profiles_auth_user_id_fkey
  FOREIGN KEY (auth_user_id)
  REFERENCES auth.users(id)
  ON DELETE CASCADE;

COMMENT ON COLUMN public.soul_profiles.auth_user_id IS
  'Login door. ON DELETE CASCADE. Never SET NULL.';

DELETE FROM public.soul_profiles
WHERE auth_user_id IS NULL;
