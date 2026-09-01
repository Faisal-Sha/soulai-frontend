-- =============================================================================
-- V2 / 01 helpers
-- Shared functions used by every later migration.
-- Safe to apply on a blank Supabase project.
--
-- Delete policy (FK):
--   auth.users → soul_profiles.auth_user_id ON DELETE CASCADE
--   soul_profiles → every user-owned table.owner_profile_id ON DELETE CASCADE
--   Never SET NULL on those FKs. Never point user tables at auth.users.
--   quiz_intents has no Auth FK (pre-payment); purged by trigger on email.
--   stripe_events has no user FK (webhook idempotency).
-- =============================================================================

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

COMMENT ON FUNCTION public.set_updated_at() IS
  'BEFORE UPDATE trigger: stamp updated_at = now().';
