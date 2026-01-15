<template>
  <SharedIndex />
</template>

<script setup lang="ts">
import SharedIndex from '#layers/shared/app/pages/index.vue'
import { DEFAULT_ROLE, getDashboardPath } from '#layers/shared/shared/roles'

definePageMeta({
  public: true,
})

const user = useSupabaseUser()
const role = useUserRole()

watchEffect(() => {
  if (user.value && role.value) {
    navigateTo(getDashboardPath(role.value))
  }
})
</script>
