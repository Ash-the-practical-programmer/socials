<template>
    <section class="py-16 sm:py-24 bg-base-200">
        <div class="container mx-auto px-4">
            <div class="text-center mb-12 sm:mb-16 animate-fade-in-up animation-delay-200">
                <h2 class="text-3xl sm:text-4xl font-bold text-base-content mb-4">
                    Tired of Drowning in Social Data?
                </h2>
                <p class="text-lg text-base-content/80 max-w-3xl mx-auto">
                    Manual social media analysis is time-consuming, overwhelming, and often misses the bigger picture.
                    DeepSocial AI cuts through the noise.
                </p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                <!-- Feature 1: Real-time Social Search -->
                <div
                    class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow transform hover:-translate-y-1 animate-fade-in-up animation-delay-300">
                    <figure class="px-10 pt-10">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-16 h-16 text-primary">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6" />
                        </svg>
                    </figure>
                    <div class="card-body items-center text-center">
                        <h3 class="card-title text-base-content">Real-time Social Search</h3>
                        <p class="text-base-content/70 text-sm">Instantly tap into breaking trends and conversations
                            across Twitter, Reddit, TikTok, and more.</p>
                    </div>
                </div>

                <!-- Feature 2: Bias-Aware Insights -->
                <div
                    class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow transform hover:-translate-y-1 animate-fade-in-up animation-delay-400">
                    <figure class="px-10 pt-10">
                        <!-- Option 6: Network with Unique Node -->
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-16 h-16 text-secondary">
                            <circle cx="12" cy="12" r="2.25" stroke-width="1.5" />
                            <circle cx="6.5" cy="7.5" r="1.5" opacity="0.6" />
                            <circle cx="17.5" cy="7.5" r="1.5" opacity="0.6" />
                            <circle cx="6.5" cy="16.5" r="1.5" opacity="0.6" />
                            <circle cx="17.5" cy="16.5" r="1.5" fill="currentColor" opacity="0.8" />
                            <!-- Highlighted different node -->
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 12L6.5 7.5M12 12L17.5 7.5M12 12L6.5 16.5M12 12L17.5 16.5" opacity="0.5" />
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M6.5 7.5L17.5 16.5M17.5 7.5L6.5 16.5" opacity="0.3" />
                        </svg>
                    </figure>
                    <div class="card-body items-center text-center">
                        <h3 class="card-title text-base-content">Bias-Aware Insights</h3>
                        <p class="text-base-content/70 text-sm">Go beyond surface sentiment. Our AI actively flags
                            missing perspectives in discussions.</p>
                    </div>
                </div>

                <!-- Feature 3: Multimodal Verification -->
                <div
                    class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow transform hover:-translate-y-1 animate-fade-in-up animation-delay-500">
                    <figure class="px-10 pt-10">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-16 h-16 text-accent">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.432 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        </svg>
                    </figure>
                    <div class="card-body items-center text-center">
                        <h3 class="card-title text-base-content">Multimodal Verification</h3>
                        <p class="text-base-content/70 text-sm">Rapidly fact-check text, images, deepfakes, and audio
                            within social content.</p>
                    </div>
                </div>

                <!-- Feature 4: Transparent & Actionable -->
                <div
                    class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow transform hover:-translate-y-1 animate-fade-in-up animation-delay-600">
                    <figure class="px-10 pt-10">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-16 h-16 text-info">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M10.5 6h9.75M10.5 12h9.75M10.5 18h9.75M3.75 6H6m-2.25 6H6m-2.25 6H6M3.75 12H6m-2.25 6H6" />
                        </svg>
                    </figure>
                    <div class="card-body items-center text-center">
                        <h3 class="card-title text-base-content">Transparent & Actionable</h3>
                        <p class="text-base-content/70 text-sm">Understand <b>how</b> insights are derived and claims
                            verified, empowering confident decisions.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
</script>