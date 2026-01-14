<script setup lang="ts">
import { DEFAULT_ROLE, getDashboardPath } from '#layers/shared/shared/roles'

definePageMeta({
  roles: ['super_admin', 'test_centre_admin', 'student'],
})

const role = useUserRole()

watchEffect(() => {
  if (role.value) {
    navigateTo(getDashboardPath(role.value))
  }
  else {
    navigateTo(getDashboardPath(DEFAULT_ROLE))
  }
})
</script>
