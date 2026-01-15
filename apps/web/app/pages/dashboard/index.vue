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
const role = useUserRole()
const profileRole = useProfileRole()

watch([role, user, profileRole.loaded], ([nextRole, nextUser, loaded]) => {
  if (!nextUser) return
  if (nextRole) {
    navigateTo(getDashboardPath(nextRole))
    return
  }
  if (loaded) {
    navigateTo(getDashboardPath(DEFAULT_ROLE))
  }
}, { immediate: true })
</script>
