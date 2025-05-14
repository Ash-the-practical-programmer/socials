<template>
  <section class="relative min-h-[calc(100vh-var(--header-height,80px))] flex items-center justify-center overflow-hidden py-20 px-4 text-center">
    <!-- Gradient Background (remains the same) -->
    <div class="absolute inset-0 -z-10">
      <div class="absolute inset-0 bg-gradient-to-br from-base-300 via-primary/30 to-secondary/40 opacity-70"></div>
      <div class="absolute inset-0 bg-gradient-to-tl from-base-100 via-transparent to-transparent opacity-50"></div>
    </div>

    <div class="relative z-10 animate-fade-in-up max-w-3xl mx-auto">
      <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-base-content mb-6 leading-tight">
        Navigate Social Media with
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
          Unparalleled Clarity
        </span>
      </h1>
      <p class="text-lg sm:text-xl text-base-content/80 max-w-2xl mx-auto mb-10">
        The intelligent social search AI that surfaces deep insights, verifies claims, and flags missing perspectives—all at the speed of trends.
      </p>
      
      <a href="#waitlist" class="btn btn-primary btn-lg animate-subtle-pulse hover:shadow-xl transition-shadow">
        Unlock Social Insights
      </a>
      
      <p class="mt-8 text-md font-semibold text-base-content/90 opacity-95">
        Search smarter. Understand deeper. Verify faster.
      </p>
    </div>
  </section>
</template>