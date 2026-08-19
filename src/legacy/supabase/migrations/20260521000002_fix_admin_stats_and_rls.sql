-- 1. Update get_admin_stats to include all plan types and fix counts
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

  -- Categorize all possible plan types
  -- Basic/Trial
  SELECT count(*) INTO sub_basic
  FROM public.subscriptions 
  WHERE status = 'active' 
  AND plan_type IN ('basic', 'popular', 'trial', 'trial_1week', 'discovery');

  -- Slim/Medium
  SELECT count(*) INTO sub_slim
  FROM public.subscriptions 
  WHERE status = 'active' 
  AND plan_type IN ('slim', 'growth', 'plan_4week');

  -- Full/Premium
  SELECT count(*) INTO sub_full
  FROM public.subscriptions 
  WHERE status = 'active' 
  AND plan_type IN ('full', 'premium', 'premium_12week', 'bestValue', '99.9');

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

-- 2. Ensure robust RLS policies for admins
-- Drop existing to avoid conflicts
DROP POLICY IF EXISTS "Admins can view all subscriptions" ON public.subscriptions;
DROP POLICY IF EXISTS "Admins can view all profiles_admin_dashboard" ON public.profiles;

-- Use a more direct check in the policy to avoid function overhead/issues
CREATE POLICY "Admins can view all subscriptions"
  ON public.subscriptions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admins
      WHERE user_id = auth.uid() AND is_active = true
    )
  );

CREATE POLICY "Admins can view all profiles"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admins
      WHERE user_id = auth.uid() AND is_active = true
    )
  );

-- 3. Debug Function (Optional but helpful)
-- Call this via supabase.rpc('debug_admin_access') to see what the DB thinks
CREATE OR REPLACE FUNCTION debug_admin_access()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN json_build_object(
    'auth_uid', auth.uid(),
    'is_admin_check', (
      SELECT EXISTS (
        SELECT 1 FROM public.admins
        WHERE user_id = auth.uid() AND is_active = true
      )
    ),
    'admin_record', (
      SELECT row_to_json(a) FROM public.admins a WHERE user_id = auth.uid() LIMIT 1
    )
  );
END;
$$;
