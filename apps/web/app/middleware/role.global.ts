import { DEFAULT_ROLE, getDashboardPath, type UserRole } from '#layers/shared/shared/roles'

export default defineNuxtRouteMiddleware((to) => {
  const requiredRoles = to.meta.roles as UserRole[] | undefined
  if (!requiredRoles || requiredRoles.length === 0) return

  const user = useSupabaseUser()
  const role = useUserRole()

  if (!user.value || !role.value) return

  if (!requiredRoles.includes(role.value)) {
    return navigateTo(getDashboardPath(role.value ?? DEFAULT_ROLE))
  }
})
