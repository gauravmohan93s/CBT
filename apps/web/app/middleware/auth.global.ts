export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()
  const session = useSupabaseSession()

  if (to.meta.public) return
  if (user.value || session.value?.user) return

  return navigateTo('/login')
})
