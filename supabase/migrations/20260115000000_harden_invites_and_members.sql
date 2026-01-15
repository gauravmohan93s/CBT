-- Harden org creation, membership, and invite access for production

-- Track org creator for controlled owner bootstrap
alter table organizations
  add column if not exists created_by uuid references auth.users(id);

update organizations o
set created_by = om.user_id
from organization_members om
where o.created_by is null
  and om.organization_id = o.id
  and om.role = 'owner';

alter table organizations
  alter column created_by set default auth.uid();

-- Tighten org creation policy
drop policy if exists "Authenticated users can create organizations" on organizations;
create policy "Authenticated users can create organizations" on organizations
  for insert
  with check (auth.role() = 'authenticated' and created_by = auth.uid());

-- Tighten membership policy to owners/admins + creator bootstrap
drop policy if exists "Users can join organizations as members" on organization_members;
create policy "Owners and admins can add org members" on organization_members
  for insert
  with check (
    exists (
      select 1 from organization_members om
      where om.organization_id = organization_members.organization_id
        and om.user_id = auth.uid()
        and om.role in ('owner', 'admin')
    )
  );

create policy "Creators can self-add as owner" on organization_members
  for insert
  with check (
    user_id = auth.uid()
    and role = 'owner'
    and exists (
      select 1 from organizations
      where id = organization_members.organization_id
        and created_by = auth.uid()
    )
  );

-- Restrict invite visibility to RPC only
drop policy if exists "Anyone can view valid invite" on organization_invites;

create or replace function public.get_invite_by_token(invite_token text)
returns table (
  organization_id uuid,
  organization_name text,
  role text,
  expires_at timestamp with time zone,
  uses_count int,
  max_uses int
)
language plpgsql
security definer
set search_path = public
as $$
begin
  return query
  select oi.organization_id,
         o.name,
         oi.role,
         oi.expires_at,
         oi.uses_count,
         oi.max_uses
  from organization_invites oi
  join organizations o on o.id = oi.organization_id
  where oi.token = invite_token
    and oi.expires_at > now()
    and oi.uses_count < oi.max_uses;
end;
$$;

create or replace function public.join_organization_with_invite(invite_token text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  invite_row organization_invites%rowtype;
  member_role text;
  inserted_count int;
begin
  select *
  into invite_row
  from organization_invites
  where token = invite_token
    and expires_at > now()
    and uses_count < max_uses;

  if not found then
    raise exception 'Invalid or expired invite';
  end if;

  member_role := case invite_row.role
    when 'admin' then 'admin'
    else 'member'
  end;

  insert into organization_members (organization_id, user_id, role)
  values (invite_row.organization_id, auth.uid(), member_role)
  on conflict do nothing;

  get diagnostics inserted_count = row_count;

  if inserted_count > 0 then
    update organization_invites
    set uses_count = uses_count + 1
    where id = invite_row.id;
  end if;
end;
$$;

grant execute on function public.get_invite_by_token(text) to anon, authenticated;
grant execute on function public.join_organization_with_invite(text) to authenticated;
