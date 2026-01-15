import tailwindVitePlugin from '@tailwindcss/vite'
import packageJson from './package.json'

const enableSeoModules = import.meta.env.DISABLE_SEO_MODULES === 'true' ? false : true

export default defineNuxtConfig({
  extends: ['../shared'],
  modules: ['@nuxtjs/robots', '@nuxtjs/sitemap', 'nuxt-og-image', '@nuxtjs/supabase'],
  $meta: {
    name: 'web',
    title: 'MockCBT',
  },
  pages: true,
  css: ['~/assets/css/main.css'],
  site: {
    url: 'https://mockcbt.vercel.app',
  },
  runtimeConfig: {
    public: {
      isBackupWebsite: '',
      isBuildForWebsite: '',
      projectVersion: packageJson.version,
    },
  },
  supabase: {
    redirect: false,
  },
  srcDir: 'app',
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2026-01-13',
  vite: {
    define: {
      'import.meta.env.PROJECT_VERSION': `"${packageJson.version}"`,
    },
    plugins: [tailwindVitePlugin()],
  },
  icon: {
    clientBundle: {
      scan: {
        globInclude: ['../shared/**/*.vue', '../web/**/*.vue'],
        globExclude: ['../*/node_modules/**', '../*/dist*/**'],
      },
    },
  },
  ogImage: {
    enabled: enableSeoModules,
  },
  robots: {
    enabled: enableSeoModules,
  },
  sitemap: {
    enabled: enableSeoModules,
  },
})
