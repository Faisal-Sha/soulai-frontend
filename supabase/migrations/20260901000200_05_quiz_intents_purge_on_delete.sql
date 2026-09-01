-- =============================================================================
-- V2 / 05 quiz_intents purge on delete
-- quiz_intents is email-keyed (exists before Auth), so it cannot CASCADE.
-- BEFORE DELETE on auth.users and soul_profiles removes that email's intents.
-- stripe_events is not touched.
-- Depends on: 03 subscriptions
-- =============================================================================

CREATE OR REPLACE FUNCTION public.purge_quiz_intents_for_email()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF OLD.email IS NOT NULL THEN
    DELETE FROM public.quiz_intents
    WHERE email = lower(OLD.email);
  END IF;
  RETURN OLD;
END;
$$;

COMMENT ON FUNCTION public.purge_quiz_intents_for_email() IS
  'BEFORE DELETE on auth.users / soul_profiles: drop pre-payment quiz_intents for that email.';

DROP TRIGGER IF EXISTS on_auth_user_deleted ON auth.users;
CREATE TRIGGER on_auth_user_deleted
  BEFORE DELETE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.purge_quiz_intents_for_email();

DROP TRIGGER IF EXISTS on_soul_profile_deleted ON public.soul_profiles;
CREATE TRIGGER on_soul_profile_deleted
  BEFORE DELETE ON public.soul_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.purge_quiz_intents_for_email();

COMMENT ON TABLE public.quiz_intents IS
  'Pre-payment stash. No Auth FK. Purged when auth.users or soul_profiles for that email is deleted.';
