-- One-time role fix for existing users (run in Supabase SQL Editor)
-- 1) Promote org owners/admins to test_centre_admin
update profiles p
set role = 'test_centre_admin'
from organization_members om
where om.user_id = p.id
  and om.role in ('owner', 'admin');

-- 2) Ensure super admins are set explicitly (replace with your user ids)
-- update profiles set role = 'super_admin' where id in ('<uuid>');
