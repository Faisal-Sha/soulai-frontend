-- Quiz leads table for Soul+AI quiz funnel
-- Stores one row per unique email with all 15 answers + UTM attribution

CREATE TABLE IF NOT EXISTS public.quiz_leads (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  email       text        UNIQUE NOT NULL,
  answers     jsonb       NOT NULL,
  started_at  timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  utm_source  text,
  utm_medium  text,
  utm_campaign text
);

-- Indexes for lookup and attribution reporting
CREATE INDEX IF NOT EXISTS idx_quiz_leads_email
  ON public.quiz_leads (email);

CREATE INDEX IF NOT EXISTS idx_quiz_leads_utm
  ON public.quiz_leads (utm_source, utm_campaign);

CREATE INDEX IF NOT EXISTS idx_quiz_leads_completed_at
  ON public.quiz_leads (completed_at DESC);

-- RLS: enable row-level security
ALTER TABLE public.quiz_leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public quiz funnel — no auth required)
CREATE POLICY "quiz_leads_anon_insert"
  ON public.quiz_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anonymous upsert (ON CONFLICT update path)
CREATE POLICY "quiz_leads_anon_update"
  ON public.quiz_leads
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Admins (authenticated service role) can read all rows
CREATE POLICY "quiz_leads_service_select"
  ON public.quiz_leads
  FOR SELECT
  TO authenticated
  USING (true);

COMMENT ON TABLE public.quiz_leads IS
  'Lead capture from the Soul+AI quiz funnel. One row per unique email.';
COMMENT ON COLUMN public.quiz_leads.answers IS
  'Full 15-question answer object. Field names match the quiz data schema (gender, age, birthdate, ...).';
COMMENT ON COLUMN public.quiz_leads.started_at IS
  'Set on first insert (row creation).';
COMMENT ON COLUMN public.quiz_leads.completed_at IS
  'Set when the user submits Q15 (email). NULL means abandoned.';
