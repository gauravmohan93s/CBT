# MockCBT Production Deploy Checklist

Use this list before every production deploy.

## 1) Database & Auth
- [ ] Apply latest Supabase migrations (including `20260115000000_harden_invites_and_members.sql`).
- [ ] Verify RLS policies are enabled and expected (orgs, members, invites, exams, results, storage).
- [ ] Confirm a test signup + invite join flow works in staging.

## 2) Environment Variables (Vercel Production)
- [ ] `SUPABASE_URL` is set to production project URL.
- [ ] `SUPABASE_KEY` is set to production anon key.
- [ ] `NUXT_PUBLIC_SITE_URL` matches the live domain.

## 3) CI & Tests
- [ ] CI is green on `main`.
- [ ] Smoke tests pass locally: `pnpm dev:web` + `PLAYWRIGHT_NO_WEB_SERVER=1 pnpm test:e2e`.

## 4) Vercel Deploy
- [ ] Vercel Production deploy completes without warnings.
- [ ] `/login`, `/signup`, `/join`, and `/share/result` load publicly.
- [ ] Role dashboards still redirect correctly after login.

## 5) Post-Deploy Verification
- [ ] Create a test org and publish a PDF.
- [ ] Take a test and confirm a result is created in Supabase.
- [ ] Generate and open a public result link.
