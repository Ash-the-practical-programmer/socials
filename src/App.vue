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

<<<<<<< HEAD
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

=======
<script setup>
import { onMounted } from 'vue';
import AppHeader from './components/layout/AppHeader.vue';
import AppFooter from './components/layout/AppFooter.vue';
import HeroSection from './components/landing/HeroSection.vue';
import ProblemSolutionSection from './components/landing/ProblemSolutionSection.vue';
import AIChatResearchDemo from './components/landing/AIChatResearchDemo.vue';
import CallToActionWaitlistSection from './components/landing/CallToActionWaitlistSection.vue';

onMounted(() => {
  document.title = 'DeepSocial AI | AI-Powered Social Insights';
});
</script>

<style>
/* Add any truly global styles here if necessary, 
   but prefer main.css or component-scoped styles */
/* Ensure Inter font is loaded via index.html and applied via tailwind.config or main.css */
>>>>>>> origin/main
</style>