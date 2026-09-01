-- =============================================================================
-- V2 / 09 saved_insights
-- Save from reading selection or home daily note. Bookmark on /insights deletes the row.
-- Depends on: 02 soul_profiles
-- =============================================================================

CREATE TABLE public.saved_insights (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_profile_id    uuid NOT NULL
                        REFERENCES public.soul_profiles(id) ON DELETE CASCADE,
  quote               text NOT NULL,
  source              text NOT NULL,
  source_kind         text NOT NULL,
  created_at          timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT saved_insights_quote_chk
    CHECK (char_length(trim(quote)) > 0),
  CONSTRAINT saved_insights_source_kind_chk
    CHECK (source_kind IN ('reading', 'daily_note', 'chat')),
  CONSTRAINT saved_insights_owner_quote_uk UNIQUE (owner_profile_id, quote)
);

CREATE INDEX saved_insights_owner_created_idx
  ON public.saved_insights (owner_profile_id, created_at DESC);

COMMENT ON TABLE public.saved_insights IS
  'User-kept lines. Insert from reading / daily note / chat. DELETE from the insights bookmark.';

ALTER TABLE public.saved_insights ENABLE ROW LEVEL SECURITY;

CREATE POLICY saved_insights_select_own
  ON public.saved_insights FOR SELECT TO authenticated
  USING (public.owner_profile_matches(owner_profile_id));

CREATE POLICY saved_insights_insert_own
  ON public.saved_insights FOR INSERT TO authenticated
  WITH CHECK (public.owner_profile_matches(owner_profile_id));

CREATE POLICY saved_insights_delete_own
  ON public.saved_insights FOR DELETE TO authenticated
  USING (public.owner_profile_matches(owner_profile_id));

REVOKE ALL ON public.saved_insights FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, DELETE ON public.saved_insights TO authenticated;
GRANT ALL ON public.saved_insights TO service_role;
