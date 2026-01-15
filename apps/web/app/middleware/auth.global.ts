export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()
  const session = useSupabaseSession()

  const publicPaths = ['/login', '/signup', '/join', '/share/result']
  const normalizedPath = to.path.startsWith('/') ? to.path : `/${to.path}`
  if (
    to.meta.public
    || publicPaths.some(
      (path) => normalizedPath === path || normalizedPath.startsWith(`${path}/`),
    )
  ) {
    return
  }

  if (user.value || session.value?.user) return

  return navigateTo('/login')
})
