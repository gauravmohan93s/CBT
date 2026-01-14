-- Create Exams table (Tests created by Admin)
create table exams (
  id uuid default gen_random_uuid() primary key,
  organization_id uuid references organizations(id) on delete cascade not null,
  title text not null,
  description text,
  status text default 'draft' check (status in ('draft', 'published', 'archived')),
  
  -- The core CBT data (questions, settings, pdf_url usually)
  -- Storing the massive JSON here is fine for now, or link to Storage
  configuration jsonb default '{}'::jsonb, 
  
  created_by uuid references auth.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table exams enable row level security;

-- Create Results table (Student attempts)
create table results (
  id uuid default gen_random_uuid() primary key,
  exam_id uuid references exams(id) on delete cascade not null,
  student_id uuid references auth.users(id) on delete cascade not null,
  
  -- Score summary
  total_score numeric,
  max_score numeric,
  percentage numeric,
  
  -- Detailed answers log (synced from Dexie)
  data jsonb default '{}'::jsonb,
  
  status text default 'completed' check (status in ('ongoing', 'completed', 'abandoned')),
  started_at timestamp with time zone,
  submitted_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table results enable row level security;

-- Policies for Exams
-- Center Admins can CRUD their own exams
create policy "Admins can view own org exams" on exams
  for select using (
    exists (
      select 1 from organization_members
      where organization_id = exams.organization_id
      and user_id = auth.uid()
    )
  );

create policy "Admins can insert exams" on exams
  for insert with check (
    exists (
      select 1 from organization_members
      where organization_id = exams.organization_id
      and user_id = auth.uid()
      and role in ('owner', 'admin')
    )
  );

create policy "Admins can update own exams" on exams
  for update using (
    exists (
      select 1 from organization_members
      where organization_id = exams.organization_id
      and user_id = auth.uid()
      and role in ('owner', 'admin')
    )
  );

create policy "Admins can delete own exams" on exams
  for delete using (
    exists (
      select 1 from organization_members
      where organization_id = exams.organization_id
      and user_id = auth.uid()
      and role in ('owner', 'admin')
    )
  );

-- Students can view PUBLISHED exams assigned to their batch (simplified: view all published for now)
-- In real app, we need 'batches' table. For MVP, assume public to org members.
-- Note: Students need to be 'members' of the org to see exams? 
-- Or we use a public link? For now, assume enrolled students.

create policy "Students can view assigned exams" on exams
  for select using (
    status = 'published' 
    and exists (
      select 1 from organization_members
      where organization_id = exams.organization_id
      and user_id = auth.uid()
    )
  );


-- Policies for Results
-- Students can insert (submit) their own results
create policy "Students can insert own results" on results
  for insert with check (
    auth.uid() = student_id
    and exists (
       -- Ensure they belong to the org of the exam
       select 1 from exams e
       join organization_members om on om.organization_id = e.organization_id
       where e.id = exam_id
       and om.user_id = auth.uid()
    )
  );

-- Students can view their own results
create policy "Students can view own results" on results
  for select using (auth.uid() = student_id);

-- Admins can view results for their exams
create policy "Admins can view org results" on results
  for select using (
    exists (
      select 1 from exams e
      join organization_members om on om.organization_id = e.organization_id
      where e.id = results.exam_id
      and om.user_id = auth.uid()
      and om.role in ('owner', 'admin')
    )
  );
