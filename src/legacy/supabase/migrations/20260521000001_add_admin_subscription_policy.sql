-- Allow admins to view all subscriptions in the Admin Dashboard
CREATE POLICY "Admins can view all subscriptions"
  ON public.subscriptions
  FOR SELECT
  USING (public.is_admin());
