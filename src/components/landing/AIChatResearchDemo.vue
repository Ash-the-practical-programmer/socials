<script setup lang="ts">
import { inject } from 'vue';
import AiAvatar from '../icons/AiAvatar.vue';
const config = inject('config');
</script>

<template>
    <section class="py-12 bg-base-100">
        <div class="container mx-auto px-4 sm:px-6">
            <!-- Header with Gradient Text -->
            <div class="text-center mb-8">
                <h2 class="text-3xl sm:text-4xl font-semibold gradient-text">
                    Intelligent Social Search
                </h2>
                <p class="text-base text-base-content/70 max-w-md mx-auto mt-2">
                    Ask, explore, and verify insights in real-time with AI.
                </p>
            </div>

            <!-- Chat Container -->
            <div class="max-w-2xl mx-auto bg-base-100 border border-base-200 rounded-lg shadow-sm p-4 sm:p-5">
                <!-- Chat Header -->
                <div class="flex items-center mb-4 pb-2 border-b border-base-200">
                    <div class="avatar mr-2">
                        <AiAvatar class="w-8 h-8 text-base-content/80" />
                    </div>
                    <h3 class="font-medium text-lg text-base-content">{{ config.appName }}</h3>
                </div>

                <!-- Chat Messages -->
                <div class="space-y-3 h-[400px] overflow-y-auto custom-scrollbar pr-2">
                    <!-- User Message -->
                    <div class="chat chat-end">
                        <div
                            class="chat-bubble bg-base-300 text-base-content rounded-lg px-3 py-2 max-w-xs sm:max-w-sm text-sm">
                            What are the emerging narratives around 'AI in education' on Twitter and academic forums in
                            the last 7 days?
                        </div>
                    </div>

                    <!-- AI Message -->
                    <div class="chat chat-start">
                        <div class="chat-image avatar">
                            <AiAvatar class="w-6 h-6 text-base-content/80" />
                        </div>
                        <div
                            class="chat-bubble bg-base-200 text-base-content rounded-lg px-3 py-2 max-w-xs sm:max-w-sm text-sm">
                            <p class="font-medium mb-1 gradient-text">Scanning 'AI in education' (last 7 days)...</p>
                            <span class="loading loading-dots loading-xs my-1"></span>
                            <p class="text-sm">Key themes:</p>
                            <ul class="list-disc list-inside text-xs space-y-1 mt-1">
                                <li>Personalized learning via AI is trending.</li>
                                <li>35% of posts focus on data privacy concerns.</li>
                                <li>Debate on AI in assessments vs. plagiarism.</li>
                            </ul>
                            <p class="mt-1 text-xs text-base-content/70">
                                850+ posts found. <a href="#" class="link link-primary">See sources</a>.
                            </p>
                        </div>
                    </div>

                    <!-- User Message: Verification -->
                    <div class="chat chat-end">
                        <div
                            class="chat-bubble bg-base-300 text-base-content rounded-lg px-3 py-2 max-w-xs sm:max-w-sm text-sm">
                            Is there a claim that 'EduTrack' records student keystrokes without consent? Can you verify?
                        </div>
                    </div>

                    <!-- AI Message: Verification -->
                    <div class="chat chat-start">
                        <div class="chat-image avatar">
                            <AiAvatar class="w-6 h-6 text-base-content/80" />
                        </div>
                        <div
                            class="chat-bubble bg-base-200 text-base-content rounded-lg px-3 py-2 max-w-xs sm:max-w-sm text-sm">
                            <p class="font-medium mb-1 gradient-text">Verifying 'EduTrack' claim...</p>
                            <p>
                                <strong class="text-primary">Partially True.</strong> 'EduTrack' analyzes keystroke
                                patterns for engagement, not content. Privacy policy is unclear.
                            </p>
                            <p class="mt-1 text-xs text-base-content/70">
                                <strong>Source Bias:</strong> Claim from a competitor's blog. Checking user reviews.
                            </p>
                            <button class="btn btn-xs btn-ghost text-primary mt-2 hover:bg-primary/10">
                                Verification Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* Subtle Transition for Chat Bubbles */
.chat-bubble {
    transition: background-color 0.2s ease, transform 0.2s ease;
}

.chat-bubble:hover {
    
    transform: translateY(-1px);
}
</style>