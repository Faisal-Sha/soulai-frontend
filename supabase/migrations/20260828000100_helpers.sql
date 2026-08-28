-- =============================================================================
-- V2 / 01 helpers
-- Shared functions used by every later migration.
-- Safe to apply on a blank Supabase project.
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
