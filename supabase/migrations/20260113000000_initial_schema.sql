-- Create a table for public profiles
create table profiles (
  id uuid references auth.users not null primary key,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone,
  
  constraint username_length check (char_length(full_name) >= 3)
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Create a table for Organizations (Test Centers)
create table organizations (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  branding jsonb default '{}'::jsonb, -- Stores { colors: {...}, logo_url: ... }
  subscription_plan text default 'free',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table organizations enable row level security;

-- Create a table for Organization Members
create table organization_members (
  organization_id uuid references organizations(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  role text default 'member' check (role in ('owner', 'admin', 'member')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  primary key (organization_id, user_id)
);

alter table organization_members enable row level security;

-- Policies for Organizations
-- Members can view their organizations
create policy "Members can view their own organizations." on organizations
  for select using (
    exists (
      select 1 from organization_members
      where organization_id = organizations.id
      and user_id = auth.uid()
    )
  );

-- Owners can update their organizations
create policy "Owners can update their organizations." on organizations
  for update using (
    exists (
      select 1 from organization_members
      where organization_id = organizations.id
      and user_id = auth.uid()
      and role = 'owner'
    )
  );

-- Policies for Organization Members
create policy "Members can view other members of their org." on organization_members
  for select using (
    exists (
      select 1 from organization_members as om
      where om.organization_id = organization_members.organization_id
      and om.user_id = auth.uid()
    )
  );

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
