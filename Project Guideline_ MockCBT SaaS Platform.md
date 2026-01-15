This **Comprehensive Project Guideline** for **MockCBT** serves as your master blueprint for engineering, business operations, and product scaling. It integrates the technical architecture of a Nuxt 4/Supabase monorepo with a high-margin SaaS monetization strategy.

## ---

**1\. Product Vision & Core Architecture**

MockCBT is a multi-tenant platform that transforms static PDFs into interactive Computer-Based Tests (CBT), specifically optimized for tuition centers and coaching institutes.

* **Tech Stack:** Nuxt 4 (Frontend), Supabase (Auth, Database, Real-time), Tailwind CSS v4 (Styling), and MuPDF (PDF processing).  
* **Monorepo Structure:** apps/web for the primary application and apps/shared for reusable UI components and logic.  
* **Resilience:** Uses dexie (IndexedDB) for client-side state saving to prevent data loss during network interruptions.

## ---

**2\. Tiered Feature & Plan Map**

To maximize profit, features are gated to encourage upgrades from Basic to Professional (the "Anchor" tier).

| Feature | Basic ($20/mo) | Professional ($49/mo) | Enterprise ($150/mo) |
| :---- | :---- | :---- | :---- |
| **Student Capacity** | Up to 50 students. | Up to 200 students. | Unlimited students. |
| **Branding** | MockCBT standard. | Detailed Analytics. | **Full White-Labeling**. |
| **Reporting** | Basic Scores. | **Automated Reports**. | Custom Reporting. |
| **High-Margin Add-ons** | Standard Support. | Priority Support. | **AI Proctoring**. |

## ---

**3\. Engineering User Flows**

### **A. Administrative & Tenant Flow (Owner/Center Admin)**

1. **Organization Setup:** Admins create an organization profile, which triggers a unique tenant ID in Supabase to isolate data.  
2. **Branding Configuration:** (Enterprise) Admins upload logos and select color palettes that update CSS variables across the tenant's portal.  
3. **Test Creation:**  
   * **PDF Upload:** Admin uploads a test paper.  
   * **Zone Definition:** Uses the PDF-to-CBT tool to map question areas and define the answer key.  
4. **Student Enrollment:** Admins bulk-upload students or provide a signup link for self-registration.  
5. **Analytics:** After tests, admins view the "Student Performance Report," which identifies weak areas for specific students or whole batches.

### **B. Student Experience Flow (End-User)**

1. **Dashboard:** Upon login, students see a timeline of upcoming tests and results from past attempts.  
2. **Examination Interface:**  
   * **Lockdown Mode:** The interface enters a full-screen state to deter cheating.  
   * **Real-time Saving:** Every answer choice is synced to local IndexedDB (Dexie) and the Supabase database simultaneously.  
3. **Completion:** Upon submission, the student receives instant feedback or a summary, depending on the test settings.

## ---

**4\. Business & Financial Management**

### **Earning & Scaling Strategy**

* **The "Anchor" Strategy:** Set the $49/mo plan as the "Most Popular" to make it look like a "steal" compared to the $150/mo plan.  
* **Annual Incentives:** Offer 2 months free for annual upfront payments to secure immediate cash flow for R\&D.  
* **Value-Add Upsells:** Charge separate fees for "Content Access" (pre-loaded question banks) or "AI Proctoring" (per-test usage fee).

### **Budget & Expense Tracking (The KPI Dashboard)**

Your Super-Admin dashboard must track these metrics to ensure profitability:

* **Infrastucture Costs:** Monthly Vercel bandwidth and Supabase database/auth usage.  
* **CAC (Customer Acquisition Cost):** Spend on marketing vs. new tuition center signups.  
* **Stickiness Factor:** Usage of "Automated Reports" (high usage \= low churn).

## ---

**5\. Future Roadmap & Enhancements**

To stay ahead of competitors (like Testportal or ClassMarker), the following enhancements are recommended:

* **Offline-First Resilience:** Further optimize Dexie to allow tests to continue even with 100% internet outage, syncing only when the connection returns.  
* **Mobile App Access:** Offer a dedicated Android/iOS app as a premium feature for the Enterprise tier.
* **AI Question Categorization:** Use AI to automatically tag the difficulty level of questions extracted from PDFs.

