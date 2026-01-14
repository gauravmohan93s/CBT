export const USER_ROLES = [
  'super_admin',
  'test_centre_admin',
  'student',
] as const

export type UserRole = typeof USER_ROLES[number]

export const DEFAULT_ROLE: UserRole = 'student'

export const ROLE_DASHBOARD_PATHS: Record<UserRole, string> = {
  super_admin: '/dashboard/super-admin',
  test_centre_admin: '/dashboard/centre-admin',
  student: '/dashboard/student',
}

export const getDashboardPath = (role: UserRole) => ROLE_DASHBOARD_PATHS[role]

export const normalizeUserRole = (role: string | null | undefined): UserRole | null => {
  if (!role) return null
  return USER_ROLES.includes(role as UserRole) ? (role as UserRole) : null
}
