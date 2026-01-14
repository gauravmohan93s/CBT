<template>
  <div class="flex flex-col grow min-h-0 py-12 overflow-auto bg-background">
    <!-- Hero Section -->
    <div class="text-center space-y-8 px-4 max-w-5xl mx-auto">
      <div class="space-y-4">
        <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground">
          <span class="text-primary">MockCBT</span> - Professional Online Testing Platform
        </h1>
        <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
          Create, manage, and take Computer Based Tests (CBT) with ease. 
          Perfect for Test Centers, Schools, and Students preparing for competitive exams.
        </p>
      </div>

      <div class="flex justify-center gap-4">
        <NuxtLink to="/login">
          <button class="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-bold text-lg hover:bg-primary/90 transition shadow-lg">
            Get Started / Login
          </button>
        </NuxtLink>
        <NuxtLink to="/cbt/interface">
          <button class="px-8 py-4 bg-card text-primary border-2 border-primary rounded-lg font-bold text-lg hover:bg-primary/5 transition shadow-lg">
            Try Demo Test
          </button>
        </NuxtLink>
      </div>
    </div>

    <!-- Features Section -->
      <div class="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 px-4 max-w-6xl mx-auto">
      <!-- Feature 1 -->
      <div class="bg-card p-6 rounded-xl shadow-md border border-border hover:shadow-lg transition">
        <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
          <Icon name="material-symbols:school-outline" class="text-primary" size="1.8rem" />
        </div>
        <h3 class="text-xl font-bold mb-2 text-foreground">For Students</h3>
        <p class="text-muted-foreground">
          Take real exam-like tests from anywhere. Get instant detailed analysis, performance charts, and identify weak areas immediately.
        </p>
      </div>

      <!-- Feature 2 -->
      <div class="bg-card p-6 rounded-xl shadow-md border border-border hover:shadow-lg transition">
        <div class="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4">
          <Icon name="material-symbols:admin-panel-settings-outline" class="text-secondary-foreground" size="1.8rem" />
        </div>
        <h3 class="text-xl font-bold mb-2 text-foreground">For Test Centers</h3>
        <p class="text-muted-foreground">
          Create professional test packages from PDF files using our advanced Cropper tool. Manage students and track their progress securely.
        </p>
      </div>

      <!-- Feature 3 -->
      <div class="bg-card p-6 rounded-xl shadow-md border border-border hover:shadow-lg transition">
        <div class="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
          <Icon name="material-symbols:offline-bolt-outline" class="text-[color:var(--help)]" size="1.8rem" />
        </div>
        <h3 class="text-xl font-bold mb-2 text-foreground">Offline & Online</h3>
        <p class="text-muted-foreground">
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
