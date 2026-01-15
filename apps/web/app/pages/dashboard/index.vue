<template>
  <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background px-6">
    <div class="flex flex-col items-center gap-3 text-center text-sm text-muted-foreground">
      <Icon name="line-md:loading-twotone-loop" class="text-2xl text-primary" />
      <p>Loading your dashboard...</p>
      <NuxtLink
        v-if="!user"
        to="/login"
        class="text-primary hover:text-primary/80"
      >
        Back to login
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DEFAULT_ROLE, getDashboardPath } from '#layers/shared/shared/roles'

definePageMeta({
  roles: ['super_admin', 'test_centre_admin', 'student'],
})

const user = useSupabaseUser()
const session = useSupabaseSession() // Add session
const role = useUserRole()
const profileRole = useProfileRole()

// Watch effective user (session or user ref)
const effectiveUser = computed(() => user.value || session.value?.user)

watch([role, effectiveUser, profileRole.loaded], ([nextRole, nextUser, loaded]) => {
  // FIX: If we already have a role, we trust it and redirect immediately.
  if (nextRole) {
    navigateTo(getDashboardPath(nextRole))
    return
  }

  // Only block if we strictly need the user object to determine the default role
  if (!nextUser) {
    return
  }

  if (loaded) {
    navigateTo(getDashboardPath(DEFAULT_ROLE))
  }
}, { immediate: true })
</script>
