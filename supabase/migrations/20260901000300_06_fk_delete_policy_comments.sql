-- =============================================================================
-- V2 / 06 fk delete policy comments
-- Catalog comments only. No schema change.
-- Depends on: 04, 05
-- =============================================================================

COMMENT ON SCHEMA public IS
  'SoulPlus V2. Delete: auth.users CASCADE soul_profiles CASCADE owner_profile_id children. quiz_intents purged by email trigger. stripe_events has no user FK.';

COMMENT ON TABLE public.soul_profiles IS
  'Identity hub. auth_user_id → auth.users ON DELETE CASCADE. User-owned tables FK here, not auth.users.';

COMMENT ON COLUMN public.soul_profiles.auth_user_id IS
  'Login door only. ON DELETE CASCADE. Never SET NULL.';

COMMENT ON TABLE public.subscriptions IS
  'App cache of Stripe state. owner_profile_id → soul_profiles ON DELETE CASCADE. Stripe records are not in this table.';

COMMENT ON TABLE public.quiz_intents IS
  'Pre-payment stash. No Auth FK. Purged by purge_quiz_intents_for_email on auth.users / soul_profiles delete.';

COMMENT ON TABLE public.stripe_events IS
  'Webhook idempotency. No user FK. Do not CASCADE from Auth.';
