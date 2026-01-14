<template>
  <div class="min-h-[calc(100vh-4rem)] bg-[radial-gradient(circle_at_top,_#20c997_0%,_transparent_45%),linear-gradient(180deg,_#f7f9fc_0%,_#eef3fb_100%)]">
    <section class="mx-auto w-full max-w-6xl px-6 py-10">
      <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p class="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {{ orgName }}
          </p>
          <h1 class="mt-2 text-3xl font-bold text-foreground">
            Manage Tests & Students
          </h1>
          <p class="mt-2 text-muted-foreground">
            Create exams, schedule sessions, and track student performance.
          </p>
        </div>
        <div class="flex items-center gap-3">
          <BaseButton
            class="bg-primary text-primary-foreground hover:bg-primary/90"
            label="Create Test"
            icon-name="material-symbols:playlist-add"
          />
          <BaseButton
            variant="outline"
            label="Invite Students"
            icon-name="material-symbols:group-add"
            @click="inviteState.showDialog = true"
          />
        </div>
      </div>

      <!-- Invite Dialog -->
      <UiDialog v-model:open="inviteState.showDialog">
        <UiDialogContent>
          <UiDialogHeader>
            <UiDialogTitle>Invite Students to {{ orgName }}</UiDialogTitle>
          </UiDialogHeader>
          <div class="py-6 space-y-4">
            <p class="text-sm text-muted-foreground">
              Generate a unique registration link for your students. Anyone with this link can join your institute as a student.
            </p>

            <div
              v-if="inviteState.link"
              class="flex items-center gap-2 p-3 bg-secondary rounded-lg border"
            >
              <code class="text-xs flex-1 truncate">{{ inviteState.link }}</code>
              <BaseButton
                size="sm"
                icon-name="material-symbols:content-copy"
                @click="copyInviteLink"
              />
            </div>

            <div class="flex justify-center">
              <BaseButton
                :label="inviteState.link ? 'Generate New Link' : 'Generate Invite Link'"
                :loading="inviteState.loading"
                @click="generateInviteLink"
              />
            </div>
          </div>
        </UiDialogContent>
      </UiDialog>

      <div class="mt-8 grid gap-4 md:grid-cols-3">
        <div class="rounded-xl border bg-card p-5 shadow-sm">
          <p class="text-sm text-muted-foreground">
            Scheduled Tests
          </p>
          <p class="mt-3 text-3xl font-semibold text-foreground">
            12
          </p>
          <p class="mt-2 text-xs text-muted-foreground">
            Next session in 3 hours
          </p>
        </div>
        <div class="rounded-xl border bg-card p-5 shadow-sm">
          <p class="text-sm text-muted-foreground">
            Active Students
          </p>
          <p class="mt-3 text-3xl font-semibold text-foreground">
            420
          </p>
          <p class="mt-2 text-xs text-muted-foreground">
            96% attendance this week
          </p>
        </div>
        <div class="rounded-xl border bg-card p-5 shadow-sm">
          <p class="text-sm text-muted-foreground">
            Pending Evaluations
          </p>
          <p class="mt-3 text-3xl font-semibold text-foreground">
            7
          </p>
          <p class="mt-2 text-xs text-muted-foreground">
            Results due today
          </p>
        </div>
      </div>

      <div class="mt-8 grid gap-6 lg:grid-cols-2">
        <div class="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 class="text-lg font-semibold text-foreground">
            Quick Actions
          </h2>
          <div class="mt-4 grid gap-3">
            <button class="flex items-center justify-between rounded-lg border border-dashed p-3 text-sm text-muted-foreground transition hover:border-primary hover:text-foreground">
              Upload PDF and generate CBT package
              <Icon name="material-symbols:arrow-right-alt" />
            </button>
            <button class="flex items-center justify-between rounded-lg border border-dashed p-3 text-sm text-muted-foreground transition hover:border-primary hover:text-foreground">
              Publish results for completed tests
              <Icon name="material-symbols:arrow-right-alt" />
            </button>
            <NuxtLink
              to="/dashboard/branding"
              class="flex items-center justify-between rounded-lg border border-dashed p-3 text-sm text-muted-foreground transition hover:border-primary hover:text-foreground"
            >
              Configure center branding
              <Icon name="material-symbols:arrow-right-alt" />
            </NuxtLink>
          </div>
        </div>
        <div class="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 class="text-lg font-semibold text-foreground">
            Published Tests
          </h2>
          <div class="mt-4 space-y-3">
            <div
              v-for="exam in exams"
              :key="exam.id"
              class="flex items-center justify-between rounded-lg border bg-background p-3"
            >
              <div>
                <p class="font-medium text-foreground">
                  {{ exam.title }}
                </p>
                <p class="text-xs text-muted-foreground">
                  {{ new Date(exam.created_at).toLocaleDateString() }}
                </p>
              </div>
              <BaseButton
                size="sm"
                variant="ghost"
                icon-name="material-symbols:content-copy"
                title="Copy Exam ID"
                @click="copyLink(exam.id)"
              />
            </div>
            <div
              v-if="exams.length === 0"
              class="text-sm text-muted-foreground italic"
            >
              No exams published yet. Create one to get started.
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const orgName = ref('Loading...')
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const exams = ref<any[]>([])

onMounted(async () => {
  if (!user.value) return

  // Fetch Org Name
  const { data } = await supabase
    .from('organization_members')
    .select('organizations(name, id)')
    .eq('user_id', user.value.id)
    .single()

  if (data?.organizations) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    orgName.value = (data.organizations as any).name
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const orgId = (data.organizations as any).id

    // Fetch Exams
    const { data: examsData } = await supabase
      .from('exams')
      .select('id, title, created_at')
      .eq('organization_id', orgId)
      .eq('status', 'published')
      .order('created_at', { ascending: false })

    if (examsData) exams.value = examsData
  }
  else {
    orgName.value = 'My Organization'
  }
})

const copyLink = (examId: string) => {
  // Generate student link (e.g., /cbt/interface?examId=...)
  // For now just copy ID
  navigator.clipboard.writeText(examId)
  alert('Exam ID copied: ' + examId)
}

const inviteState = reactive({
  showDialog: false,
  loading: false,
  link: '',
  orgId: null as string | null,
})

const generateInviteLink = async () => {
  inviteState.loading = true
  try {
    // 1. Get Org ID if not already stored
    if (!inviteState.orgId && user.value) {
      const { data } = await supabase
        .from('organization_members')
        .select('organization_id')
        .eq('user_id', user.value.id)
        .single()
      inviteState.orgId = data?.organization_id || null
    }

    if (!inviteState.orgId) throw new Error('Organization not found')

    // 2. Create Invite in DB
    const { data, error } = await supabase
      .from('organization_invites')
      .insert({
        organization_id: inviteState.orgId,
        role: 'student',
      })
      .select('token')
      .single()

    if (error) throw error

    inviteState.link = `${window.location.origin}/join?token=${data.token}`
  }
  catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e)

    alert('Failed to generate invite: ' + message)
  }
  finally {
    inviteState.loading = false
  }
}

const copyInviteLink = () => {
  navigator.clipboard.writeText(inviteState.link)
  alert('Invite link copied to clipboard!')
}

definePageMeta({
  roles: ['test_centre_admin'],
})
</script>
