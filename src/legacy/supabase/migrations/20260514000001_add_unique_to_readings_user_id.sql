-- Add unique constraint to user_id in readings table
-- This is required for the upsert logic in generate-reading to work correctly.
ALTER TABLE public.readings ADD CONSTRAINT readings_user_id_key UNIQUE (user_id);
