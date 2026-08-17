-- Fix RLS policy for admins table to allow self-check
-- Run this in Supabase SQL Editor to fix the admin authentication issue

-- Drop the existing problematic policy
DROP POLICY IF EXISTS "Admins can read admins table" ON public.admins;

-- Create new policy that allows users to check their own admin status
CREATE POLICY "Users can check their own admin status"
  ON public.admins
  FOR SELECT
  USING (user_id = auth.uid());

-- This allows any authenticated user to check if THEY are an admin,
-- but they cannot see other admins in the table

-- Verify the policy was created
SELECT * FROM pg_policies WHERE tablename = 'admins';
