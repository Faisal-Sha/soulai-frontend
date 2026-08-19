-- Allow Admins to see all profiles (Fixes Admin Dashboard "Total Users" count)
create policy "Admins can view all profiles_admin_dashboard"
  on public.profiles
  for select
  using (
    public.is_admin()
  );
