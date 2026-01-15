import { DEFAULT_ROLE, normalizeUserRole, type UserRole } from '#layers/shared/shared/roles'

export default () => {
  const user = useSupabaseUser()
  const session = useSupabaseSession()
  const devRoleOverride = useDevRoleOverride()
  const profileRole = useProfileRole()
  
  return computed<UserRole | null>(() => {
    // 0. Dev Override
    if (import.meta.client && import.meta.dev && devRoleOverride.value) {
      return devRoleOverride.value
    }

    // 1. Prefer Profile Role (DB Source of Truth)
    if (profileRole.role.value) return profileRole.role.value

    // Determine the effective user object (User ref might be delayed, Session is usually faster)
    const effectiveUser = user.value || session.value?.user

    // 2. Fallback to Metadata (Fast, but might be stale)
    const metadataRole = normalizeUserRole(effectiveUser?.user_metadata?.role)
    const appRole = normalizeUserRole(effectiveUser?.app_metadata?.role)

    if (metadataRole) return metadataRole
    if (appRole) return appRole

    // 3. If we are still loading the profile, wait (return null)
    if (effectiveUser && !profileRole.loaded.value) return null

    // 4. Default Fallback
    if (effectiveUser) return DEFAULT_ROLE

    return null
  })
}
