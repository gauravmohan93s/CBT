<template>
  <div class="flex flex-col grow min-h-0 py-12 overflow-auto bg-gray-50 dark:bg-gray-900">
    <!-- Hero Section -->
    <div class="text-center space-y-8 px-4 max-w-5xl mx-auto">
      <div class="space-y-4">
        <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          <span class="text-blue-600">MockCBT</span> - Professional Online Testing Platform
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Create, manage, and take Computer Based Tests (CBT) with ease. 
          Perfect for Test Centers, Schools, and Students preparing for competitive exams.
        </p>
      </div>

      <div class="flex justify-center gap-4">
        <NuxtLink to="/login">
          <button class="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition shadow-lg">
            Get Started / Login
          </button>
        </NuxtLink>
        <NuxtLink to="/cbt/interface">
          <button class="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-bold text-lg hover:bg-blue-50 transition shadow-lg dark:bg-gray-800 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-700">
            Try Demo Test
          </button>
        </NuxtLink>
      </div>
    </div>

    <!-- Features Section -->
    <div class="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 px-4 max-w-6xl mx-auto">
      <!-- Feature 1 -->
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition">
        <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
          <Icon name="material-symbols:school-outline" class="text-blue-600 dark:text-blue-300" size="1.8rem" />
        </div>
        <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">For Students</h3>
        <p class="text-gray-600 dark:text-gray-400">
          Take real exam-like tests from anywhere. Get instant detailed analysis, performance charts, and identify weak areas immediately.
        </p>
      </div>

      <!-- Feature 2 -->
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition">
        <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
          <Icon name="material-symbols:admin-panel-settings-outline" class="text-green-600 dark:text-green-300" size="1.8rem" />
        </div>
        <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">For Test Centers</h3>
        <p class="text-gray-600 dark:text-gray-400">
          Create professional test packages from PDF files using our advanced Cropper tool. Manage students and track their progress securely.
        </p>
      </div>

      <!-- Feature 3 -->
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition">
        <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
          <Icon name="material-symbols:offline-bolt-outline" class="text-purple-600 dark:text-purple-300" size="1.8rem" />
        </div>
        <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">Offline & Online</h3>
        <p class="text-gray-600 dark:text-gray-400">
          Works seamlessly online and offline. Your data is synced when you connect, but you never stop learning even without internet.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'MockCBT - Professional Online Testing Platform',
  description: 'The best platform for Computer Based Tests. Create, Manage and Take tests with ease.'
})
</script>