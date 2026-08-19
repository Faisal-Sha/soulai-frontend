-- Add pdf_email_sent flag to readings table.
-- This prevents duplicate delivery emails when generate-pdf is called multiple times
-- (e.g. from ReadingPage, from generate-reading, or from the stripe-webhook).
-- The email is only sent once: when the user has an active subscription AND the flag is false.

ALTER TABLE readings
  ADD COLUMN IF NOT EXISTS pdf_email_sent boolean NOT NULL DEFAULT false;

-- Index for the stripe-webhook query that checks reading status on subscription
CREATE INDEX IF NOT EXISTS idx_readings_user_pdf_email
  ON readings (user_id, pdf_url, pdf_email_sent);
