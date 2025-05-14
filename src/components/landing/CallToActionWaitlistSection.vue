<template>
  <section id="waitlist" class="py-16 sm:py-24 bg-gradient-to-br from-primary via-secondary to-base-300">
    <div class="container mx-auto px-4 text-center">
      <div class="max-w-2xl mx-auto animate-fade-in-up">
        
        <h2 class="text-3xl sm:text-4xl font-bold text-primary-content mb-5">
          Get Early Access to Deeper Social Insights.
        </h2>

        <p class="text-lg text-primary-content/90 mb-10">
          Join the SocialSearch AI waitlist. Experience intelligent social search enhanced with rapid verification and bias-aware analysis for a clearer understanding of the digital landscape.
        </p>
        
        <WaitlistForm /> 

         <div class="mt-12 space-y-3 text-primary-content/80 text-sm text-left mx-auto">
            <p><Check class="inline w-5 h-5 mr-2 shrink-0"/> <b>For Researchers & Analysts:</b> Uncover nuanced trends and comprehensive data.</p>
            <p><Check class="inline w-5 h-5 mr-2 shrink-0"/> <b>For Journalists & Fact-Checkers:</b> Quickly verify claims and source information.</p>
            <p><Check class="inline w-5 h-5 mr-2 shrink-0"/> <b>For Strategists & Marketers:</b> Understand true sentiment and inform your campaigns.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import WaitlistForm from './WaitlistForm.vue';
import { Check } from '@iconoir/vue';
</script>