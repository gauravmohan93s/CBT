<template>
  <div class="min-h-[calc(100vh-4rem)] bg-[radial-gradient(circle_at_top,_#ff9f1c_0%,_transparent_45%),linear-gradient(180deg,_#f7f9fc_0%,_#eef3fb_100%)]">
    <section class="mx-auto w-full max-w-5xl px-6 py-10">
      <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p class="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Student
          </p>
          <h1 class="mt-2 text-3xl font-bold text-foreground">
            Your Tests & Progress
          </h1>
          <p class="mt-2 text-muted-foreground">
            Jump into your assigned tests and track your scores.
          </p>
        </div>
        <BaseButton
          class="bg-primary text-primary-foreground hover:bg-primary/90"
          label="Start Next Test"
          icon-name="material-symbols:play-circle-outline"
          :disabled="availableExams.length === 0"
          @click="startNextTest"
        />
      </div>

      <div class="mt-8 grid gap-4 md:grid-cols-3">
        <div class="rounded-xl border bg-card p-5 shadow-sm">
          <p class="text-sm text-muted-foreground">
            Available Tests
          </p>
          <p class="mt-3 text-3xl font-semibold text-foreground">
            {{ stats.assigned }}
          </p>
          <p class="mt-2 text-xs text-muted-foreground">
            Ready to start
          </p>
        </div>
        <div class="rounded-xl border bg-card p-5 shadow-sm">
          <p class="text-sm text-muted-foreground">
            Average Score
          </p>
          <p class="mt-3 text-3xl font-semibold text-foreground">
            {{ stats.avgScore }}%
          </p>
          <p class="mt-2 text-xs text-muted-foreground">
            From all past attempts
          </p>
        </div>
        <div class="rounded-xl border bg-card p-5 shadow-sm">
          <p class="text-sm text-muted-foreground">
            Tests Completed
          </p>
          <p class="mt-3 text-3xl font-semibold text-foreground">
            {{ stats.streak }}
          </p>
          <p class="mt-2 text-xs text-muted-foreground">
            Great progress!
          </p>
        </div>
      </div>

      <div class="mt-8 grid gap-6 lg:grid-cols-2">
        <div class="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 class="text-lg font-semibold text-foreground">
            Available Tests
          </h2>
          <div
            v-if="loading"
            class="mt-4 flex justify-center py-4"
          >
            <Icon
              name="line-md:loading-twotone-loop"
              class="text-2xl text-primary"
            />
          </div>
          <div
            v-else
            class="mt-4 space-y-3 text-sm text-muted-foreground"
          >
            <div
              v-for="exam in availableExams"
              :key="exam.id"
              class="flex items-center justify-between rounded-lg border border-dashed p-3 hover:border-primary hover:text-foreground transition-colors"
            >
              <div>
                <p class="font-semibold">
                  {{ exam.title }}
                </p>
                <p class="text-xs opacity-70">
                  {{ exam.description || 'No description' }}
                </p>
              </div>
              <BaseButton
                size="sm"
                label="Take Test"
                icon-name="material-symbols:play-arrow"
                @click="startExam(exam.id)"
              />
            </div>
            <div
              v-if="availableExams.length === 0"
              class="text-center py-4"
            >
              No tests available at the moment.
            </div>
          </div>
        </div>
        <div class="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 class="text-lg font-semibold text-foreground">
            Performance Trend
          </h2>
          <div class="mt-4 h-[250px] w-full">
            <ClientOnly>
              <VChart
                v-if="chartOption"
                :option="chartOption"
                autoresize
              />
              <div
                v-else-if="!loading"
                class="h-full flex items-center justify-center text-muted-foreground text-sm border-2 border-dashed rounded-lg"
              >
                Complete at least two tests to see your trend.
              </div>
            </ClientOnly>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const availableExams = ref<any[]>([])
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pastResults = ref<any[]>([])
const loading = ref(true)

const stats = reactive({
  assigned: 0,
  avgScore: 0,
  streak: 0,
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const chartOption = ref<any>(null)

onMounted(async () => {
  if (!user.value) return

  try {
    // 1. Find Org membership
    const { data: memberData } = await supabase
      .from('organization_members')
      .select('organization_id')
      .eq('user_id', user.value.id)
      .single()

    if (memberData) {
      // 2. Fetch Exams
      const { data: examsData } = await supabase
        .from('exams')
        .select('*')
        .eq('organization_id', memberData.organization_id)
        .eq('status', 'published')
        .order('created_at', { ascending: false })

      if (examsData) {
        availableExams.value = examsData
        stats.assigned = examsData.length
      }

      // 3. Fetch Past Results
      const { data: resultsData } = await supabase
        .from('results')
        .select('id, percentage, submitted_at, total_score, exams(title)')
        .eq('student_id', user.value.id)
        .order('submitted_at', { ascending: true })

      if (resultsData) {
        pastResults.value = resultsData

        if (resultsData.length > 0) {
          stats.avgScore = Math.round(resultsData.reduce((acc, r) => acc + (r.percentage || 0), 0) / resultsData.length)
          stats.streak = resultsData.length // Simplified streak logic

          // Prepare Chart
          chartOption.value = {
            xAxis: {
              type: 'category',
              data: resultsData.map(r => new Date(r.submitted_at).toLocaleDateString()),
              show: resultsData.length > 1,
            },
            yAxis: {
              type: 'value',
              max: 100,
              name: '%',
            },
            tooltip: {
              trigger: 'axis',
            },
            series: [
              {
                data: resultsData.map(r => r.percentage),
                type: 'line',
                smooth: true,
                color: '#2D7FF9',
                areaStyle: {
                  color: 'rgba(45, 127, 249, 0.1)',
                },
              },
            ],
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true,
            },
          }
        }
      }
    }
  }
  catch (e) {
    console.error('Failed to fetch student dashboard data:', e)
  }
  finally {
    loading.value = false
  }
})

const startExam = (examId: string) => {
  navigateTo(`/cbt/interface?examId=${examId}`)
}

const startNextTest = () => {
  const nextExam = availableExams.value[0]
  if (!nextExam) return
  startExam(nextExam.id)
}

definePageMeta({
  roles: ['student'],
})
</script>
