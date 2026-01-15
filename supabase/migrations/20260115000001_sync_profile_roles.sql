-- Sync profiles.role from auth metadata and update signup trigger

-- Backfill existing profiles.role from auth.users raw_user_meta_data.role
update profiles p
set role = coalesce(p.role, u.raw_user_meta_data->>'role')
from auth.users u
where u.id = p.id
  and p.role is null
  and (u.raw_user_meta_data->>'role') in ('super_admin', 'test_centre_admin', 'student');

-- Update trigger function to include role on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, role)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    new.raw_user_meta_data->>'role'
  );
  return new;
end;
$$ language plpgsql security definer;
