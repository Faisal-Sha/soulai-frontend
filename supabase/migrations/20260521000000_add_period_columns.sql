-- Add period tracking columns to subscriptions
ALTER TABLE public.subscriptions
  ADD COLUMN IF NOT EXISTS current_period_start TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS current_period_end TIMESTAMPTZ;
