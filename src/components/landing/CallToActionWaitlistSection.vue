<template>
    <section id="waitlist" class="py-16 sm:py-24 bg-gradient-to-br from-primary via-secondary to-base-300">
      <div class="container mx-auto px-4 text-center">
        <div class="max-w-2xl mx-auto animate-fade-in-up">
          <h2 class="text-3xl sm:text-4xl font-bold text-primary-content mb-6">
            Ready to Transform Your Social Research?
          </h2>
          <p class="text-lg text-primary-content/90 mb-10">
            Join our exclusive waitlist to get early access to SocialAI Research Assistant. Be among the first to experience the future of social media intelligence.
          </p>
          
          <WaitlistForm />
  
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import WaitlistForm from './WaitlistForm.vue';
  </script>