-- Create Organization Invites table
create table organization_invites (
  id uuid default gen_random_uuid() primary key,
  organization_id uuid references organizations(id) on delete cascade not null,
  role text default 'student' check (role in ('admin', 'student')),
  
  -- The token students will use in the URL
  token text unique default encode(gen_random_bytes(16), 'hex') not null,
  
  -- Optional limit on how many can use it
  max_uses int default 100,
  uses_count int default 0,
  
  expires_at timestamp with time zone default (now() + interval '7 days'),
  created_by uuid references auth.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table organization_invites enable row level security;

-- Policies
create policy "Owners can manage invites" on organization_invites
  for all using (
    exists (
      select 1 from organization_members
      where organization_id = organization_invites.organization_id
      and user_id = auth.uid()
      and role = 'owner'
    )
  );

create policy "Anyone can view valid invite" on organization_invites
  for select using (
    expires_at > now()
    and uses_count < max_uses
  );
