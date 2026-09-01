-- =============================================================================
-- V2 / 02 soul_profiles
-- Identity hub. auth_user_id → auth.users ON DELETE CASCADE.
-- Child tables FK owner_profile_id here, not auth.users.
-- Depends on: 01 helpers
-- =============================================================================

CREATE TABLE public.soul_profiles (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  auth_user_id      uuid UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,

  full_name         text,
  email             text UNIQUE,
  avatar_url        text,

  birth_date        date,
  birth_time        time,
  birth_place       text,

  quiz_answers      jsonb NOT NULL DEFAULT '{}'::jsonb,
  quiz_started_at   timestamptz,
  quiz_completed_at timestamptz,

  utm_source        text,
  utm_medium        text,
  utm_campaign      text,

  know_answers      jsonb NOT NULL DEFAULT '{}'::jsonb,

  source            text NOT NULL DEFAULT 'quiz',
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT soul_profiles_source_chk
    CHECK (source IN ('quiz', 'oauth', 'import')),
  CONSTRAINT soul_profiles_email_lower_chk
    CHECK (email IS NULL OR email = lower(email))
);

CREATE INDEX soul_profiles_auth_user_id_idx
  ON public.soul_profiles (auth_user_id);

CREATE INDEX soul_profiles_quiz_answers_gin
  ON public.soul_profiles USING gin (quiz_answers);

COMMENT ON TABLE public.soul_profiles IS
  'V2 identity hub. Created after Stripe payment. Auth delete CASCADE-removes this row; children CASCADE from here.';
COMMENT ON COLUMN public.soul_profiles.auth_user_id IS
  'Login door. Deleting auth.users cascades this row; child tables cascade from here.';
COMMENT ON COLUMN public.soul_profiles.quiz_answers IS
  'Full QuizAnswers object. Keys must match src/pages/quiz/types.ts.';
COMMENT ON COLUMN public.soul_profiles.birth_place IS
  'Display label only. Structured coords stay inside quiz_answers.';
COMMENT ON COLUMN public.soul_profiles.know_answers IS
  'Account · What I know. Keys are questionId from knowData.ts.';

CREATE TRIGGER soul_profiles_set_updated_at
  BEFORE UPDATE ON public.soul_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.soul_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY soul_profiles_select_own
  ON public.soul_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = auth_user_id);

CREATE POLICY soul_profiles_update_own
  ON public.soul_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = auth_user_id)
  WITH CHECK (auth.uid() = auth_user_id);

REVOKE ALL ON public.soul_profiles FROM PUBLIC, anon, authenticated;
GRANT SELECT, UPDATE ON public.soul_profiles TO authenticated;
GRANT ALL ON public.soul_profiles TO service_role;

-- Used by quiz-complete. Not callable by the browser.
CREATE OR REPLACE FUNCTION public.auth_user_id_by_email(p_email text)
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = auth, public
AS $$
  SELECT id
  FROM auth.users
  WHERE lower(email) = lower(trim(p_email))
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.auth_user_id_by_email(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.auth_user_id_by_email(text) TO service_role;

-- Maps the signed-in auth user to the product identity row.
-- Child-table RLS should use this, not auth.uid() directly.
CREATE OR REPLACE FUNCTION public.current_soul_profile_id()
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id
  FROM public.soul_profiles
  WHERE auth_user_id = auth.uid()
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.current_soul_profile_id() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.current_soul_profile_id() TO authenticated, service_role;

CREATE OR REPLACE FUNCTION public.owner_profile_matches(p_owner_profile_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SET search_path = public
AS $$
  SELECT p_owner_profile_id IS NOT NULL
     AND p_owner_profile_id = public.current_soul_profile_id();
$$;

REVOKE ALL ON FUNCTION public.owner_profile_matches(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.owner_profile_matches(uuid) TO authenticated, service_role;

-- OAuth-first and quiz createUser both land here.
-- If quiz already inserted a row for this email, attach auth_user_id.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  meta_name text;
  meta_source text;
BEGIN
  meta_name := NULLIF(trim(COALESCE(NEW.raw_user_meta_data->>'full_name', '')), '');
  meta_source := COALESCE(NULLIF(trim(NEW.raw_user_meta_data->>'source'), ''), 'oauth');
  IF meta_source NOT IN ('quiz', 'oauth', 'import') THEN
    meta_source := 'oauth';
  END IF;

  INSERT INTO public.soul_profiles (auth_user_id, email, full_name, avatar_url, source)
  VALUES (
    NEW.id,
    lower(NEW.email),
    meta_name,
    NULLIF(trim(COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')), ''),
    meta_source
  )
  ON CONFLICT (email) DO UPDATE
    SET
      auth_user_id = COALESCE(public.soul_profiles.auth_user_id, EXCLUDED.auth_user_id),
      full_name = COALESCE(public.soul_profiles.full_name, EXCLUDED.full_name),
      avatar_url = COALESCE(public.soul_profiles.avatar_url, EXCLUDED.avatar_url),
      updated_at = now();

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
