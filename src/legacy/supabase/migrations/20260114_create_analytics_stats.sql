-- Create analytics_daily_stats table to store aggregated Mixpanel data
create table if not exists public.analytics_daily_stats (
  date date primary key,
  new_users integer default 0,
  active_users integer default 0,
  total_users integer default 0,
  page_views jsonb default '{}'::jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Add comment
comment on table public.analytics_daily_stats is 'Aggregated daily analytics synced from Mixpanel';

-- Enable RLS
alter table public.analytics_daily_stats enable row level security;

-- Policies
-- Admin can view all
create policy "Admins can view analytics stats"
  on public.analytics_daily_stats
  for select
  using (
    public.is_admin()
  );

-- Backend function can insert/update (service role bypasses RLS, but good to have if needed)
-- No public write access
