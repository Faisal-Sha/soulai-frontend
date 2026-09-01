-- =============================================================================
-- V2 / 08 readings + reading_chapters + daily_notes
-- Static pack now; AI fill of content is later. Progress (opened / completed / %) is live.
-- Depends on: 02 soul_profiles (owner_profile_matches)
-- =============================================================================

CREATE TABLE public.readings (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_profile_id    uuid NOT NULL UNIQUE
                        REFERENCES public.soul_profiles(id) ON DELETE CASCADE,
  status              text NOT NULL DEFAULT 'ready',
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT readings_status_chk
    CHECK (status IN ('generating', 'ready'))
);

COMMENT ON TABLE public.readings IS
  'One reading pack per profile. owner_profile_id ON DELETE CASCADE. Content is static until generate-reading exists.';

CREATE TRIGGER readings_set_updated_at
  BEFORE UPDATE ON public.readings
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.readings ENABLE ROW LEVEL SECURITY;

CREATE POLICY readings_select_own
  ON public.readings FOR SELECT TO authenticated
  USING (public.owner_profile_matches(owner_profile_id));

CREATE POLICY readings_insert_own
  ON public.readings FOR INSERT TO authenticated
  WITH CHECK (public.owner_profile_matches(owner_profile_id));

CREATE POLICY readings_update_own
  ON public.readings FOR UPDATE TO authenticated
  USING (public.owner_profile_matches(owner_profile_id))
  WITH CHECK (public.owner_profile_matches(owner_profile_id));

REVOKE ALL ON public.readings FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.readings TO authenticated;
GRANT ALL ON public.readings TO service_role;

CREATE TABLE public.reading_chapters (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reading_id          uuid NOT NULL
                        REFERENCES public.readings(id) ON DELETE CASCADE,
  owner_profile_id    uuid NOT NULL
                        REFERENCES public.soul_profiles(id) ON DELETE CASCADE,

  chapter_id          text NOT NULL,
  sort_order          integer NOT NULL,
  content             jsonb NOT NULL,
  word_count          integer NOT NULL DEFAULT 0,
  read_time_min       integer NOT NULL DEFAULT 6,

  opened_at           timestamptz,
  completed_at        timestamptz,
  scroll_pct          integer NOT NULL DEFAULT 0,
  last_section_n      integer NOT NULL DEFAULT 0,

  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT reading_chapters_chapter_id_chk
    CHECK (chapter_id IN (
      'core-self',
      'your-pattern',
      'purpose',
      'relationships',
      'money',
      'health',
      'how-you-speak',
      'family',
      'year-ahead'
    )),
  CONSTRAINT reading_chapters_scroll_pct_chk
    CHECK (scroll_pct >= 0 AND scroll_pct <= 100),
  CONSTRAINT reading_chapters_reading_chapter_uk UNIQUE (reading_id, chapter_id)
);

CREATE INDEX reading_chapters_owner_idx
  ON public.reading_chapters (owner_profile_id, sort_order);

COMMENT ON TABLE public.reading_chapters IS
  'Nine Figma chapters. content JSON is the static pack; opened_at / completed_at / scroll_pct track progress.';
COMMENT ON COLUMN public.reading_chapters.content IS
  'title, blurb, sections[{n,title,paragraphs}]. Replace with AI later; ids stay.';

CREATE TRIGGER reading_chapters_set_updated_at
  BEFORE UPDATE ON public.reading_chapters
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.reading_chapters ENABLE ROW LEVEL SECURITY;

CREATE POLICY reading_chapters_select_own
  ON public.reading_chapters FOR SELECT TO authenticated
  USING (public.owner_profile_matches(owner_profile_id));

CREATE POLICY reading_chapters_insert_own
  ON public.reading_chapters FOR INSERT TO authenticated
  WITH CHECK (public.owner_profile_matches(owner_profile_id));

CREATE POLICY reading_chapters_update_own
  ON public.reading_chapters FOR UPDATE TO authenticated
  USING (public.owner_profile_matches(owner_profile_id))
  WITH CHECK (public.owner_profile_matches(owner_profile_id));

REVOKE ALL ON public.reading_chapters FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.reading_chapters TO authenticated;
GRANT ALL ON public.reading_chapters TO service_role;

CREATE TABLE public.daily_notes (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_profile_id    uuid NOT NULL
                        REFERENCES public.soul_profiles(id) ON DELETE CASCADE,
  note_date           date NOT NULL,
  headline            text NOT NULL,
  sub                 text,
  created_at          timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT daily_notes_owner_date_uk UNIQUE (owner_profile_id, note_date)
);

CREATE INDEX daily_notes_owner_date_idx
  ON public.daily_notes (owner_profile_id, note_date DESC);

COMMENT ON TABLE public.daily_notes IS
  'Home today line. Static headline until generate-reading exists.';

ALTER TABLE public.daily_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY daily_notes_select_own
  ON public.daily_notes FOR SELECT TO authenticated
  USING (public.owner_profile_matches(owner_profile_id));

CREATE POLICY daily_notes_insert_own
  ON public.daily_notes FOR INSERT TO authenticated
  WITH CHECK (public.owner_profile_matches(owner_profile_id));

CREATE POLICY daily_notes_update_own
  ON public.daily_notes FOR UPDATE TO authenticated
  USING (public.owner_profile_matches(owner_profile_id))
  WITH CHECK (public.owner_profile_matches(owner_profile_id));

REVOKE ALL ON public.daily_notes FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.daily_notes TO authenticated;
GRANT ALL ON public.daily_notes TO service_role;
