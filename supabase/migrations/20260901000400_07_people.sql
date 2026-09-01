-- =============================================================================
-- V2 / 07 people + people_reports
-- Account · People add / list / report. AI fill of content is a later function.
-- Depends on: 02 soul_profiles (owner_profile_matches)
-- =============================================================================

CREATE TABLE public.people (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_profile_id    uuid NOT NULL
                        REFERENCES public.soul_profiles(id) ON DELETE CASCADE,

  full_name           text NOT NULL,
  birth_date          date NOT NULL,
  birth_time          time,
  birth_place         text,

  status              text NOT NULL DEFAULT 'generating',

  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT people_status_chk
    CHECK (status IN ('generating', 'ready')),
  CONSTRAINT people_full_name_chk
    CHECK (char_length(trim(full_name)) > 0)
);

CREATE INDEX people_owner_created_idx
  ON public.people (owner_profile_id, created_at DESC);

COMMENT ON TABLE public.people IS
  'Someone the owner asked to read against their profile. owner_profile_id ON DELETE CASCADE.';
COMMENT ON COLUMN public.people.status IS
  'generating = report not ready yet; ready = people_reports.content is filled.';

CREATE TRIGGER people_set_updated_at
  BEFORE UPDATE ON public.people
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.people ENABLE ROW LEVEL SECURITY;

CREATE POLICY people_select_own
  ON public.people FOR SELECT TO authenticated
  USING (public.owner_profile_matches(owner_profile_id));

CREATE POLICY people_insert_own
  ON public.people FOR INSERT TO authenticated
  WITH CHECK (public.owner_profile_matches(owner_profile_id));

CREATE POLICY people_update_own
  ON public.people FOR UPDATE TO authenticated
  USING (public.owner_profile_matches(owner_profile_id))
  WITH CHECK (public.owner_profile_matches(owner_profile_id));

CREATE POLICY people_delete_own
  ON public.people FOR DELETE TO authenticated
  USING (public.owner_profile_matches(owner_profile_id));

REVOKE ALL ON public.people FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.people TO authenticated;
GRANT ALL ON public.people TO service_role;

CREATE TABLE public.people_reports (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  person_id           uuid NOT NULL UNIQUE
                        REFERENCES public.people(id) ON DELETE CASCADE,
  owner_profile_id    uuid NOT NULL
                        REFERENCES public.soul_profiles(id) ON DELETE CASCADE,

  status              text NOT NULL DEFAULT 'generating',
  content             jsonb,
  share_token         uuid NOT NULL UNIQUE DEFAULT gen_random_uuid(),

  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT people_reports_status_chk
    CHECK (status IN ('generating', 'ready'))
);

CREATE INDEX people_reports_owner_idx
  ON public.people_reports (owner_profile_id);

COMMENT ON TABLE public.people_reports IS
  'One report per person. Nested CASCADE from people. Public share-by-token is later.';
COMMENT ON COLUMN public.people_reports.content IS
  'Figma 5-section report JSON. Filled when status = ready. AI writer comes later.';

CREATE TRIGGER people_reports_set_updated_at
  BEFORE UPDATE ON public.people_reports
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.people_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY people_reports_select_own
  ON public.people_reports FOR SELECT TO authenticated
  USING (public.owner_profile_matches(owner_profile_id));

CREATE POLICY people_reports_insert_own
  ON public.people_reports FOR INSERT TO authenticated
  WITH CHECK (public.owner_profile_matches(owner_profile_id));

CREATE POLICY people_reports_update_own
  ON public.people_reports FOR UPDATE TO authenticated
  USING (public.owner_profile_matches(owner_profile_id))
  WITH CHECK (public.owner_profile_matches(owner_profile_id));

CREATE POLICY people_reports_delete_own
  ON public.people_reports FOR DELETE TO authenticated
  USING (public.owner_profile_matches(owner_profile_id));

REVOKE ALL ON public.people_reports FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.people_reports TO authenticated;
GRANT ALL ON public.people_reports TO service_role;
