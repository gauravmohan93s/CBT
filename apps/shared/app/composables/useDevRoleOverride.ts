import { USER_ROLES, type UserRole } from '#layers/shared/shared/roles'

const STORAGE_KEY = 'mockcbt-dev-role-override'

const normalizeRole = (role: string | null | undefined): UserRole | '' => {
  if (!role) return ''
  return USER_ROLES.includes(role as UserRole) ? (role as UserRole) : ''
}

export default () => {
  if (import.meta.server) {
    return readonly(ref('' as UserRole | ''))
  }

  const stored = useLocalStorage<UserRole | ''>(STORAGE_KEY, '')
  const normalized = computed<UserRole | ''>({
    get: () => normalizeRole(stored.value),
    set: (val) => stored.value = normalizeRole(val),
  })

  return normalized
}
