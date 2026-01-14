<template>
  <div class="min-h-screen bg-slate-50 p-4 md:p-8">
    <div class="max-w-4xl mx-auto space-y-6">
      <!-- Loading State -->
      <div
        v-if="loading"
        class="flex flex-col items-center justify-center py-20"
      >
        <Icon
          name="line-md:loading-twotone-loop"
          class="text-5xl text-primary"
        />
        <p class="mt-4 text-muted-foreground">
          Loading performance report...
        </p>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="bg-card border-destructive/50 border rounded-xl p-8 text-center"
      >
        <Icon
          name="material-symbols:error-outline"
          class="text-5xl text-destructive mx-auto"
        />
        <h1 class="mt-4 text-xl font-bold">
          Report Not Found
        </h1>
        <p class="text-muted-foreground">
          The link might be expired or incorrect.
        </p>
        <NuxtLink
          to="/"
          class="mt-6 inline-block text-primary underline"
        >Go to MockCBT Home</NuxtLink>
      </div>

      <!-- Report Content -->
      <template v-else-if="result">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold">
              MockCBT Performance Report
            </h1>
            <p class="text-muted-foreground">
              {{ result.exams.title }}
            </p>
          </div>
          <div class="text-right">
            <div class="text-3xl font-black text-primary">
              {{ result.percentage }}%
            </div>
            <p class="text-xs uppercase tracking-widest font-bold opacity-50">
              Overall Score
            </p>
          </div>
        </div>

        <div class="grid gap-4 md:grid-cols-3">
          <div class="bg-card p-6 rounded-xl border shadow-sm text-center">
            <p class="text-sm text-muted-foreground">
              Marks Obtained
            </p>
            <p class="text-2xl font-bold">
              {{ result.total_score }} / {{ result.max_score }}
            </p>
          </div>
          <div class="bg-card p-6 rounded-xl border shadow-sm text-center">
            <p class="text-sm text-muted-foreground">
              Attempt Date
            </p>
            <p class="text-2xl font-bold">
              {{ new Date(result.submitted_at).toLocaleDateString() }}
            </p>
          </div>
          <div class="bg-card p-6 rounded-xl border shadow-sm text-center">
            <p class="text-sm text-muted-foreground">
              Status
            </p>
            <p
              class="text-2xl font-bold"
              :class="result.percentage >= 35 ? 'text-success' : 'text-destructive'"
            >
              {{ result.percentage >= 35 ? 'PASSED' : 'RE-ATTEMPT' }}
            </p>
          </div>
        </div>

        <!-- Section breakdown table -->
        <div class="bg-card rounded-xl border shadow-sm overflow-hidden">
          <div class="p-4 border-b bg-slate-50 font-bold">
            Section-wise Analysis
          </div>
          <table class="w-full text-sm">
            <thead>
              <tr class="text-left bg-slate-50/50">
                <th class="p-4">
                  Section
                </th>
                <th class="p-4">
                  Questions
                </th>
                <th class="p-4">
                  Answered
                </th>
                <th class="p-4">
                  Accuracy
                </th>
              </tr>
            </thead>
            <tbody class="divide-y">
              <tr
                v-for="s in result.data.testSummary"
                :key="s.section"
              >
                <td class="p-4 font-medium">
                  {{ s.section }}
                </td>
                <td class="p-4">
                  {{ s.totalQuestions }}
                </td>
                <td class="p-4">
                  {{ s.answered }}
                </td>
                <td class="p-4">
                  <div class="w-full bg-slate-100 h-2 rounded-full mt-1">
                    <div
                      class="bg-primary h-full rounded-full"
                      :style="{ width: (s.answered / s.totalQuestions * 100) + '%' }"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="text-center pt-8">
          <p class="text-xs text-muted-foreground">
            This report was generated automatically by MockCBT SaaS.
            Verification ID: {{ result.id }}
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const supabase = useSupabaseClient()

const loading = ref(true)
const error = ref(false)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const result = ref<any>(null)

definePageMeta({
  public: true,
  layout: false, // Minimal view for sharing
})

onMounted(async () => {
  const resultId = route.query.id as string
  if (!resultId) {
    error.value = true
    loading.value = false
    return
  }

  try {
    const { data, error: fetchError } = await supabase
      .from('results')
      .select('*, exams(title)')
      .eq('id', resultId)
      .single()

    if (fetchError || !data) throw new Error('Result not found')

    result.value = data
  }
  catch {
    error.value = true
  }
  finally {
    loading.value = false
  }
})
</script>
