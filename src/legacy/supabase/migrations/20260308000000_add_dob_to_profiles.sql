-- Add DOB field to profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS dob TEXT;

-- Optionally backfill or set default constraints can be added here if needed

