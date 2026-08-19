-- Create admins table for managing admin users
CREATE TABLE IF NOT EXISTS public.admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email text NOT NULL,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES public.admins(user_id),
  is_active boolean DEFAULT true,
  CONSTRAINT unique_admin_user UNIQUE (user_id)
);

-- Add RLS policies for admins table
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Only admins can read the admins table
CREATE POLICY "Admins can read admins table" 
  ON public.admins
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.admins
      WHERE user_id = auth.uid() AND is_active = true
    )
  );

-- Only admins can insert new admins
CREATE POLICY "Admins can insert new admins" 
  ON public.admins
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admins
      WHERE user_id = auth.uid() AND is_active = true
    )
  );

-- Only admins can update admins
CREATE POLICY "Admins can update admins" 
  ON public.admins
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.admins
      WHERE user_id = auth.uid() AND is_active = true
    )
  );

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_admins_user_id ON public.admins(user_id);
CREATE INDEX IF NOT EXISTS idx_admins_is_active ON public.admins(is_active);

-- Add comment
COMMENT ON TABLE public.admins IS 'Stores admin user information for role-based access control';
