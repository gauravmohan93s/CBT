<template>
  <header
    v-show="!isFullscreen"
    class="border"
  >
    <nav>
      <div class="flex w-full h-14 items-center">
        <span class="font-bold text-2xl sm:text-[1.76rem] md:text-[1.9rem] py-1.5 px-2">
          <NuxtLink
            to="/"
            class="text-primary"
          >
            MockCBT
            <span class="text-muted-foreground text-sm sm:text-[.9rem] md:text-base">v{{ appVersion }}</span>
          </NuxtLink>
        </span>
        <div class="hidden min-[73.5rem]:flex items-center mx-auto">
          <template
            v-for="item in visibleNavItems"
            :key="item.title"
          >
            <NuxtLink
              :to="item.href"
              class="outline-hidden rounded-sm shadow-xs transition-all
              focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:border"
            >
              <template #default="{ isActive }">
                <div
                  class="flex gap-1.5 justify-center"
                  :class="[navigationMenuTriggerStyle(), 'h-full', isActive ? 'text-primary' : '']"
                >
                  <Icon
                    :name="item.icon"
                    size="1.3rem"
                  />
                  <span class="text-lg font-bold text-nowrap">
                    {{ item.title }}
                  </span>
                </div>
              </template>
            </NuxtLink>
          </template>
        </div>
        
        <div class="flex gap-2.5 sm:gap-3 xl:gap-4 items-center h-14 ml-auto min-[43rem]:ml-2 pr-4 xl:pr-8">
          
          <template v-if="user">
             <BaseButton
              variant="outline"
              size="sm"
              class="gap-2"
              @click="handleLogout"
            >
              <Icon name="mdi:logout" size="1.2rem" />
              Logout
            </BaseButton>
          </template>
          <template v-else>
            <NuxtLink to="/login">
              <BaseButton
                variant="default"
                size="sm"
                class="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Login
              </BaseButton>
            </NuxtLink>
          </template>

          <BaseButton
            variant="outline"
            size="icon"
            title="Toggle Fullscreen"
            class="text-primary hover:text-primary/90"
            icon-name="material-symbols:fullscreen"
            icon-size="1.5rem"
            @click="toggleFullscreen()"
          />
          <UiSheet>
            <UiSheetTrigger as-child>
              <div class="contents">
                <BaseButton
                  variant="outline"
                  size="icon"
                  title="Menu"
                  class="min-[43rem]:hidden"
                  icon-name="material-symbols:menu-rounded"
                />
                <BaseButton
                  variant="outline"
                  size="icon"
                  title="Menu"
                  class="hidden min-[43rem]:flex"

                  icon-name="line-md:cog"
                />
              </div>
            </UiSheetTrigger>
            <UiSheetContent side="right">
              <UiSheetHeader class="p-3">
                <UiSheetTitle class="mx-auto text-xl pb-0">
                  <span class="hidden min-[43rem]:inline-block">Settings</span>
                  <span class="min-[43rem]:hidden">Pages & Settings</span>
                </UiSheetTitle>
              </UiSheetHeader>
              <UiScrollArea class="[&>div]:pb-5">
                <ul
                  class="grid grid-cols-1 gap-2 p-2 min-[43rem]:hidden"
                >
                  <li
                    v-for="contentItem in visibleNavItems"
                    :key="contentItem.title"
                  >
                    <UiSheetClose as-child>
                      <NuxtLink
                        v-slot="{ isActive, href, navigate }"
                        :to="contentItem.href"
                        custom
                      >
                        <UiNavigationMenuLink
                          :active="isActive"
                          :href="href"
                          :class="navigationMenuTriggerStyle()"
                          class="w-full"
                          @click="navigate"
                        >
                          <div
                            class="flex items-center gap-2.5 p-1"
                            :class="isActive ? 'text-primary' : ''"
                          >
                            <Icon
                              :name="contentItem.icon"
                              size="1.3rem"
                            />
                            <span class="text-lg font-bold text-nowrap">
                              {{ contentItem.title }}
                            </span>
                          </div>
                        </UiNavigationMenuLink>
                      </NuxtLink>
                    </UiSheetClose>
                  </li>
                </ul>
                
                <UiCard class="my-2 py-2 ml-1 mr-2 gap-2">
                  <UiCardHeader>
                    <UiCardTitle class="mx-auto text-lg">
                      Page Zoom Sizes (in %)
                    </UiCardTitle>
                  </UiCardHeader>
                  <UiCardContent class="grid grid-cols-2 gap-x-4 gap-y-3">
                    <div
                      v-for="(_, pageSizeKey) in appSettings.pages"
                      :key="pageSizeKey"
                      class="flex flex-col items-center gap-1 last:odd:col-span-2"
                    >
                      <UiLabel
                        class="text-sm"
                        :for="pageSizeKey + 'PageSize'"
                      >
                        {{ utilKeyToLabel(pageSizeKey) }}
                      </UiLabel>
                      <BaseInputNumber
                        :id="pageSizeKey + 'PageSize'"
                        v-model="appSettings.pages[pageSizeKey].size"
                        :min="50"
                        :max="250"
                        :step="5"
                        input-class="text-sm"
                      />
                    </div>
                  </UiCardContent>
                </UiCard>
                <UiCard class="py-2 ml-1 mr-2 gap-2">
                  <UiCardHeader>
                    <UiCardTitle class="mx-auto text-lg">
                      Site Theme
                    </UiCardTitle>
                  </UiCardHeader>
                  <UiCardContent class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <BaseButton
                      v-for="(themeColorStyle, themeName) in themeVariants"
                      :key="themeName"
                      variant="outline"
                      :label="themeName"
                      class="gap-3 w-fit"
                      @click="colorMode = themeName"
                    >
                      <template #icon>
                        <span
                          class="size-4"
                          :style="{
                            backgroundColor: themeColorStyle,
                          }"
                        />
                      </template>
                    </BaseButton>
                  </UiCardContent>
                </UiCard>
                <UiCard
                  v-if="showDevRoleSwitcher"
                  class="py-2 ml-1 mr-2 gap-2"
                >
                  <UiCardHeader>
                    <UiCardTitle class="mx-auto text-lg">
                      Dev Role Switcher
                    </UiCardTitle>
                  </UiCardHeader>
                  <UiCardContent class="grid gap-3">
                    <UiSelect
                      v-model="devRoleSelectValue"
                    >
                      <UiSelectTrigger class="w-full">
                        <UiSelectValue placeholder="Pick a role override" />
                      </UiSelectTrigger>
                      <UiSelectContent>
                        <UiSelectGroup>
                          <UiSelectItem value="__supabase__">
                            Use Supabase role
                          </UiSelectItem>
                          <UiSelectItem
                            v-for="roleOption in roleOptions"
                            :key="roleOption.value"
                            :value="roleOption.value"
                          >
                            {{ roleOption.label }}
                          </UiSelectItem>
                        </UiSelectGroup>
                      </UiSelectContent>
                    </UiSelect>
                    <BaseButton
                      variant="outline"
                      size="sm"
                      label="Clear Override"
                      icon-name="material-symbols:restart-alt"
                      @click="devRoleOverride = ''"
                    />
                  </UiCardContent>
                </UiCard>
              </UiScrollArea>
            </UiSheetContent>
          </UiSheet>
        </div>
      </div>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import { navigationMenuTriggerStyle } from '#layers/shared/app/components/ui/navigation-menu'
