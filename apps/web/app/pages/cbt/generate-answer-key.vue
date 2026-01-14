<template>
  <SharedGenerateAnswerKey />
</template>

<script setup lang="ts">
import SharedGenerateAnswerKey from '#layers/shared/app/pages/cbt/generate-answer-key.vue'

definePageMeta({
  roles: ['super_admin', 'test_centre_admin'],
})
</script>
