-- Create or Replace the Admin Stats Function to ensure data consistency
-- This aligns the "Weekly New Users" count with the "Daily Growth" chart data
-- Both will now use the logic: "Active since the start of the 6th day ago" (effectively 7 days including today)
-- Also restores "Recent Signups" data

CREATE OR REPLACE FUNCTION get_admin_stats()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  total_users integer;
  daily_new_users integer;
  weekly_new_users integer;
  monthly_new_users integer;
  daily_growth json;
  recent_signups json;
  start_of_week timestamp;
  start_of_month timestamp;
BEGIN
  -- Define consistent time windows
  -- For weekly: Start of the day, 6 days ago (so range is [Today-6, Today-5, ... Today]) = 7 days
  start_of_week := (CURRENT_DATE - INTERVAL '6 days');
  -- For monthly: Start of the day, 29 days ago (30 days total)
  start_of_month := (CURRENT_DATE - INTERVAL '29 days');

  -- 1. Total users
  SELECT count(*) INTO total_users FROM auth.users;

  -- 2. Daily new users (Created today since 00:00)
  SELECT count(*) INTO daily_new_users 
  FROM auth.users 
  WHERE created_at >= CURRENT_DATE;

  -- 3. Weekly new users (Consistent with Chart)
  SELECT count(*) INTO weekly_new_users 
  FROM auth.users 
  WHERE created_at >= start_of_week;

  -- 4. Monthly new users
  SELECT count(*) INTO monthly_new_users 
  FROM auth.users 
  WHERE created_at >= start_of_month;

  -- 5. Daily growth chart data (Left join to ensure all 7 days are present, even if count is 0)
  SELECT json_agg(t) INTO daily_growth
  FROM (
    SELECT 
      day::date as date,
      count(u.id) as count
    FROM generate_series(
      start_of_week,
      CURRENT_DATE::timestamp,
      INTERVAL '1 day'
    ) as day
    LEFT JOIN auth.users u 
      ON date(u.created_at) = day::date
    GROUP BY day
    ORDER BY day
  ) t;

  -- 6. Recent Signups (Last 5 users)
  SELECT json_agg(t) INTO recent_signups
  FROM (
    SELECT id, email, created_at
    FROM auth.users
    ORDER BY created_at DESC
    LIMIT 5
  ) t;

  RETURN json_build_object(
    'totalUsers', total_users,
    'dailyNewUsers', daily_new_users,
    'weeklyNewUsers', weekly_new_users,
    'monthlyNewUsers', monthly_new_users,
    'dailyGrowth', daily_growth,
    'recentSignups', COALESCE(recent_signups, '[]'::json)
  );
END;
$$;
