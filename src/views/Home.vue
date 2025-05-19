<template>
    <div>
        <HeroSection />
        <UvpSection />
        <AIChatResearchDemo />
        <AiOverlayButton />
        <CallToActionWaitlistSection />
    </div>
</template>

<script setup>
import HeroSection from '../components/landing/HeroSection.vue';
import UvpSection from '../components/landing/UvpSection.vue';
import AIChatResearchDemo from '../components/landing/AIChatResearchDemo.vue';
import AiOverlayButton from '../components/AiOverlayButton.vue';
import CallToActionWaitlistSection from '../components/landing/CallToActionWaitlistSection.vue';
// No onMounted for document.title needed here if router handles it
</script>