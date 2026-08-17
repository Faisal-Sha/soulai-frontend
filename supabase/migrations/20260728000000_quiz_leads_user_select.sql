-- Allow authenticated users to read their own quiz leads (needed for DOB on /reading UI)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'quiz_leads'
      AND policyname = 'quiz_leads_user_select'
  ) THEN
    CREATE POLICY quiz_leads_user_select
      ON public.quiz_leads
      FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;
END
$$;
