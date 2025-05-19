<template>
    <section
        class="relative min-h-[calc(100vh-var(--header-height,80px))] flex items-center justify-center overflow-hidden py-20 px-4 text-center">
        <!-- Gradient Background -->
        <div class="absolute inset-0 -z-10">
            <div class="absolute inset-0 bg-gradient-to-br from-base-300 via-primary/30 to-secondary/40 opacity-70">
            </div>
            <div class="absolute inset-0 bg-gradient-to-tl from-base-100 via-transparent to-transparent opacity-50">
            </div>
            <!-- You can add more layers or subtle patterns here -->
        </div>

        <div class="relative z-10 animate-fade-in-up max-w-3xl mx-auto">
            <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-base-content mb-6 leading-tight">
                Unlock Social Insights with
                <span class="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
                    AI-Powered Research
                </span>
            </h1>
            <p class="text-lg sm:text-xl text-base-content/80 max-w-2xl mx-auto mb-10">
                Your intelligent assistant for navigating the complex world of social media data. Discover trends,
                understand sentiment, and get actionable insights, effortlessly.
            </p>

            <a href="#waitlist"
                class="btn btn-primary btn-sm text-[19px] animate-subtle-pulse hover:shadow-xl transition-shadow">
                Join the Early Access Waitlist
            </a>

            <p class="mt-6 text-sm text-base-content/70 opacity-90">
                Be the first to revolutionize your social media research.
            </p>
        </div>
    </section>
</template>
  
  <script setup>
  // No script logic needed for this component yet
  // --header-height can be set via JS if header height is dynamic, for now using a default guess
  </script>