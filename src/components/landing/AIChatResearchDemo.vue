<script setup lang="ts">
import { inject } from 'vue';
import AiAvatar from '../icons/AiAvatar.vue';
const config = inject('config');
</script>

<template>
    <section class="py-16 sm:py-24 bg-base-100">
        <div class="container mx-auto px-4">
            <div class="text-center mb-12 sm:mb-16 animate-fade-in-up">
                <h2 class="text-3xl sm:text-4xl font-bold text-base-content mb-3">
                    Experience Intelligent Social Search
                </h2>
                <p class="text-lg text-base-content/80 max-w-xl mx-auto">
                    Ask complex questions, uncover nuanced trends, and verify information in real-time.
                </p>
            </div>

            <div
                class="max-w-2xl mx-auto bg-base-200 rounded-xl shadow-2xl p-4 sm:p-6 overflow-hidden animate-fade-in-up animation-delay-200">
                <div class="flex items-center mb-4 pb-3 border-b border-base-300/50">
                    <div class="avatar mr-3">
                        <AiAvatar />
                    </div>
                    <h3 class="font-semibold text-base-content text-lg">{{ config.appName }}</h3>
                </div>

                <div class="space-y-5 h-[450px] sm:h-[500px] overflow-y-auto pr-2 custom-scrollbar font-light">
                    <!-- User Message: Social Search Query -->
                    <div class="chat chat-end">
                        <div class="chat-bubble bg-base-content text-secondary-content shadow font-light">
                            What are the emerging narratives around 'AI in education' on Twitter and academic forums in
                            the last 7
                            days?
                        </div>
                    </div>

                    <!-- AI Message: Social Search Results + Initial Insights -->
                    <div class="chat chat-start">
                        <div class="chat-image avatar">
                            <AiAvatar />
                        </div>
                        <div class="chat-bubble chat-bubble-neutral text-neutral-content shadow">
                            <p class="font-medium mb-1 text-[#eaded3]">Searching across platforms for 'AI in
                                education' (last
                                7d)...</p>
                            <span class="loading loading-dots loading-sm my-1"></span>
                            <p class="mt-1">Key themes identified:</p>
                            <ul class="list-disc list-inside text-xs space-y-1 mt-1 opacity-90">
                                <li>Increased discussion on AI for personalized learning paths.</li>
                                <li>Concerns about ethical AI use and student data privacy (35% of discourse).</li>
                                <li>Debate on AI's role in creative assessments vs. plagiarism.</li>
                            </ul>
                            <p class="mt-1 text-xs opacity-70">Found 850+ relevant posts & articles. <a href="#"
                                    class="link link-info">View sources & details</a>.</p>
                        </div>
                    </div>

                    <!-- User Message: Drill down with verification aspect -->
                    <div class="chat chat-end">
                        <div class="chat-bubble bg-base-content text-secondary-content shadow">
                            Within those privacy concerns, there's a claim that a new AI tool 'EduTrack' is recording
                            student
                            keystrokes without consent. Can you verify this?
                        </div>
                    </div>

                    <!-- AI Message: Verification + Bias Flag -->
                    <div class="chat chat-start">
                        <div class="chat-image avatar">
                            <AiAvatar />
                        </div>
                        <div class="chat-bubble chat-bubble-neutral text-neutral-content shadow">
                            <p class="font-medium mb-1 text-[#eaded3]">Verifying claim about 'EduTrack'...</p>
                            <p><strong class="text-[#eaccd3]">Partially True, Lacks Context.</strong> 'EduTrack'
                                documentation mentions
                                keystroke <b>pattern</b> analysis for engagement, not content recording. However,
                                privacy policies are
                                vague.</p>
                            <p class="mt-1 text-xs"><strong class="text-[#eaccd3]">Bias Flag:</strong> Most claims
                                originate from a
                                single competitor's blog post. Seeking independent reviews and user testimonials.</p>
                            <button class="btn btn-xs btn-secondary mt-2 text-accent-content">Show Verification
                                Trail</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>