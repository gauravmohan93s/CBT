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
            class="text-green-500"
          >
            MockCBT
            <span class="text-cyan-500 text-sm sm:text-[.9rem] md:text-base">v{{ appVersion }}</span>
          </NuxtLink>
        </span>
        <div class="hidden min-[73.5rem]:flex items-center mx-auto">
          <template
            v-for="item in [pdfCropperItem, ...cbtItems]"
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
                  :class="[navigationMenuTriggerStyle(), 'h-full', isActive ? 'text-green-400' : '']"
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
                class="bg-blue-600 hover:bg-blue-500 text-white"
              >
                Login
              </BaseButton>
            </NuxtLink>
          </template>

          <BaseButton
            variant="outline"
            size="icon"
            title="Toggle Fullscreen"
            class="text-green-500 hover:text-green-600"
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
                    v-for="contentItem in [pdfCropperItem, ...cbtItems]"
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
                            :class="isActive ? 'text-green-400' : ''"
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
import { UpdatesPage } from '#layers/shared/shared/enums'
import { PopoverArrow, PopoverAnchor } from 'reka-ui'

const user = useSupabaseUser()
const supabase = useSupabaseClient()
const router = useRouter()

const handleLogout = async () => {
  await supabase.auth.signOut()
  router.push('/login')
}

const { isFullscreen, toggle: toggleFullscreen } = useFullscreen()

const themeVariants = {
  blue: 'hsl(217.2 91.2% 59.8%)',
  slate: 'hsl(215.3 19.3% 34.5%)',
  neutral: 'hsl(0 0% 32.2%)',
}

const appSettings = useAppSettings()
const publicRuntimeConfig = useRuntimeConfig().public
const appVersion = publicRuntimeConfig.projectVersion

const themeWriteableComputedRef = computed({
  get: () => appSettings.value.theme,
  set: val => appSettings.value.theme = val,
})

const colorMode = useColorMode<keyof typeof themeVariants>({
  attribute: 'data-theme-variant',
  modes: Object.fromEntries(Object.keys(themeVariants).map(v => [v, v])),
  storageRef: themeWriteableComputedRef,
  initialValue: 'blue',
})

const pdfCropperItem = {
  title: 'PDF Cropper',
  href: '/pdf-cropper',
  icon: 'material-symbols:crop-rounded',
}

const cbtItems = [
  {
    title: 'Test Interface',
    href: '/cbt/interface',
    icon: 'line-md:computer',
  },
  {
    title: 'Test Results',
    href: '/cbt/results',
    icon: 'material-symbols:bar-chart-4-bars-rounded',
  },
  {
    title: 'Generate Answer Key',
    href: '/cbt/generate-answer-key',
    icon: 'mdi:script-text-key-outline',
  },
]

const menuItems = [
  pdfCropperItem,
  {
    title: 'CBT',
    icon: 'line-md:computer',
    content: cbtItems,
  },
]

onMounted(() => {
  triggerRef(appSettings)
})
</script>
