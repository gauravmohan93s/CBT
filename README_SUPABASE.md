# Supabase Integration

This project uses [Supabase](https://supabase.com) for Authentication, Database, and Realtime features.

## Setup Instructions

### 1. Create a Supabase Project
Go to [database.new](https://database.new) and create a new project.

### 2. Get Credentials
In your Supabase project settings -> API, find:
- **Project URL**
- **Anon Public Key**

### 3. Configure Environment Variables
Create a `.env` file in `apps/web/.env` (and optionally in root if needed for scripts):

```env
SUPABASE_URL="your-project-url"
SUPABASE_KEY="your-anon-key"
```

### 4. Apply Database Migrations
Copy the contents of `supabase/migrations/20260113000000_initial_schema.sql` and run them in the Supabase SQL Editor.

Alternatively, if you have the Supabase CLI installed:
```bash
supabase link --project-ref your-project-ref
supabase db push
```

### 5. Generate Types (Optional but Recommended)
To keep TypeScript types in sync with your schema:
```bash
npx supabase gen types typescript --project-id "your-project-id" --schema public > apps/web/app/types/database.types.ts
```

## Schema Overview
- **profiles**: User profiles linked to Auth.
- **organizations**: Test centers/tenants.
- **organization_members**: Users belonging to organizations (with roles).
