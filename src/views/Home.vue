<template>
    <div>
        <HeroSection />
        <ProblemSolutionSection />
        <AIChatResearchDemo />
        <CallToActionWaitlistSection />
    </div>
</template>

<script setup>
import HeroSection from '../components/landing/HeroSection.vue';
import ProblemSolutionSection from '../components/landing/ProblemSolutionSection.vue';
import AIChatResearchDemo from '../components/landing/AIChatResearchDemo.vue';
import CallToActionWaitlistSection from '../components/landing/CallToActionWaitlistSection.vue';
// No onMounted for document.title needed here if router handles it
</script>