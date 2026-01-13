# Project Context: CBT (Computer Based Test) Platform

## Overview
This project is a monorepo workspace (using PNPM) aimed at transforming a PDF-to-CBT tool into a full SaaS platform for test centers. The platform will allow institutions to conduct online tests with white-labeling capabilities (custom branding) based on subscription plans.

## Current Architecture
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

## Roadmap & Goals

### 1. SaaS Transformation
- **Monetization:** Implement subscription plans (Free, Basic, Pro, Enterprise).
- **White-labeling:**
  - Allow test centers to upload logos.
  - Customize color themes.
  - Custom domains (future).

### 2. Backend & Auth (Supabase)
- **User Management:** Auth for test center admins and students.
- **Data Schema:**
  - `users`: Profiles and role management.
  - `organizations`: Test centers with branding settings.
  - `exams`: Test definitions (converted from PDFs).
  - `results`: Student attempts and scores.

### 3. Deployment
- **Vercel:** Automated deployments from the repository.
- **Environment Variables:**
  - `SUPABASE_URL`
  - `SUPABASE_KEY`
  - `NUXT_PUBLIC_SITE_URL`

## Current Status (as of Jan 2026)
- **Supabase Module:** Installed in `apps/web`.
- **UI:** Shared component library established in `apps/shared`.
- **Core Functionality:** PDF to CBT conversion logic exists.

## Next Steps
1.  **Verify Supabase Connection:** Ensure env vars are set and auth works.
2.  **Database Design:** Create migration/schema for Organizations and Branding.
3.  **UI Updates:** Add dashboard for Test Center Admins to manage branding/plans.
4.  **Integration:** Connect branding settings to the exam interface.
