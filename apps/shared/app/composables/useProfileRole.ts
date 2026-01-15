import { normalizeUserRole, type UserRole } from '#layers/shared/shared/roles'

// Global state outside the composable to act as a singleton
export default () => {
  const user = useSupabaseUser()
  const session = useSupabaseSession()
  const supabase = useSupabaseClient()
  
  // Shared state across all instances of this composable
  const profileRole = useState<UserRole | null>('profile-role', () => null)
  const profileRoleLoaded = useState<boolean>('profile-role-loaded', () => false)
  const isFetching = useState<boolean>('profile-role-fetching', () => false)

  const userId = computed(() => user.value?.id || session.value?.user?.id)

  watch(userId, async (newId, oldId) => {
    
    if (newId === oldId && profileRoleLoaded.value) return
    
    // If we have a user ID...
    if (newId) {
      if (isFetching.value) return 

      isFetching.value = true
      profileRoleLoaded.value = false
      profileRole.value = null

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', newId)
          .maybeSingle()

        if (!error && data) {
          profileRole.value = normalizeUserRole(data.role)
        }
      } catch (e) {
        console.error('Error fetching profile role:', e)
      } finally {
        profileRoleLoaded.value = true
        isFetching.value = false
      }
    } else {
      // No user, so we are "loaded" (nothing to load)
      profileRoleLoaded.value = true
      profileRole.value = null
    }
  }, { immediate: true })

  return {
    role: computed(() => profileRole.value),
    loaded: computed(() => profileRoleLoaded.value),
  }
}
