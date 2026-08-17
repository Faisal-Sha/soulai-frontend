-- Migration to create analytics tables and set up RLS policies
-- Created on 2026-03-02

-- 1. Create Tables
CREATE TABLE IF NOT EXISTS public.analytics_daily_stats (
  date date not null,
  new_users integer null default 0,
  active_users integer null default 0,
  total_users integer null default 0,
  page_views jsonb null default '{}'::jsonb,
  updated_at timestamp with time zone null default timezone ('utc'::text, now()),
  constraint analytics_daily_stats_pkey primary key (date)
);

CREATE TABLE IF NOT EXISTS public.page_visits (
  id uuid not null default gen_random_uuid (),
  user_id uuid null,
  page_path text not null,
  created_at timestamp with time zone not null default timezone ('utc'::text, now()),
  constraint page_visits_pkey primary key (id),
  constraint page_visits_user_id_fkey foreign KEY (user_id) references auth.users (id)
);

-- 2. Admin Check Function
-- This function checks if the current user is an active admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.admins
        WHERE user_id = auth.uid() AND is_active = true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Enable RLS
ALTER TABLE public.page_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_daily_stats ENABLE ROW LEVEL SECURITY;

-- 4. Page Visits Policies
-- Allow anyone to insert (track) page visits
DROP POLICY IF EXISTS "Public can insert page visits" ON public.page_visits;
CREATE POLICY "Public can insert page visits"
  ON public.page_visits
  FOR INSERT
  WITH CHECK (true);

-- Only admins can view individual page visits
DROP POLICY IF EXISTS "Admins can view page visits" ON public.page_visits;
CREATE POLICY "Admins can view page visits"
  ON public.page_visits
  FOR SELECT
  USING (public.is_admin());

-- 5. Analytics Daily Stats Policies
-- Only admins can view aggregated daily stats
DROP POLICY IF EXISTS "Admins can view daily stats" ON public.analytics_daily_stats;
CREATE POLICY "Admins can view daily stats"
  ON public.analytics_daily_stats
  FOR SELECT
  USING (public.is_admin());
