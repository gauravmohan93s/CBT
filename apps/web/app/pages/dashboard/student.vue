<template>
  <div class="min-h-[calc(100vh-4rem)] bg-[radial-gradient(circle_at_top,_#ff9f1c_0%,_transparent_45%),linear-gradient(180deg,_#f7f9fc_0%,_#eef3fb_100%)]">
    <section class="mx-auto w-full max-w-5xl px-6 py-10">
      <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p class="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Student
          </p>
          <h1 class="mt-2 text-3xl font-bold text-foreground">
            Your Tests & Progress
          </h1>
          <p class="mt-2 text-muted-foreground">
            Jump into your assigned tests and track your scores.
          </p>
        </div>
        <BaseButton
          class="bg-primary text-primary-foreground hover:bg-primary/90"
          label="Start Next Test"
          icon-name="material-symbols:play-circle-outline"
        />
      </div>

      <div class="mt-8 grid gap-4 md:grid-cols-3">
        <div class="rounded-xl border bg-card p-5 shadow-sm">
          <p class="text-sm text-muted-foreground">Assigned Tests</p>
          <p class="mt-3 text-3xl font-semibold text-foreground">5</p>
          <p class="mt-2 text-xs text-muted-foreground">2 due this week</p>
        </div>
        <div class="rounded-xl border bg-card p-5 shadow-sm">
          <p class="text-sm text-muted-foreground">Average Score</p>
          <p class="mt-3 text-3xl font-semibold text-foreground">72%</p>
          <p class="mt-2 text-xs text-muted-foreground">Up 6% from last month</p>
        </div>
        <div class="rounded-xl border bg-card p-5 shadow-sm">
          <p class="text-sm text-muted-foreground">Streak</p>
          <p class="mt-3 text-3xl font-semibold text-foreground">4 days</p>
          <p class="mt-2 text-xs text-muted-foreground">Keep going!</p>
        </div>
      </div>

      <div class="mt-8 grid gap-6 lg:grid-cols-2">
        <div class="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 class="text-lg font-semibold text-foreground">Upcoming Tests</h2>
          <div class="mt-4 space-y-3 text-sm text-muted-foreground">
            <div class="flex items-center justify-between rounded-lg border border-dashed p-3">
              Physics Mock 7
              <span class="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
                Tomorrow 9:00 AM
              </span>
            </div>
            <div class="flex items-center justify-between rounded-lg border border-dashed p-3">
              Chemistry Practice Set
              <span class="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
                Friday 4:00 PM
              </span>
            </div>
          </div>
        </div>
        <div class="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 class="text-lg font-semibold text-foreground">Focus Areas</h2>
          <div class="mt-4 grid gap-3 text-sm text-muted-foreground">
            <div class="rounded-lg bg-[linear-gradient(120deg,_#2d7ff9_0%,_#20c997_100%)] p-4 text-white">
              Algebra accuracy needs improvement (54%).
            </div>
            <div class="rounded-lg bg-[linear-gradient(120deg,_#ff9f1c_0%,_#f59e0b_100%)] p-4 text-white">
              Time management on Physics section.
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  roles: ['student'],
})
</script>
