<template>
    <section class="py-16 sm:py-24 bg-base-200">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12 sm:mb-16 animate-fade-in-up animation-delay-200">
          <h2 class="text-3xl sm:text-4xl font-bold text-base-content mb-4">
            Tired of Drowning in Social Data?
          </h2>
          <p class="text-lg text-base-content/80 max-w-3xl mx-auto">
            Manual social media analysis is time-consuming, overwhelming, and often misses the bigger picture. SocialAI Research cuts through the noise.
          </p>
        </div>
  
        <div class="grid md:grid-cols-3 gap-6 sm:gap-8">
          <!-- Feature Card 1 -->
          <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow animate-fade-in-up animation-delay-300">
            <figure class="px-10 pt-10">
              <!-- Placeholder Icon - Replace with an actual SVG or relevant image -->
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16 text-primary">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </figure>
            <div class="card-body items-center text-center">
              <h3 class="card-title text-base-content">Automated Trend Discovery</h3>
              <p class="text-base-content/70 text-sm">Identify emerging topics and conversations before they go mainstream. Stay ahead of the curve.</p>
            </div>
          </div>
  
          <!-- Feature Card 2 -->
          <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow animate-fade-in-up animation-delay-400">
            <figure class="px-10 pt-10">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16 text-secondary">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
            </figure>
            <div class="card-body items-center text-center">
              <h3 class="card-title text-base-content">Deep Sentiment Analysis</h3>
              <p class="text-base-content/70 text-sm">Understand the nuances of public opinion and emotion around any topic, brand, or event.</p>
            </div>
          </div>
  
          <!-- Feature Card 3 -->
          <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow animate-fade-in-up animation-delay-500">
            <figure class="px-10 pt-10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16 text-accent">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 12h9.75M10.5 18h9.75M3.75 6H6m-2.25 6H6m-2.25 6H6M3.75 12H6m-2.25 6H6" />
              </svg>
            </figure>
            <div class="card-body items-center text-center">
              <h3 class="card-title text-base-content">Actionable Summaries</h3>
              <p class="text-base-content/70 text-sm">Get concise, AI-generated reports and data visualizations that are easy to understand and share.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <style scoped>
  /* For staggered animations */
  .animation-delay-200 { animation-delay: 0.2s; }
  .animation-delay-300 { animation-delay: 0.3s; }
  .animation-delay-400 { animation-delay: 0.4s; }
  .animation-delay-500 { animation-delay: 0.5s; }
  </style>