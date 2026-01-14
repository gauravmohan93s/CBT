<template>
  <SharedPdfCropper />
</template>

<script setup lang="ts">
import SharedPdfCropper from '#layers/shared/app/pages/pdf-cropper.vue'

definePageMeta({
  roles: ['super_admin', 'test_centre_admin'],
})
</script>
