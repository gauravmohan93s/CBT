alter table profiles
  add column if not exists role text
  default 'student'
  check (role in ('super_admin', 'test_centre_admin', 'student'));

comment on column profiles.role is 'Application role used for routing and permissions.';
