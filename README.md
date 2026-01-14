# MockCBT - Computer Based Test Platform

## Product Context

### Vision
MockCBT is a web platform for creating and delivering computer-based tests (CBT).
The product targets test centers as customers while retaining a super-user admin
experience for the owner to manage tenants, plans, and operational controls.

### Core Goals
- Rebrand the entire product as "MockCBT" in UI, docs, and code identifiers.
- Support multi-tenant usage: the owner (super user) provisions test centers.
- Monetize via tiered plans and per-student usage (seat or attempt-based billing).
- Use Supabase for auth, database, and real-time features during early stages.
- Host the public web app on Vercel.

### Planned Product Layers
- **Owner/Super user**: manages test centers, plans, billing rules, and feature flags.
- **Test center tenant**: manages students, tests, schedules, and reporting.
- **Student interface**: takes tests, reviews results, and sees performance analytics.

### Monetization Approach
- Tiered plans (e.g., Basic/Pro/Enterprise) with feature limits.
- Metered billing per student or per test attempt.
- Feature gating based on plan (PDF cropper, analytics, exports, storage limits).

### Rebrand Scope (MockCBT)
- App name, logo, metadata, and marketing copy.
- Supabase project name and auth templates.
- URLs, sitemap, and robots metadata.
- Release notes, README content, and changelog entries.

### Hosting Plan (Vercel)
- Deploy `apps/web` as the primary Nuxt app.
- Use environment variables for Supabase config on Vercel.
- Decide on static generation vs server rendering per feature needs.
  - Static: faster and cheaper, but limited to client-only features.
  - Server: required for protected routes or server-side data.

### Immediate Roadmap
- Ensure dev server and linting are stable across machines.
- Replace branding strings and assets with MockCBT.
- Define plan tiers and gate features in UI.
- Add admin flows for tenant creation and user roles.

### Technical Notes
- Frontend: Nuxt 4 app in `apps/web/`.
- Shared UI/utilities: `apps/shared/`.
- Supabase schema and migrations: `supabase/migrations/`.
- Deployment target: Vercel (static or server-rendered Nuxt output as needed).

---

## Project Context

### Overview
This project is a monorepo workspace (using PNPM) aimed at transforming a PDF-to-CBT tool into a full SaaS platform for test centers. The platform will allow institutions to conduct online tests with white-labeling capabilities (custom branding) based on subscription plans.

### Current Architecture
- **Monorepo Structure:**
  - `apps/shared`: Core logic, UI components, and shared configurations (Nuxt layer).
  - `apps/web`: Public-facing web application (Nuxt app), extending `apps/shared`.
- **Tech Stack:**
  - **Framework:** Nuxt 3 (Compatibility Version 4)
  - **Language:** TypeScript
  - **Styling:** Tailwind CSS (v4), Shadcn UI, Nuxt UI / Reka UI
  - **Database/Auth:** Supabase (Integrated via `@nuxtjs/supabase`)
  - **Deployment:** Vercel
  - **PDF Processing:** MuPDF (`mupdf` js bindings)
  - **State Management:** Nuxt `useState` / Composables
  - **Local Storage:** `dexie` (IndexedDB wrapper)

### Roadmap & Goals

#### 1. SaaS Transformation
- **Monetization:** Implement subscription plans (Free, Basic, Pro, Enterprise).
- **White-labeling:**
  - Allow test centers to upload logos.
  - Customize color themes.
  - Custom domains (future).

#### 2. Backend & Auth (Supabase)
- **User Management:** Auth for test center admins and students.
- **Data Schema:**
  - `users`: Profiles and role management.
  - `organizations`: Test centers with branding settings.
  - `exams`: Test definitions (converted from PDFs).
  - `results`: Student attempts and scores.

#### 3. Deployment
- **Vercel:** Automated deployments from the repository.
- **Environment Variables:**
  - `SUPABASE_URL`
  - `SUPABASE_KEY`
  - `NUXT_PUBLIC_SITE_URL`

### Current Status (as of Jan 2026)
- **Supabase Module:** Installed in `apps/web`.
- **UI:** Shared component library established in `apps/shared`.
- **Core Functionality:** PDF to CBT conversion logic exists.

### Role Model (January 2026)
- **Super Admin:** Full platform access: billing, centers, system settings, global analytics.
- **Test Centre Admin:** Creates papers/tests, hosts sessions, manages students, publishes results.
- **Student:** Takes assigned tests and views results only.

### Next Steps
1.  **Verify Supabase Connection:** Ensure env vars are set and auth works.
2.  **Database Design:** Create migration/schema for Organizations and Branding.
3.  **UI Updates:** Add dashboard for Test Center Admins to manage branding/plans.
4.  **Integration:** Connect branding settings to the exam interface.

### Current Progress (Latest)
- Role-based dashboards and navigation added in the web app.
- Auth and role middleware added for route gating.
- Light theme palette approved and applied to core surfaces.
- Dev role switcher added for local testing.
- Profile-based role lookup added with Supabase migration.
- Login redirect fixed to handle session-first auth flow.