import { getDashboardPath, type UserRole } from '#layers/shared/shared/roles'
import { PopoverArrow, PopoverAnchor } from 'reka-ui'

const user = useSupabaseUser()
const role = useUserRole()
const supabase = useSupabaseClient()
const router = useRouter()

const handleLogout = async () => {
  await supabase.auth.signOut()
  router.push('/login')
}

const { isFullscreen, toggle: toggleFullscreen } = useFullscreen()

const themeVariants = {
  azure: '#2D7FF9',
  teal: '#20C997',
  violet: '#7C3AED',
}

const appSettings = useAppSettings()
const publicRuntimeConfig = useRuntimeConfig().public
const appVersion = publicRuntimeConfig.projectVersion
const devRoleOverride = useDevRoleOverride()
const showDevRoleSwitcher = import.meta.client && import.meta.dev
const devRoleSelectValue = computed({
  get: () => devRoleOverride.value || '__supabase__',
  set: (value: string) => {
    devRoleOverride.value = value === '__supabase__' ? '' : value
  },
})

const roleOptions = [
  { label: 'Super Admin', value: 'super_admin' },
  { label: 'Test Centre Admin', value: 'test_centre_admin' },
  { label: 'Student', value: 'student' },
]

const themeWriteableComputedRef = computed({
  get: () => appSettings.value.theme,
  set: val => appSettings.value.theme = val,
})

const colorMode = useColorMode<keyof typeof themeVariants>({
  attribute: 'data-theme-variant',
  modes: Object.fromEntries(Object.keys(themeVariants).map(v => [v, v])),
  storageRef: themeWriteableComputedRef,
  initialValue: 'azure',
})

type NavItem = {
  title: string
  href: string
  icon: string
}

const dashboardItem = computed<NavItem | null>(() => {
  if (!role.value) return null
  return {
    title: 'Dashboard',
    href: getDashboardPath(role.value as UserRole),
    icon: 'material-symbols:dashboard-rounded',
  }
})

const pdfCropperItem: NavItem = {
  title: 'PDF Cropper',
  href: '/pdf-cropper',
  icon: 'material-symbols:crop-rounded',
}

const testInterfaceItem: NavItem = {
  title: 'Test Interface',
  href: '/cbt/interface',
  icon: 'line-md:computer',
}

const resultsItem: NavItem = {
  title: 'Test Results',
  href: '/cbt/results',
  icon: 'material-symbols:bar-chart-4-bars-rounded',
}

const answerKeyItem: NavItem = {
  title: 'Generate Answer Key',
  href: '/cbt/generate-answer-key',
  icon: 'mdi:script-text-key-outline',
}

const visibleNavItems = computed<NavItem[]>(() => {
  if (!user.value || !role.value) return []

  const items: NavItem[] = []
  if (dashboardItem.value) items.push(dashboardItem.value)

  if (role.value === 'student') {
    items.push(testInterfaceItem, resultsItem)
    return items
  }

  if (role.value === 'test_centre_admin') {
    items.push(pdfCropperItem, testInterfaceItem, resultsItem, answerKeyItem)
    return items
  }

  items.push(pdfCropperItem, testInterfaceItem, resultsItem, answerKeyItem)
  return items
})

onMounted(() => {
  triggerRef(appSettings)
})
</script>
