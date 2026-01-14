<template>
  <div class="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-background px-4">
    <div class="w-full max-w-md space-y-8">
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-bold tracking-tight text-foreground">
          Create your MockCBT Account
        </h2>
        <p class="mt-2 text-sm text-muted-foreground">
          Already have an account?
          <NuxtLink
            to="/login"
            class="font-medium text-primary hover:text-primary/80"
          >
            Sign in
          </NuxtLink>
        </p>
      </div>
      <form
        class="mt-8 space-y-6"
        @submit.prevent="handleSignup"
      >
        <div class="space-y-4 rounded-md shadow-sm">
          <div>
            <label
              for="full-name"
              class="sr-only"
            >Full Name</label>
            <input
              id="full-name"
              v-model="fullName"
              name="full-name"
              type="text"
              autocomplete="name"
              required
              class="relative block w-full rounded-md border-0 py-1.5 text-foreground ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3 bg-card"
              placeholder="Full Name"
            >
          </div>
          <div>
            <label
              for="org-name"
              class="sr-only"
            >Organization Name</label>
            <input
              id="org-name"
              v-model="orgName"
              name="org-name"
              type="text"
              required
              class="relative block w-full rounded-md border-0 py-1.5 text-foreground ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3 bg-card"
              placeholder="Organization Name (e.g. Acme Tuition)"
            >
          </div>
          <div>
            <label
              for="email-address"
              class="sr-only"
            >Email address</label>
            <input
              id="email-address"
              v-model="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="relative block w-full rounded-md border-0 py-1.5 text-foreground ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3 bg-card"
              placeholder="Email address"
            >
          </div>
          <div>
            <label
              for="password"
              class="sr-only"
            >Password</label>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              autocomplete="new-password"
              required
              class="relative block w-full rounded-md border-0 py-1.5 text-foreground ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3 bg-card"
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
            <span v-if="loading">Creating account...</span>
            <span v-else>Start Free Trial</span>
          </button>
        </div>

        <div
          v-if="errorMsg"
          class="text-destructive text-sm text-center"
        >
          {{ errorMsg }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const router = useRouter()

const fullName = ref('')
const orgName = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

definePageMeta({
  public: true,
  layout: 'default', // Ensure we use the shared layout
})

const handleSignup = async () => {
  loading.value = true
  errorMsg.value = ''

  try {
    // 1. Sign Up
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          full_name: fullName.value,
          role: 'test_centre_admin', // Default role for new signups
        },
      },
    })

    if (authError) throw authError
    if (!authData.user) throw new Error('Signup failed.')

    // 2. Create Organization
    // Note: This relies on an RLS policy allowing authenticated users to insert into 'organizations'
    // If this fails, we need to add the policy or use an RPC.

    // We wait for the session to be established?
    // Usually signUp returns session if auto-confirm is on.

    if (authData.session) {
      const { data: orgData, error: orgError } = await supabase
        .from('organizations')
        .insert({
          name: orgName.value,
          slug: orgName.value.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Math.floor(Math.random() * 10000),
          subscription_plan: 'free',
        })
        .select()
        .single()

      if (orgError) {
        console.error('Org creation failed:', orgError)
        // Don't block signup success, but warn user?
        // Or retry?
      }
      else if (orgData) {
        // 3. Add user as owner
        // Note: 'organization_members' insert policy is also needed
        const { error: memberError } = await supabase
          .from('organization_members')
          .insert({
            organization_id: orgData.id,
            user_id: authData.user.id,
            role: 'owner',
          })

        if (memberError) console.error('Member addition failed:', memberError)
      }

      router.push('/dashboard/centre-admin')
    }
    else {
      // Email confirmation case
      errorMsg.value = 'Please check your email to confirm your account.'
    }
  }
  catch (error: unknown) {
    errorMsg.value = error instanceof Error ? error.message : String(error)
  }
  finally {
    loading.value = false
  }
}
</script>
