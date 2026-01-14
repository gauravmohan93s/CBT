<template>
  <div class="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-background px-4">
    <div class="w-full max-w-md space-y-8">
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-bold tracking-tight text-foreground">
          Sign in to MockCBT
        </h2>
        <p class="mt-2 text-sm text-muted-foreground">
          Or
          <a href="#" class="font-medium text-primary hover:text-primary/80">
            start your free trial today
          </a>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              v-model="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="relative block w-full rounded-t-md border-0 py-1.5 text-foreground ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3 bg-card"
              placeholder="Email address"
            >
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="relative block w-full rounded-b-md border-0 py-1.5 text-foreground ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3 bg-card"
              placeholder="Password"
            >
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50"
          >
            <span v-if="loading">Signing in...</span>
            <span v-else>Sign in</span>
          </button>
        </div>
        
        <div v-if="errorMsg" class="text-destructive text-sm text-center">
          {{ errorMsg }}
        </div>
        <div v-if="successMsg" class="text-success text-sm text-center">
          {{ successMsg }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()
import { DEFAULT_ROLE, getDashboardPath } from '#layers/shared/shared/roles'

const router = useRouter()
const role = useUserRole()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

watchEffect(() => {
  if (user.value) {
    router.push(getDashboardPath(role.value ?? DEFAULT_ROLE))
  }
})

const handleLogin = async () => {
  loading.value = true
  errorMsg.value = ''
  successMsg.value = ''
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    if (error) throw error
    if (!data.session) {
      throw new Error('Login succeeded but no session was created. Check Supabase auth settings.')
    }
    successMsg.value = 'Signed in successfully. Redirecting...'
    await router.push('/dashboard')

  } catch (error: any) {
    errorMsg.value = error.message
  } finally {
    loading.value = false
  }
}
</script>
