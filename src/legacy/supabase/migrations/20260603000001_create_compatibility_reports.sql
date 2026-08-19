-- Compatibility Deep-Dive reports (Upsell B + premium access)
CREATE TABLE IF NOT EXISTS public.compatibility_reports (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title           text        NOT NULL,
  person_a_name   text,
  person_b_name   text,
  person_a_dob    date,
  person_b_dob    date,
  matrix_data     jsonb       NOT NULL,
  content         jsonb,
  status          text        NOT NULL DEFAULT 'processing',
  pdf_url         text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_compatibility_reports_user
  ON public.compatibility_reports (user_id);

CREATE INDEX IF NOT EXISTS idx_compatibility_reports_status
  ON public.compatibility_reports (status);

ALTER TABLE public.compatibility_reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "compatibility_reports_user_select" ON public.compatibility_reports;
CREATE POLICY "compatibility_reports_user_select"
  ON public.compatibility_reports
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "compatibility_reports_user_insert" ON public.compatibility_reports;
CREATE POLICY "compatibility_reports_user_insert"
  ON public.compatibility_reports
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "compatibility_reports_service_all" ON public.compatibility_reports;
CREATE POLICY "compatibility_reports_service_all"
  ON public.compatibility_reports
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.update_compatibility_reports_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_compatibility_reports_updated_at ON public.compatibility_reports;
CREATE TRIGGER update_compatibility_reports_updated_at
  BEFORE UPDATE ON public.compatibility_reports
  FOR EACH ROW
  EXECUTE FUNCTION public.update_compatibility_reports_updated_at();

COMMENT ON TABLE public.compatibility_reports IS
  'AI-generated compatibility deep-dive reports; interactive view + optional PDF.';