## ---

**6\. Quality & Testing**

* **Automated Smoke Tests:** Playwright smoke coverage for login/signup pages to catch auth UI regressions early.
* **Manual Validation:** Continue using the end-to-end scenarios in `TESTING_GUIDE.md` for data-backed flows.
* **Security Hardening:** Use RPC-backed invite validation and membership creation to avoid RLS bypasses.

igh-growth SaaS platform.

---

## **Project: MockCBT Standard Development Document (v1.0)**

### **1\. Product Vision & Architecture**

MockCBT is a multi-tenant, PDF-to-CBT SaaS platform designed for test centers to digitize their examinations11.

\+1

* **Monorepo Strategy:** Utilizing PNVM with apps/web (Nuxt 4\) and apps/shared for reusable UI components2.  
* **Data Backbone:** Supabase handles Authentication, PostgreSQL (for multi-tenant data), and Real-time session monitoring3.  
* **PDF Engine:** MuPDF is used for converting static PDFs into interactive, structured test formats4.

---

### **2\. Development Roadmap (Phase-by-Phase)**

#### **Phase A: Core SaaS Foundation**

* **Multi-Tenancy:** Implement organizations tables in Supabase to isolate data between different tuition centers5.  
* **Role Logic:** Finalize the 3-tier role system: Super Admin (Global), Center Admin (Tenant), and Student (End-user)6.  
* **White-Labeling Engine:** Build the logic to swap logos and color themes (Tailwind CSS v4 variables) based on the tenant's profile77.  
  \+1

#### **Phase B: CBT Experience & Value-Adds**

* **Resilient Testing:** Use dexie (IndexedDB) for client-side state saving so students don't lose progress during internet drops8.  
* **Automated Reporting:** Develop logic to auto-generate student performance reports immediately after test submission to make the tool "sticky"99.  
  \+1  
* **Content Library:** (Enhancement) Create a module for pre-loaded question banks to justify a "Content Access Fee"10.

---

### **3\. Strategic Monetization & Business Model**

#### **Pricing Tiers (The "Anchor" Strategy)**

| Tier | Monthly Rate | Features & Limits |
| :---- | :---- | :---- |
| **Basic** | $20 11 | Up to 50 students, standard MockCBT branding12. |
| **Professional** | **$49** (Most Popular) 13 | **200 students**, detailed analytics, automated reports14. |
| **Enterprise** | $150 15 | Unlimited students, **Full White-labeling**, AI Proctoring16. |

#### **Revenue Maximizers**

* **Setup Fees:** Charge $200–$500/year for white-labeling (custom logo/name)17.  
* **Annual Discount:** Offer 2 months free for upfront annual payments to improve cash flow18.  
* **AI Proctoring:** Charge extra per-exam for webcam-based cheating detection19.

---

### **4\. Financial Tracking & Budgeting**

To maintain a healthy profit margin, track these metrics in your **Super Admin Command Center**:

* **COGS (Cost of Goods Sold):** Track Supabase storage/database usage and Vercel bandwidth costs20.  
* **MRR (Monthly Recurring Revenue):** Sum of all active tier subscriptions21.  
* **Churn Rate:** Monitor how many centers leave after the 14-day free trial22.

---

## **Market Comparison & Product Enhancements**

I have analyzed existing solutions (like *Testportal*, *SpeedExam*, and *ClassMarker*) to suggest how you can leapfrog them:

### **Competitive Enhancements**

1. **"Offline-First" Exam Mode:** Unlike many cloud-only competitors, your use of dexie 23 allows you to market a "Zero-Data-Loss" guarantee. Even if the WiFi dies, the student's timer and answers remain safe locally.  
2. **Parent/Guardian Portal:** Add a 4th role where parents can log in to see the "Automated Reports" 24 for their child. This increases "stickiness" as the tuition center now provides value directly to the fee-paying parents.  
3. **WhatsApp Integration:** Instead of just emails, use Supabase Edge Functions to send test results directly to parents via WhatsApp. This is a high-value feature in markets like India.  
4. **AI-Driven PDF Parsing:** Move beyond basic MuPDF extraction25. Use LLMs to automatically categorize question difficulty levels during the PDF upload process, saving teachers hours of tagging work.
