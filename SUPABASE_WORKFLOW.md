# Supabase Migration Workflow

Use this workflow to keep migrations clean and reproducible across local, staging, and production.

## 1) Install and Authenticate
- Install Supabase CLI: https://supabase.com/docs/guides/cli
- Login: `supabase login`

## 2) Link Projects (staging and production)
- Staging: `supabase link --project-ref <staging_project_ref>`
- Production: `supabase link --project-ref <production_project_ref>`

Tip: keep separate terminals or use `supabase link` each time you switch targets.

## 3) Create New Migrations (never edit old ones)
- Create: `supabase migration new <short_description>`
- Edit the new SQL file under `supabase/migrations/`.
- Apply: `supabase db push`

## 4) Local Development (optional but recommended)
- Start local Supabase: `supabase start`
- Reset local DB from migrations: `supabase db reset`
- Stop: `supabase stop`

## 5) When a table already exists in production
If you run into errors like `relation already exists`, do **not** edit old migrations:
- Skip that migration and run the remaining ones in order, **or**
- Use `supabase migration repair` to mark it applied, **or**
- Use the Supabase SQL Editor to apply only the migrations that are missing.

## 6) Production Release Flow
- Apply migrations to staging first.
- Validate onboarding + invite join in staging.
- Apply the same migrations to production.

