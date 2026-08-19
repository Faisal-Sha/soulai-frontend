-- Bootstrap first admin user
-- Run this in Supabase SQL Editor

INSERT INTO public.admins (user_id, email, is_active, created_by)
VALUES (
  '6ddd617d-1ac9-45c6-919c-5715900dea7d',
  'mlit.mentor@gmail.com',
  true,
  NULL  -- First admin has no creator
)
ON CONFLICT (user_id) DO NOTHING;  -- Prevents error if already exists

-- Verify the admin was created
SELECT * FROM public.admins WHERE user_id = '6ddd617d-1ac9-45c6-919c-5715900dea7d';
