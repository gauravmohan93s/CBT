<template>
  <div class="min-h-[calc(100vh-4rem)] bg-[radial-gradient(circle_at_top,_var(--color-primary)_0%,_transparent_45%),linear-gradient(180deg,_#f7f9fc_0%,_#eef3fb_100%)]">
    <section class="mx-auto w-full max-w-5xl px-6 py-10">
      <div class="flex flex-col gap-3">
        <p class="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Super Admin
        </p>
        <h1 class="text-3xl font-bold text-foreground">
          Billing & Plans
        </h1>
        <p class="text-muted-foreground">
          Configure plan pricing, trial rules, and billing integrations for all centers.
        </p>
      </div>

      <div class="mt-8 rounded-2xl border bg-card p-6 shadow-sm">
        <p class="text-sm text-muted-foreground">
          Billing controls are being wired up next. Use the shortcuts below to keep admin work moving.
        </p>
        <div class="mt-4 flex flex-wrap gap-3">
          <BaseButton
            variant="outline"
            label="Review latest updates"
            icon-name="material-symbols:feed"
            @click="navigateTo('/updates')"
          />
          <BaseButton
            variant="outline"
            label="Create a new center"
            icon-name="material-symbols:add-circle-outline"
            @click="navigateTo('/signup')"
          />
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
