<template>
  <SharedCbtInterface />
</template>

<script setup lang="ts">
import SharedCbtInterface from '#layers/shared/app/pages/cbt/interface.vue'

definePageMeta({
  layout: false,
  roles: ['super_admin', 'test_centre_admin', 'student'],
})
</script>
