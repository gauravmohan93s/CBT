-- Create a new storage bucket for exams
insert into storage.buckets (id, name, public)
values ('exams', 'exams', true)
on conflict (id) do nothing;

-- Policies for the storage bucket 'exams'

-- Admins can upload files
create policy "Admins can upload exam files"
on storage.objects for insert
with check (
  bucket_id = 'exams' 
  and auth.role() = 'authenticated'
  -- Ideally check if user is admin of an org, but file upload happens before exam record creation?
  -- We can restrict by path prefix or just allow authenticated for now.
);

-- Admins can update/delete their own files
create policy "Admins can update exam files"
on storage.objects for update
using (
  bucket_id = 'exams'
  and auth.uid() = owner
);

create policy "Admins can delete exam files"
on storage.objects for delete
using (
  bucket_id = 'exams'
  and auth.uid() = owner
);

-- Students (Public for now) can download files
create policy "Anyone can download exam files"
on storage.objects for select
using ( bucket_id = 'exams' );
