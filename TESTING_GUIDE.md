# MockCBT SaaS Feature Testing Guide

This guide walks you through verifying the newly developed SaaS features (Onboarding, Cloud Publishing, and Cloud Testing).

## Prerequisites
1.  Ensure your local development server is running: `pnpm dev:web`.
2.  Ensure Supabase migrations are applied (if using local Supabase) or that you are connected to your cloud Supabase instance.

---

## Automated Smoke Test (Playwright)

**Goal:** Verify the public auth pages render without regressions.

1.  Ensure `SUPABASE_URL` and `SUPABASE_KEY` are set in `apps/web/.env`.
2.  From the repo root, run: `pnpm test:e2e`.
3.  Verify the Playwright run completes with a passing `smoke.spec.ts`.
4.  If the web server times out, start it manually with `pnpm dev:web` and re-run with `PLAYWRIGHT_NO_WEB_SERVER=1 pnpm test:e2e`.

---

## Test Scenario 1: Tenant Onboarding (The "Center Admin")

**Goal:** Verify a new user can sign up and automatically provision an Organization.

1.  **Navigate to:** `http://localhost:3000/login`
    *   **Verify:** The login page has no settings/gear side panel.
2.  **Action:** Click **"start your free trial today"**.
3.  **Navigate to:** `http://localhost:3000/signup`
4.  **Action:** Fill in the form:
    *   **Full Name:** Test Admin
    *   **Organization Name:** My Test Academy (or unique name)
    *   **Email:** admin@test.com (use a real one or disposable if Supabase confirms emails)
    *   **Password:** password123
5.  **Click:** "Start Free Trial"
6.  **Verify:**
    *   You are redirected to `/dashboard/centre-admin`.
    *   The dashboard title says "MY TEST ACADEMY" (or whatever you entered), not "Test Centre Admin".
    *   Navigating to `/dashboard` shows a loading state and resolves to the same role dashboard.

---

## Test Scenario 2: Publishing a Test (The "Creator")

**Goal:** Verify a PDF can be processed and uploaded to the cloud via the UI.

1.  **Navigate to:** `http://localhost:3000/pdf-cropper`
2.  **Action:**
    *   Click **"Select a PDF"** and upload a sample PDF.
    *   (Optional) Use "Auto-Detect" or manually draw a crop box around a question.
    *   Ensure at least one question is defined in the list.
3.  **Action:** Click the purple **"Publish to Cloud"** button (next to "Generate Output").
4.  **Dialog:**
    *   **Title:** "Physics Mock Test 1"
    *   **Description:** "Chapter 1-5"
    *   Click **"Publish"**.
5.  **Verify:**
    *   You see a "Success" alert/toast.
6.  **Navigate to:** `http://localhost:3000/dashboard/centre-admin`
7.  **Verify:**
    *   Under "Published Tests", you see "Physics Mock Test 1".
    *   Click the **Copy** icon to copy the Exam ID (e.g., `123e4567-e89b...`).

---

## Test Scenario 3: Taking a Test (The "Student")

**Goal:** Verify the test loads from the cloud and syncs results back.

*Note: For simplicity, the Admin is also a "Member" of their own org, so you can test this with the same account.*

1.  **Navigate to:** `http://localhost:3000/dashboard/student`
2.  **Verify:**
    *   You see "Physics Mock Test 1" listed under "Available Tests".
3.  **Action:** Click **"Take Test"**.
4.  **Redirect:** You should go to `/cbt/interface?examId=...`
5.  **Verify:**
    *   A loading spinner appears: "Loading Test from Cloud...".
    *   The test loads *without* asking for a PDF upload.
    *   The test name matches ("Physics Mock Test 1").
6.  **Action:**
    *   Answer a few questions.
    *   Click **"Submit"**.
7.  **Verify:**
    *   You are redirected to `/cbt/results`.
    *   (Technical Check): In your browser console or Supabase dashboard, check the `results` table. A new row should exist with your `student_id`, `exam_id`, and `data` JSON.

---

## Test Scenario 4: Branding & White-Labeling

**Goal:** Verify that a Center Admin can change the theme color.

1.  **Navigate to:** `http://localhost:3000/dashboard/branding` (logged in as Admin).
2.  **Action:** Pick a new "Primary Theme Color" (e.g., Deep Red or Green).
3.  **Click:** "Save Changes".
4.  **Verify:**
    *   The "Sample Button" in the preview matches the new color.
    *   Reload the page or navigate to the Dashboard; the sidebar and primary buttons should now use your new color.

---

## Test Scenario 5: Result Sharing (The "Magic Link")

**Goal:** Verify a report can be shared with someone who isn't logged in.

1.  **Navigate to:** `http://localhost:3000/dashboard/student`.
2.  **Action:** If you have a past result, go to the Results page.
3.  **Action:** Click **"Share Result"**.
4.  **Verify:** An alert says "Public result link copied".
5.  **Action:** Open a **New Incognito Window** (Logged out).
6.  **Paste:** The copied URL.
7.  **Verify:** You can see the "MockCBT Performance Report" with score details and section analysis.

---

## Test Scenario 6: Automated PDF Reports

1.  **On any Results page:** Click **"Download PDF Report"**.
2.  **Verify:** A PDF file is generated and downloaded containing your scores and section breakdown.

---

## Test Scenario 7: Student Invitation & Onboarding

**Goal:** Verify a Center Admin can invite a student and the student can join via the link.

1.  **Log in** as Center Admin (`/dashboard/centre-admin`).
2.  **Action:** Click **"Invite Students"**.
3.  **Action:** Click **"Generate Invite Link"**.
4.  **Action:** Copy the generated link (e.g., `http://localhost:3000/join?token=...`).
5.  **Action:** Open a **New Incognito Window** (or logout).
6.  **Paste:** The invite link.
7.  **Verify:** You see the "Join [Institute Name]" registration page.
8.  **Action:** Fill out the form (Name, Email, Password) and click **"Register & Join"**.
9.  **Verify:** You are redirected to the Student Dashboard (`/dashboard/student`) and can see the Institute's published tests.
