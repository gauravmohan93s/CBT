<template>
  <div class="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-background px-4">
    <div class="w-full max-w-md space-y-8">
      <!-- Invalid Link State -->
      <div
        v-if="inviteError"
        class="text-center space-y-4"
      >
        <Icon
          name="material-symbols:link-off"
          class="text-5xl text-destructive mx-auto"
        />
        <h2 class="text-2xl font-bold">
          Invalid or Expired Invite
        </h2>
        <p class="text-muted-foreground">
          Please ask your institute administrator for a new invite link.
        </p>
        <NuxtLink
          to="/"
          class="inline-block text-primary underline"
        >Go Home</NuxtLink>
      </div>

      <!-- Registration Form -->
      <template v-else>
        <div class="text-center">
          <h2 class="mt-6 text-3xl font-bold tracking-tight text-foreground">
            Join {{ org?.name || 'Institute' }}
          </h2>
          <p class="mt-2 text-sm text-muted-foreground">
            Create your student account to get started.
          </p>
        </div>

        <form
          class="mt-8 space-y-6"
          @submit.prevent="handleJoin"
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
                type="text"
                required
                class="relative block w-full rounded-md border-0 py-1.5 text-foreground ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3 bg-card"
                placeholder="Full Name"
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
                type="email"
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
                type="password"
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
              <span v-if="loading">Joining...</span>
              <span v-else>Register & Join</span>
            </button>
          </div>

          <div
            v-if="errorMsg"
            class="text-destructive text-sm text-center"
          >
            {{ errorMsg }}
          </div>
        </form>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const supabase = useSupabaseClient()

const loading = ref(false)
const inviteError = ref(false)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const org = ref<any>(null)
const token = route.query.token as string

const fullName = ref('')
const email = ref('')
const password = ref('')
const errorMsg = ref('')

definePageMeta({
  public: true,
  layout: 'default',
})

onMounted(async () => {
  if (!token) {
    inviteError.value = true
    return
  }

  // Verify Invite Token
  const { data, error } = await supabase
    .from('organization_invites')
    .select('*, organizations(name)')
    .eq('token', token)
    .single()

  if (error || !data) {
    inviteError.value = true
  }
  else {
    org.value = data.organizations
  }
})

const handleJoin = async () => {
  loading.value = true
  errorMsg.value = ''

  try {
    // 1. Signup Student
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          full_name: fullName.value,
          role: 'student',
        },
      },
    })

    if (authError) throw authError
    if (!authData.user) throw new Error('Registration failed.')

    // 2. Add to organization
    // Fetch org_id from invite table using token again to be sure
    const { data: inviteData } = await supabase
      .from('organization_invites')
      .select('organization_id')
      .eq('token', token)
      .single()

    if (inviteData && authData.session) {
      const { error: memberError } = await supabase
        .from('organization_members')
        .insert({
          organization_id: inviteData.organization_id,
          user_id: authData.user.id,
          role: 'member', // Use 'member' enum from org_members table
        })

      if (memberError) console.error('Member joining failed:', memberError)

      // Update invite uses count (optional but good practice)
      await supabase.rpc('increment_invite_uses', { invite_token: token })

      router.push('/dashboard/student')
    }
    else {
      errorMsg.value = 'Please check your email to verify your account.'
    }
  }
  catch (e: unknown) {
    errorMsg.value = e instanceof Error ? e.message : String(e)
  }
  finally {
    loading.value = false
  }
}
</script>
