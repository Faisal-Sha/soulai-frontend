-- Link quiz leads to user accounts created after payment
-- The stripe-webhook sets this when a guest user is created on checkout.session.completed

ALTER TABLE public.quiz_leads
  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_quiz_leads_user_id
  ON public.quiz_leads (user_id)
  WHERE user_id IS NOT NULL;

COMMENT ON COLUMN public.quiz_leads.user_id IS
  'Set by stripe-webhook after payment — links the quiz lead to the created user account.';
