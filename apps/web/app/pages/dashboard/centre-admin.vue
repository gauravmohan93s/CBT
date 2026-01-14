<template>
  <div class="min-h-[calc(100vh-4rem)] bg-[radial-gradient(circle_at_top,_#20c997_0%,_transparent_45%),linear-gradient(180deg,_#f7f9fc_0%,_#eef3fb_100%)]">
    <section class="mx-auto w-full max-w-6xl px-6 py-10">
      <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p class="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Test Centre Admin
          </p>
          <h1 class="mt-2 text-3xl font-bold text-foreground">
            Manage Tests & Students
          </h1>
          <p class="mt-2 text-muted-foreground">
            Create exams, schedule sessions, and track student performance.
          </p>
        </div>
        <div class="flex items-center gap-3">
          <BaseButton
            class="bg-primary text-primary-foreground hover:bg-primary/90"
            label="Create Test"
            icon-name="material-symbols:playlist-add"
          />
          <BaseButton
            variant="outline"
            label="Invite Students"
            icon-name="material-symbols:group-add"
          />
        </div>
      </div>

      <div class="mt-8 grid gap-4 md:grid-cols-3">
        <div class="rounded-xl border bg-card p-5 shadow-sm">
          <p class="text-sm text-muted-foreground">Scheduled Tests</p>
          <p class="mt-3 text-3xl font-semibold text-foreground">12</p>
          <p class="mt-2 text-xs text-muted-foreground">Next session in 3 hours</p>
        </div>
        <div class="rounded-xl border bg-card p-5 shadow-sm">
          <p class="text-sm text-muted-foreground">Active Students</p>
          <p class="mt-3 text-3xl font-semibold text-foreground">420</p>
          <p class="mt-2 text-xs text-muted-foreground">96% attendance this week</p>
        </div>
        <div class="rounded-xl border bg-card p-5 shadow-sm">
          <p class="text-sm text-muted-foreground">Pending Evaluations</p>
          <p class="mt-3 text-3xl font-semibold text-foreground">7</p>
          <p class="mt-2 text-xs text-muted-foreground">Results due today</p>
        </div>
      </div>

      <div class="mt-8 grid gap-6 lg:grid-cols-2">
        <div class="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 class="text-lg font-semibold text-foreground">Quick Actions</h2>
          <div class="mt-4 grid gap-3">
            <button class="flex items-center justify-between rounded-lg border border-dashed p-3 text-sm text-muted-foreground transition hover:border-primary hover:text-foreground">
              Upload PDF and generate CBT package
              <Icon name="material-symbols:arrow-right-alt" />
            </button>
            <button class="flex items-center justify-between rounded-lg border border-dashed p-3 text-sm text-muted-foreground transition hover:border-primary hover:text-foreground">
              Publish results for completed tests
              <Icon name="material-symbols:arrow-right-alt" />
            </button>
            <button class="flex items-center justify-between rounded-lg border border-dashed p-3 text-sm text-muted-foreground transition hover:border-primary hover:text-foreground">
              Configure center branding
              <Icon name="material-symbols:arrow-right-alt" />
            </button>
          </div>
        </div>
        <div class="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 class="text-lg font-semibold text-foreground">Recent Activity</h2>
          <div class="mt-4 space-y-3 text-sm text-muted-foreground">
            <div class="rounded-lg border border-l-4 border-l-primary bg-background p-3">
              48 students started the JEE Mock Test 4.
            </div>
            <div class="rounded-lg border border-l-4 border-l-accent bg-background p-3">
              Physics Section template updated by staff.
            </div>
            <div class="rounded-lg border border-l-4 border-l-secondary bg-background p-3">
              3 new test packages uploaded for review.
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  roles: ['test_centre_admin'],
})
</script>
