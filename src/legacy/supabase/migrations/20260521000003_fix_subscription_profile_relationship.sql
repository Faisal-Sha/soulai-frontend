-- Fix missing relationship between subscriptions and profiles
-- This allows PostgREST to perform the join query for the Admin Dashboard

-- 1. Drop the existing foreign key to auth.users (if it exists with the standard name)
-- We find the constraint name first, but usually it's subscriptions_user_id_fkey
ALTER TABLE public.subscriptions 
  DROP CONSTRAINT IF EXISTS subscriptions_user_id_fkey;

-- 2. Add the foreign key pointing to public.profiles instead
-- Since profiles.id is a PK and references auth.users(id), this is equivalent but enables joins
ALTER TABLE public.subscriptions
  ADD CONSTRAINT subscriptions_user_id_fkey 
  FOREIGN KEY (user_id) 
  REFERENCES public.profiles(id) 
  ON DELETE CASCADE;

-- 3. Notify PostgREST to reload schema cache (not strictly necessary via migration, but good practice)
NOTIFY pgrst, 'reload schema';
