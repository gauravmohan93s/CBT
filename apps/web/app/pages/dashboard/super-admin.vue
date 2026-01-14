<template>
  <div class="min-h-[calc(100vh-4rem)] bg-[radial-gradient(circle_at_top,_var(--color-primary)_0%,_transparent_45%),linear-gradient(180deg,_#f7f9fc_0%,_#eef3fb_100%)]">
    <section class="mx-auto w-full max-w-6xl px-6 py-10">
      <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p class="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Super Admin
          </p>
          <h1 class="mt-2 text-3xl font-bold text-foreground">
            Active Centers & Business Overview
          </h1>
          <p class="mt-2 text-muted-foreground">
            Monitor all test centers, revenue, and platform health from one place.
          </p>
        </div>
        <div class="flex items-center gap-3">
          <BaseButton
            class="bg-primary text-primary-foreground hover:bg-primary/90"
            label="Create Center"
            icon-name="material-symbols:add-circle-outline"
          />
          <BaseButton
            variant="outline"
            label="Billing"
            icon-name="material-symbols:credit-card"
          />
        </div>
      </div>

      <div class="mt-8 grid gap-4 md:grid-cols-3">
        <div class="rounded-xl border bg-card p-5 shadow-sm">
          <p class="text-sm text-muted-foreground">
            Active Centers
          </p>
          <p class="mt-3 text-3xl font-semibold text-foreground">
            24
          </p>
          <p class="mt-2 text-xs text-muted-foreground">
            +3 this week
          </p>
        </div>
        <div class="rounded-xl border bg-card p-5 shadow-sm">
          <p class="text-sm text-muted-foreground">
            Monthly Revenue
          </p>
          <p class="mt-3 text-3xl font-semibold text-foreground">
            ₹182,400
          </p>
          <p class="mt-2 text-xs text-muted-foreground">
            Tier upgrades trending up
          </p>
        </div>
        <div class="rounded-xl border bg-card p-5 shadow-sm">
          <p class="text-sm text-muted-foreground">
            Platform Health
          </p>
          <p class="mt-3 text-3xl font-semibold text-foreground">
            99.9%
          </p>
          <p class="mt-2 text-xs text-muted-foreground">
            Last incident 28 days ago
          </p>
        </div>
      </div>

      <div class="mt-8 grid gap-6 lg:grid-cols-2">
        <div class="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 class="text-lg font-semibold text-foreground">
            Pending Actions
          </h2>
          <ul class="mt-4 space-y-3 text-sm text-muted-foreground">
            <li class="flex items-center justify-between rounded-lg border border-dashed p-3">
              Review new center onboarding requests
              <BaseButton
                size="sm"
                label="Review"
              />
            </li>
            <li class="flex items-center justify-between rounded-lg border border-dashed p-3">
              Approve enterprise tier quote
              <BaseButton
                size="sm"
                label="Open"
              />
            </li>
            <li class="flex items-center justify-between rounded-lg border border-dashed p-3">
              Update subscription limits for pilot customers
              <BaseButton
                size="sm"
                label="Edit"
              />
            </li>
          </ul>
        </div>
        <div class="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 class="text-lg font-semibold text-foreground">
            Today’s Highlights
          </h2>
          <div class="mt-4 grid gap-4">
            <div class="rounded-xl bg-[linear-gradient(120deg,_#2d7ff9_0%,_#7c3aed_100%)] p-4 text-white">
              <p class="text-xs uppercase tracking-wide text-white/80">
                Top Center
              </p>
              <p class="mt-2 text-lg font-semibold">
                Brightline Institute
              </p>
              <p class="mt-1 text-sm text-white/80">
                1,240 tests conducted this month
              </p>
            </div>
            <div class="rounded-xl bg-[linear-gradient(120deg,_#20c997_0%,_#22c55e_100%)] p-4 text-white">
              <p class="text-xs uppercase tracking-wide text-white/80">
                Growth
              </p>
              <p class="mt-2 text-lg font-semibold">
                +18% new student registrations
              </p>
              <p class="mt-1 text-sm text-white/80">
                Highest since launch
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  roles: ['super_admin'],
})
</script>
