-- Update get_admin_stats to include subscription counts (bypasses RLS via SECURITY DEFINER)
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
  recent_signups json;
  start_of_week timestamp;
  start_of_month timestamp;
  sub_basic integer;
  sub_slim integer;
  sub_full integer;
  sub_total integer;
BEGIN
  start_of_week  := (CURRENT_DATE - INTERVAL '6 days');
  start_of_month := (CURRENT_DATE - INTERVAL '29 days');

  SELECT count(*) INTO total_users FROM auth.users;

  SELECT count(*) INTO daily_new_users
  FROM auth.users WHERE created_at >= CURRENT_DATE;

  SELECT count(*) INTO weekly_new_users
  FROM auth.users WHERE created_at >= start_of_week;

  SELECT count(*) INTO monthly_new_users
  FROM auth.users WHERE created_at >= start_of_month;

  SELECT json_agg(t) INTO recent_signups
  FROM (
    SELECT id, email, created_at
    FROM auth.users
    ORDER BY created_at DESC
    LIMIT 5
  ) t;

  SELECT count(*) INTO sub_basic
  FROM public.subscriptions WHERE status = 'active' AND plan_type = 'basic';

  SELECT count(*) INTO sub_slim
  FROM public.subscriptions WHERE status = 'active' AND plan_type = 'slim';

  SELECT count(*) INTO sub_full
  FROM public.subscriptions WHERE status = 'active' AND plan_type IN ('full', 'premium');

  SELECT count(*) INTO sub_total
  FROM public.subscriptions WHERE status = 'active';

  RETURN json_build_object(
    'totalUsers',      total_users,
    'dailyNewUsers',   daily_new_users,
    'weeklyNewUsers',  weekly_new_users,
    'monthlyNewUsers', monthly_new_users,
    'recentSignups',   COALESCE(recent_signups, '[]'::json),
    'subscriptions',   json_build_object(
      'basic', sub_basic,
      'slim',  sub_slim,
      'full',  sub_full,
      'total', sub_total
    )
  );
END;
$$;
