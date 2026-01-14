-- Enable RLS for inserts on organizations and members
-- This allows any authenticated user to create an organization (become a tenant)

create policy "Authenticated users can create organizations"
  on organizations
  for insert
  with check (auth.role() = 'authenticated');

create policy "Users can join organizations as members"
  on organization_members
  for insert
  with check (
    auth.uid() = user_id -- Can only add themselves
    -- OR --
    exists ( -- Or owners can add others (logic for invites later)
      select 1 from organization_members
      where organization_id = organization_members.organization_id
      and user_id = auth.uid()
      and role = 'owner'
    )
  );