### Planned Work (Near Term)
1. Build admin/students CRUD and test assignment flows.
2. Replace remaining hard-coded colors with CSS variables.
3. Add onboarding and empty-state guidance per role.
4. Wire dashboards to real Supabase data (centers/tests/students).

### Notes For Future Context
- Auth gating now checks both `useSupabaseUser()` and `useSupabaseSession()` to avoid redirect loops.
- Use `/dashboard` as the default post-login route; it resolves to the role dashboard.

---

## Repository Guidelines

### Project Structure & Module Organization
- `apps/web/` is the main Nuxt 4 web app (pages, components, assets, composables).
- `apps/shared/` contains shared Nuxt app code and reusable UI utilities used across the workspace.
- `supabase/migrations/` holds SQL migrations for the Supabase schema.
- `updates-content/` stores release notes content and the `releases.json` index.
- `schema/` contains JSON schemas and config samples.

### Build, Test, and Development Commands
- `pnpm install`: install workspace dependencies (uses `pnpm-workspace.yaml`).
- `pnpm dev:web`: run the Nuxt dev server for `apps/web`.
- `pnpm --filter ./apps/web build`: production build for the web app.
- `pnpm --filter ./apps/web generate`: generate the static site output.
- `pnpm --filter ./apps/web preview`: preview the production build locally.
- `pnpm --filter ./apps/web lint`: run ESLint on the web app.
- `pnpm --filter ./apps/shared prepare`: generate Nuxt types for shared app code.

### Coding Style & Naming Conventions
- Language: TypeScript + Vue SFCs (`.vue`) with Nuxt conventions.
- Indentation: 2 spaces in TS/Vue/JSON files.
- Naming: `PascalCase.vue` for components, `camelCase.ts` for utilities, `kebab-case` for routes/pages.
- Linting: ESLint configured in `apps/web/eslint.config.mjs` and `apps/shared/eslint.config.mjs`.

### Testing Guidelines
- No automated test framework is configured yet.
- If you add tests, keep files next to the code or under a `tests/` folder and document the runner in this guide.

### Commit & Pull Request Guidelines
- Commit messages are short, sentence-case summaries (e.g., “Add Supabase integration...”).
- PRs should include a clear description, testing notes (what you ran), and screenshots for UI changes.
- Link related issues or discussions when applicable.

### Security & Configuration Notes
- Supabase configuration lives in `apps/web/.env`:
  - `SUPABASE_URL` and `SUPABASE_KEY`.
- SQL migrations are managed in `supabase/migrations/`; apply them via Supabase SQL Editor or CLI.

---

## Local Development Setup

### Start the Web App
From the repo root:
```bash
pnpm dev:web
```

This starts Nuxt on port 3000 and binds to all interfaces for consistency.
Open:
- http://localhost:3000/ (redirects to `/login`)
- http://localhost:3000/login

### Quick Health Checks
```bash
cmd /c netstat -ano | findstr :3000
```
You should see a LISTENING entry on port 3000.

```bash
cmd /c curl -I http://127.0.0.1:3000/
```
Expect a `302` redirect to `/login`.

### If the Browser Says "Not Reachable"
1. Make sure the dev server is still running in your terminal.
2. Try http://127.0.0.1:3000/login directly.
3. If port 3000 is busy, start on a new port:
   ```bash
   pnpm --dir apps/web exec nuxi dev --host 0.0.0.0 --port 3001
   ```
4. Disable any local proxy/VPN that could intercept `localhost`.

### Auth Roles (Required for Dashboards)
Set a Supabase user role in `user_metadata.role` (or `profiles.role` after applying the migration):
- `super_admin`
- `test_centre_admin`
- `student`

If no role is set, the app defaults to `student`.

### Dev Role Switcher (Local Only)
In dev mode, use the Settings panel to override roles without editing Supabase.
This stores a local override in the browser and never affects production.

---

## Supabase Integration

This project uses [Supabase](https://supabase.com) for Authentication, Database, and Realtime features.

### Setup Instructions

#### 1. Create a Supabase Project
Go to [database.new](https://database.new) and create a new project.

#### 2. Get Credentials
In your Supabase project settings -> API, find:
- **Project URL**
- **Anon Public Key**

#### 3. Configure Environment Variables
Create a `.env` file in `apps/web/.env` (and optionally in root if needed for scripts):

```env
SUPABASE_URL="your-project-url"
SUPABASE_KEY="your-anon-key"
```

#### 4. Apply Database Migrations
Copy the contents of `supabase/migrations/20260113000000_initial_schema.sql` and run them in the Supabase SQL Editor.

Alternatively, if you have the Supabase CLI installed:
```bash
supabase link --project-ref your-project-ref
supabase db push
```

#### 5. Generate Types (Optional but Recommended)
To keep TypeScript types in sync with your schema:
```bash
npx supabase gen types typescript --project-id "your-project-id" --schema public > apps/web/app/types/database.types.ts
```

### Schema Overview
- **profiles**: User profiles linked to Auth.
- **organizations**: Test centers/tenants.
- **organization_members**: Users belonging to organizations (with roles).
