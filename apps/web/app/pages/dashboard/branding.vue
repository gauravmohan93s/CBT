<template>
  <div class="min-h-screen bg-background p-8">
    <div class="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 class="text-3xl font-bold">
          Center Branding
        </h1>
        <p class="text-muted-foreground mt-2">
          Customize your portal's appearance. These settings apply to your staff and students.
        </p>
      </div>

      <UiCard class="p-6">
        <div class="space-y-6">
          <!-- Primary Color -->
          <div class="flex flex-col gap-2">
            <UiLabel for="primary-color">
              Primary Theme Color
            </UiLabel>
            <div class="flex items-center gap-4">
              <UiInput
                id="primary-color"
                v-model="color"
                type="text"
                class="w-32"
              />
              <BaseColorPicker v-model="color" />
              <div
                class="w-10 h-10 rounded-full border shadow-sm"
                :style="{ backgroundColor: color }"
              />
            </div>
            <p class="text-xs text-muted-foreground">
              This color will be used for buttons, links, and accents.
            </p>
          </div>

          <!-- Logo Placeholder (Logic for upload later) -->
          <div class="flex flex-col gap-2">
            <UiLabel>Center Logo</UiLabel>
            <div class="border-2 border-dashed rounded-lg p-8 text-center">
              <Icon
                name="material-symbols:image-outline"
                class="text-4xl text-muted-foreground mx-auto"
              />
              <p class="mt-2 text-sm text-muted-foreground">
                Upload your institute logo (PNG/SVG preferred)
              </p>
              <BaseButton
                variant="outline"
                size="sm"
                class="mt-4"
                label="Upload Logo"
                disabled
              />
            </div>
          </div>

          <div class="pt-4 flex justify-end">
            <BaseButton
              label="Save Changes"
              icon-name="material-symbols:save"
              :loading="saving"
              @click="saveBranding"
            />
          </div>
        </div>
      </UiCard>

      <!-- Preview Section -->
      <div class="space-y-4">
        <h2 class="text-lg font-semibold">
          Live Preview
        </h2>
        <div class="border rounded-xl p-6 bg-white space-y-4 shadow-sm">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded bg-slate-200" />
            <span class="font-bold">My Institute</span>
          </div>
          <div class="space-y-2">
            <div class="h-4 w-3/4 bg-slate-100 rounded" />
            <div class="h-4 w-1/2 bg-slate-100 rounded" />
          </div>
          <button
            class="px-4 py-2 rounded-md text-white text-sm font-medium"
            :style="{ backgroundColor: color }"
          >
            Sample Button
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { branding, applyBranding } = useBranding()
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const color = ref(branding.value.primary_color)
const saving = ref(false)

const saveBranding = async () => {
  saving.value = true
  try {
    if (!user.value) return

    // 1. Get Org ID
    const { data: memberData } = await supabase
      .from('organization_members')
      .select('organization_id')
      .eq('user_id', user.value.id)
      .single()

    if (memberData) {
      // 2. Update Org Branding
      const { error } = await supabase
        .from('organizations')
        .update({
          branding: {
            ...branding.value,
            primary_color: color.value,
          },
        })
        .eq('id', memberData.organization_id)

      if (error) throw error

      applyBranding({ primary_color: color.value })

      alert('Branding updated successfully!')
    }
  }
  catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e)

    alert('Error saving branding: ' + message)
  }
  finally {
    saving.value = false
  }
}

definePageMeta({
  roles: ['test_centre_admin'],
})
</script>
