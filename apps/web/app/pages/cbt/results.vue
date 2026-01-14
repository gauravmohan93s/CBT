<template>
  <SharedCbtResults />
</template>

<script setup lang="ts">
import SharedCbtResults from '#layers/shared/app/pages/cbt/results.vue'

definePageMeta({
  roles: ['super_admin', 'test_centre_admin', 'student'],
})
</script>
