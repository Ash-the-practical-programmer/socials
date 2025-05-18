<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />
    <main class="flex-grow">
      <HeroSection />
      <ProblemSolutionSection />
      <AIChatResearchDemo />
      <CallToActionWaitlistSection />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import HeroSection from './components/landing/HeroSection.vue'
import ProblemSolutionSection from './components/landing/ProblemSolutionSection.vue'
import AIChatResearchDemo from './components/landing/AIChatResearchDemo.vue'
import CallToActionWaitlistSection from './components/landing/CallToActionWaitlistSection.vue'

onMounted(() => {
  document.title = 'DeepSocial AI | AI-Powered Social Insights'
})
</script>

<style>

</style>