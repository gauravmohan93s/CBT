import { normalizeUserRole, type UserRole } from '#layers/shared/shared/roles'

export default () => {
  const user = useSupabaseUser()
  const supabase = useSupabaseClient()
  const profileRole = useState<UserRole | null>('profile-role', () => null)
  const profileRoleLoaded = useState<boolean>('profile-role-loaded', () => false)

  watch(() => user.value?.id, async (id) => {
    profileRoleLoaded.value = false
    profileRole.value = null

    if (!id) {
      profileRoleLoaded.value = true
      return
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', id)
      .maybeSingle()

    if (!error) {
      profileRole.value = normalizeUserRole(data?.role)
    }

    profileRoleLoaded.value = true
  }, { immediate: true })

  return {
    role: computed(() => profileRole.value),
    loaded: computed(() => profileRoleLoaded.value),
  }
}
