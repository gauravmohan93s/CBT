import { DEFAULT_ROLE, normalizeUserRole, type UserRole } from '#layers/shared/shared/roles'

export default () => {
  const user = useSupabaseUser()
  const devRoleOverride = useDevRoleOverride()
  const profileRole = useProfileRole()

  return computed<UserRole | null>(() => {
    if (import.meta.client && import.meta.dev && devRoleOverride.value) {
      return devRoleOverride.value
    }

    if (profileRole.role.value) return profileRole.role.value

    const metadataRole = normalizeUserRole(user.value?.user_metadata?.role)
    const appRole = normalizeUserRole(user.value?.app_metadata?.role)

    if (metadataRole) return metadataRole
    if (appRole) return appRole
    if (user.value && !profileRole.loaded.value) return null
    if (user.value) return DEFAULT_ROLE

    return null
  })
}
