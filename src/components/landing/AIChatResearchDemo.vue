<script setup lang="ts">
import { inject } from 'vue';
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
          <div class="avatar placeholder mr-3">
            <div class="w-auto h-auto rounded-full overflow-hidden flex items-center justify-center bg-neutral pl-0.8">
              <svg class="h-8 w-8 sm:h-6 sm:w-6 p-1" viewBox="0 0 107.6923076923077 106.49572649572649"
                xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(-5.982905982905983, -7.179487179487179) scale(1.1965811965811965)"
                  fill="#F5793B">
                  <path
                    d="M81.777,46L78,29l-11,6l-2-19l-4,6L44,6L33,18l1,7l-9-5L14.407,46H5v4h9.19l0.516,2.708L17,53.473l2.842-0.947  c0.103-0.033,0.214-0.033,0.316,0L23,53.473l2.842-0.947c0.103-0.033,0.214-0.033,0.316,0l3,1c0.262,0.088,0.403,0.371,0.316,0.633  C29.404,54.367,29.209,54.5,29,54.5c-0.052,0-0.105-0.008-0.158-0.025L26,53.527l-2.842,0.947c-0.103,0.033-0.214,0.033-0.316,0  L20,53.527l-2.842,0.947c-0.103,0.033-0.214-0.033-0.316,0l-1.921-0.641L18,70l6-2l0.424,6.792L27,71l-2.422,6.25L25,84l9-1  l3.981,4.777L40,78l-0.63,11.443L44,95l8-6l2-5l8,2l2.037-6.113l-1.568-7.295l2.477,4.575L67,71l12,6l2.423-22.613l-0.265,0.088  c-0.104,0.033-0.213,0.033-0.316,0L78,53.527l-2.842,0.947c-0.104,0.033-0.213,0.033-0.316,0L72,53.527l-2.842,0.947  c-0.262,0.088-0.545-0.055-0.633-0.316c-0.087-0.262,0.055-0.545,0.316-0.633l3-1c0.104-0.033,0.213-0.033,0.316,0L75,53.473  l2.842-0.947c0.104-0.033,0.213-0.033,0.316,0L81,53.473l0.54-0.18L81.893,50H95v-4H81.777z M43.474,59.158  C43.404,59.367,43.209,59.5,43,59.5c-0.052,0-0.105-0.008-0.158-0.025L40,58.527l-2.842,0.947c-0.103,0.033-0.214-0.033-0.316,0  L34,58.527l-2.842,0.947c-0.103,0.033-0.214-0.033-0.316,0L28,58.527l-2.842,0.947c-0.264,0.089-0.545-0.055-0.632-0.316  c-0.087-0.262,0.054-0.545,0.316-0.633l3-1c0.103-0.033,0.214-0.033,0.316,0L31,58.473l2.842-0.947c0.103-0.033,0.214-0.033,0.316,0  L37,58.473l2.842-0.947c0.103-0.033,0.214-0.033,0.316,0l3,1C43.42,58.613,43.562,58.896,43.474,59.158z M52.842,54.475L50,53.527  l-2.842,0.947c-0.103,0.033-0.214-0.033-0.316,0L44,53.527l-2.842,0.947c-0.265,0.089-0.545-0.056-0.632-0.316  c-0.087-0.262,0.054-0.545,0.316-0.633l3-1c0.103-0.033,0.214-0.033,0.316,0L47,53.473l2.842-0.947c0.103-0.033,0.214-0.033,0.316,0  L53,53.473l2.842-0.947c0.104-0.033,0.213-0.033,0.316,0l3,1c0.262,0.088,0.403,0.371,0.316,0.633  C59.404,54.367,59.209,54.5,59,54.5c-0.053,0-0.105-0.008-0.158-0.025L56,53.527l-2.842,0.947  C53.055,54.508,52.945,54.508,52.842,54.475z M68.842,57.525c0.104-0.033,0.213-0.033,0.316,0l3,1  c0.262,0.088,0.403,0.371,0.316,0.633C72.404,59.367,72.209,59.5,72,59.5c-0.053,0-0.105-0.008-0.158-0.025L69,58.527l-2.842,0.947  c-0.104,0.033-0.213,0.033-0.316,0L63,58.527l-2.842,0.947c-0.104,0.033-0.213,0.033-0.316,0L57,58.527l-2.842,0.947  c-0.262,0.088-0.545-0.055-0.633-0.316c-0.087-0.262,0.055-0.545,0.316-0.633l3-1c0.104-0.033,0.213-0.033,0.316,0L60,58.473  l2.842-0.947c0.104-0.033,0.213-0.033,0.316,0L66,58.473L68.842,57.525z M18.292,46L25,23l10,5l4,11l-4-20l9-11l8,8l3,15l-1-13l7,8  l3-5l2,16l5.805-3.167L72,40l1.561-7.124L77,31l0.938,15H18.292z">
                  </path>
                  <path
                    d="M14.158,52.525c-0.103-0.033-0.214-0.033-0.316,0l-3,1c-0.262,0.088-0.403,0.371-0.316,0.633  c0.087,0.261,0.368,0.405,0.632,0.316L14,53.527l0.921,0.307l-0.215-1.126L14.158,52.525z">
                  </path>
                  <path
                    d="M84,53.527l2.842,0.947C86.895,54.492,86.947,54.5,87,54.5c0.209,0,0.404-0.133,0.475-0.342  c0.087-0.262-0.055-0.545-0.316-0.633l-3-1c-0.104-0.033-0.213-0.033-0.316,0l-2.302,0.768l-0.117,1.094L84,53.527z">
                  </path>
                </g>
              </svg>
            </div>
          </div>
          <h3 class="font-semibold text-base-content text-lg">{{ config.appName }}</h3>
        </div>

        <div class="space-y-5 h-[450px] sm:h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          <!-- User Message: Social Search Query -->
          <div class="chat chat-end">
            <div class="chat-bubble bg-base-content text-secondary-content shadow">
              What are the emerging narratives around 'AI in education' on Twitter and academic forums in the last 7
              days?
            </div>
          </div>

          <!-- AI Message: Social Search Results + Initial Insights -->
          <div class="chat chat-start">
            <div class="chat-image avatar">
              <div
                class="w-auto h-auto rounded-full overflow-hidden flex items-center justify-center bg-neutral pl-0.8">
                <svg class="h-8 w-8 sm:h-6 sm:w-6 p-1" viewBox="0 0 107.6923076923077 106.49572649572649"
                  xmlns="http://www.w3.org/2000/svg">
                  <g transform="translate(-5.982905982905983, -7.179487179487179) scale(1.1965811965811965)"
                    fill="#F5793B">
                    <path
                      d="M81.777,46L78,29l-11,6l-2-19l-4,6L44,6L33,18l1,7l-9-5L14.407,46H5v4h9.19l0.516,2.708L17,53.473l2.842-0.947  c0.103-0.033,0.214-0.033,0.316,0L23,53.473l2.842-0.947c0.103-0.033,0.214-0.033,0.316,0l3,1c0.262,0.088,0.403,0.371,0.316,0.633  C29.404,54.367,29.209,54.5,29,54.5c-0.052,0-0.105-0.008-0.158-0.025L26,53.527l-2.842,0.947c-0.103,0.033-0.214,0.033-0.316,0  L20,53.527l-2.842,0.947c-0.103,0.033-0.214-0.033-0.316,0l-1.921-0.641L18,70l6-2l0.424,6.792L27,71l-2.422,6.25L25,84l9-1  l3.981,4.777L40,78l-0.63,11.443L44,95l8-6l2-5l8,2l2.037-6.113l-1.568-7.295l2.477,4.575L67,71l12,6l2.423-22.613l-0.265,0.088  c-0.104,0.033-0.213,0.033-0.316,0L78,53.527l-2.842,0.947c-0.104,0.033-0.213,0.033-0.316,0L72,53.527l-2.842,0.947  c-0.262,0.088-0.545-0.055-0.633-0.316c-0.087-0.262,0.055-0.545,0.316-0.633l3-1c0.104-0.033,0.213-0.033,0.316,0L75,53.473  l2.842-0.947c0.104-0.033,0.213-0.033,0.316,0L81,53.473l0.54-0.18L81.893,50H95v-4H81.777z M43.474,59.158  C43.404,59.367,43.209,59.5,43,59.5c-0.052,0-0.105-0.008-0.158-0.025L40,58.527l-2.842,0.947c-0.103,0.033-0.214-0.033-0.316,0  L34,58.527l-2.842,0.947c-0.103,0.033-0.214-0.033-0.316,0L28,58.527l-2.842,0.947c-0.264,0.089-0.545-0.055-0.632-0.316  c-0.087-0.262,0.054-0.545,0.316-0.633l3-1c0.103-0.033,0.214-0.033,0.316,0L31,58.473l2.842-0.947c0.103-0.033,0.214-0.033,0.316,0  L37,58.473l2.842-0.947c0.103-0.033,0.214-0.033,0.316,0l3,1C43.42,58.613,43.562,58.896,43.474,59.158z M52.842,54.475L50,53.527  l-2.842,0.947c-0.103,0.033-0.214-0.033-0.316,0L44,53.527l-2.842,0.947c-0.265,0.089-0.545-0.056-0.632-0.316  c-0.087-0.262,0.054-0.545,0.316-0.633l3-1c0.103-0.033,0.214-0.033,0.316,0L47,53.473l2.842-0.947c0.103-0.033,0.214-0.033,0.316,0  L53,53.473l2.842-0.947c0.104-0.033,0.213-0.033,0.316,0l3,1c0.262,0.088,0.403,0.371,0.316,0.633  C59.404,54.367,59.209,54.5,59,54.5c-0.053,0-0.105-0.008-0.158-0.025L56,53.527l-2.842,0.947  C53.055,54.508,52.945,54.508,52.842,54.475z M68.842,57.525c0.104-0.033,0.213-0.033,0.316,0l3,1  c0.262,0.088,0.403,0.371,0.316,0.633C72.404,59.367,72.209,59.5,72,59.5c-0.053,0-0.105-0.008-0.158-0.025L69,58.527l-2.842,0.947  c-0.104,0.033-0.213,0.033-0.316,0L63,58.527l-2.842,0.947c-0.104,0.033-0.213,0.033-0.316,0L57,58.527l-2.842,0.947  c-0.262,0.088-0.545-0.055-0.633-0.316c-0.087-0.262,0.055-0.545,0.316-0.633l3-1c0.104-0.033,0.213-0.033,0.316,0L60,58.473  l2.842-0.947c0.104-0.033,0.213-0.033,0.316,0L66,58.473L68.842,57.525z M18.292,46L25,23l10,5l4,11l-4-20l9-11l8,8l3,15l-1-13l7,8  l3-5l2,16l5.805-3.167L72,40l1.561-7.124L77,31l0.938,15H18.292z">
                    </path>
                    <path
                      d="M14.158,52.525c-0.103-0.033-0.214-0.033-0.316,0l-3,1c-0.262,0.088-0.403,0.371-0.316,0.633  c0.087,0.261,0.368,0.405,0.632,0.316L14,53.527l0.921,0.307l-0.215-1.126L14.158,52.525z">
                    </path>
                    <path
                      d="M84,53.527l2.842,0.947C86.895,54.492,86.947,54.5,87,54.5c0.209,0,0.404-0.133,0.475-0.342  c0.087-0.262-0.055-0.545-0.316-0.633l-3-1c-0.104-0.033-0.213-0.033-0.316,0l-2.302,0.768l-0.117,1.094L84,53.527z">
                    </path>
                  </g>
                </svg>
              </div>
            </div>
            <div class="chat-bubble chat-bubble-neutral text-neutral-content shadow">
              <p class="font-medium mb-1 text-primary-content/90">Searching across platforms for 'AI in education' (last
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
              Within those privacy concerns, there's a claim that a new AI tool 'EduTrack' is recording student
              keystrokes without consent. Can you verify this?
            </div>
          </div>

          <!-- AI Message: Verification + Bias Flag -->
          <div class="chat chat-start">
            <div class="chat-image avatar">
              <div
                class="w-auto h-auto rounded-full overflow-hidden flex items-center justify-center bg-neutral pl-0.8">
                <svg class="h-8 w-8 sm:h-6 sm:w-6 p-1" viewBox="0 0 107.6923076923077 106.49572649572649"
                  xmlns="http://www.w3.org/2000/svg">
                  <g transform="translate(-5.982905982905983, -7.179487179487179) scale(1.1965811965811965)"
                    fill="#F5793B">
                    <path
                      d="M81.777,46L78,29l-11,6l-2-19l-4,6L44,6L33,18l1,7l-9-5L14.407,46H5v4h9.19l0.516,2.708L17,53.473l2.842-0.947  c0.103-0.033,0.214-0.033,0.316,0L23,53.473l2.842-0.947c0.103-0.033,0.214-0.033,0.316,0l3,1c0.262,0.088,0.403,0.371,0.316,0.633  C29.404,54.367,29.209,54.5,29,54.5c-0.052,0-0.105-0.008-0.158-0.025L26,53.527l-2.842,0.947c-0.103,0.033-0.214,0.033-0.316,0  L20,53.527l-2.842,0.947c-0.103,0.033-0.214-0.033-0.316,0l-1.921-0.641L18,70l6-2l0.424,6.792L27,71l-2.422,6.25L25,84l9-1  l3.981,4.777L40,78l-0.63,11.443L44,95l8-6l2-5l8,2l2.037-6.113l-1.568-7.295l2.477,4.575L67,71l12,6l2.423-22.613l-0.265,0.088  c-0.104,0.033-0.213,0.033-0.316,0L78,53.527l-2.842,0.947c-0.104,0.033-0.213,0.033-0.316,0L72,53.527l-2.842,0.947  c-0.262,0.088-0.545-0.055-0.633-0.316c-0.087-0.262,0.055-0.545,0.316-0.633l3-1c0.104-0.033,0.213-0.033,0.316,0L75,53.473  l2.842-0.947c0.104-0.033,0.213-0.033,0.316,0L81,53.473l0.54-0.18L81.893,50H95v-4H81.777z M43.474,59.158  C43.404,59.367,43.209,59.5,43,59.5c-0.052,0-0.105-0.008-0.158-0.025L40,58.527l-2.842,0.947c-0.103,0.033-0.214-0.033-0.316,0  L34,58.527l-2.842,0.947c-0.103,0.033-0.214-0.033-0.316,0L28,58.527l-2.842,0.947c-0.264,0.089-0.545-0.055-0.632-0.316  c-0.087-0.262,0.054-0.545,0.316-0.633l3-1c0.103-0.033,0.214-0.033,0.316,0L31,58.473l2.842-0.947c0.103-0.033,0.214-0.033,0.316,0  L37,58.473l2.842-0.947c0.103-0.033,0.214-0.033,0.316,0l3,1C43.42,58.613,43.562,58.896,43.474,59.158z M52.842,54.475L50,53.527  l-2.842,0.947c-0.103,0.033-0.214-0.033-0.316,0L44,53.527l-2.842,0.947c-0.265,0.089-0.545-0.056-0.632-0.316  c-0.087-0.262,0.054-0.545,0.316-0.633l3-1c0.103-0.033,0.214-0.033,0.316,0L47,53.473l2.842-0.947c0.103-0.033,0.214-0.033,0.316,0  L53,53.473l2.842-0.947c0.104-0.033,0.213-0.033,0.316,0l3,1c0.262,0.088,0.403,0.371,0.316,0.633  C59.404,54.367,59.209,54.5,59,54.5c-0.053,0-0.105-0.008-0.158-0.025L56,53.527l-2.842,0.947  C53.055,54.508,52.945,54.508,52.842,54.475z M68.842,57.525c0.104-0.033,0.213-0.033,0.316,0l3,1  c0.262,0.088,0.403,0.371,0.316,0.633C72.404,59.367,72.209,59.5,72,59.5c-0.053,0-0.105-0.008-0.158-0.025L69,58.527l-2.842,0.947  c-0.104,0.033-0.213,0.033-0.316,0L63,58.527l-2.842,0.947c-0.104,0.033-0.213,0.033-0.316,0L57,58.527l-2.842,0.947  c-0.262,0.088-0.545-0.055-0.633-0.316c-0.087-0.262,0.055-0.545,0.316-0.633l3-1c0.104-0.033,0.213-0.033,0.316,0L60,58.473  l2.842-0.947c0.104-0.033,0.213-0.033,0.316,0L66,58.473L68.842,57.525z M18.292,46L25,23l10,5l4,11l-4-20l9-11l8,8l3,15l-1-13l7,8  l3-5l2,16l5.805-3.167L72,40l1.561-7.124L77,31l0.938,15H18.292z">
                    </path>
                    <path
                      d="M14.158,52.525c-0.103-0.033-0.214-0.033-0.316,0l-3,1c-0.262,0.088-0.403,0.371-0.316,0.633  c0.087,0.261,0.368,0.405,0.632,0.316L14,53.527l0.921,0.307l-0.215-1.126L14.158,52.525z">
                    </path>
                    <path
                      d="M84,53.527l2.842,0.947C86.895,54.492,86.947,54.5,87,54.5c0.209,0,0.404-0.133,0.475-0.342  c0.087-0.262-0.055-0.545-0.316-0.633l-3-1c-0.104-0.033-0.213-0.033-0.316,0l-2.302,0.768l-0.117,1.094L84,53.527z">
                    </path>
                  </g>
                </svg>
              </div>
            </div>
            <div class="chat-bubble chat-bubble-neutral text-neutral-content shadow">
              <p class="font-medium mb-1 text-primary-content/90">Verifying claim about 'EduTrack'...</p>
              <p><strong class="text-warning">Partially True, Lacks Context.</strong> 'EduTrack' documentation mentions
                keystroke <b>pattern</b> analysis for engagement, not content recording. However, privacy policies are
                vague.</p>
              <p class="mt-1 text-xs"><strong class="text-warning">Bias Flag:</strong> Most claims originate from a
                single competitor's blog post. Seeking independent reviews and user testimonials.</p>
              <button class="btn btn-xs btn-accent mt-2 text-accent-content">Show Verification Trail</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template><template>
    <section class="py-16 sm:py-24 bg-base-100">
        <div class="container mx-auto px-4">
            <div class="text-center mb-12 sm:mb-16 animate-fade-in-up">
                <h2 class="text-3xl sm:text-4xl font-bold text-base-content mb-3">
                    Interact with the Truth Engine
                </h2>
                <p class="text-lg text-base-content/80 max-w-xl mx-auto">
                    Ask a question or submit a claim for quick analysis.
                </p>
            </div>

            <div
                class="max-w-2xl mx-auto bg-base-200 rounded-xl shadow-2xl p-4 sm:p-6 overflow-hidden animate-fade-in-up animation-delay-200">
                <!-- Chat Header -->
                <div class="flex items-center mb-4 pb-3 border-b border-base-300/50">
                    <!-- Use AiAvatar for the header too, or a simplified version if preferred -->
                    <div class="avatar mr-3">
                        <AiAvatar /> <!-- Using the new component -->
                    </div>
                    <h3 class="font-semibold text-base-content text-lg">TruthEngine AI Assistant</h3>
                </div>

                <!-- Chat Messages Area -->
                <div ref="chatContainer"
                    class="space-y-5 h-[350px] sm:h-[400px] overflow-y-auto pr-2 mb-4 custom-scrollbar">
                    <div v-for="(message, index) in chatHistory" :key="index" class="chat"
                        :class="message.role === 'user' ? 'chat-end' : 'chat-start'">
                        <div v-if="message.role === 'ai'" class="chat-image avatar">
                            <AiAvatar /> <!-- Using the new component for AI messages -->
                        </div>
                        <div class="chat-bubble shadow max-w-md" :class="{
                            'chat-bubble-secondary text-secondary-content': message.role === 'user',
                            'chat-bubble-neutral text-neutral-content': message.role === 'ai' && message.status !== 'error',
                            'chat-bubble-error text-error-content': message.role === 'ai' && message.status === 'error'
                        }">
                            <span v-if="message.status === 'loading'" class="loading loading-dots loading-sm"></span>
                            <div v-else v-html="formatMessageContent(message.content)"></div>
                        </div>
                    </div>
                    <div v-if="isLoading && !chatHistory.some(m => m.status === 'loading')" class="chat chat-start">
                        <div class="chat-image avatar">
                            <AiAvatar /> <!-- Using the new component -->
                        </div>
                        <div class="chat-bubble chat-bubble-neutral text-neutral-content shadow opacity-70 italic">
                            <span class="loading loading-dots loading-sm"></span>
                        </div>
                    </div>
                </div>

                <!-- Chat Input Area (remains the same) -->
                <form @submit.prevent="handleSendMessage" class="flex items-center gap-2">
                    <input type="text" v-model="userInput" placeholder="Ask about a claim or topic..."
                        class="input input-bordered input-primary w-full focus:outline-none focus:ring-1 focus:ring-primary"
                        :disabled="isLoading" />
                    <button type="submit" class="btn btn-primary" :class="{ 'loading': isLoading }"
                        :disabled="isLoading || !userInput.trim()">
                        <span v-if="!isLoading">Send</span>
                    </button>
                </form>
                <p v-if="apiError" class="text-error text-xs mt-2 text-center">{{ apiError }}</p>

            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import type { Ref } from 'vue';
import DOMPurify from 'dompurify';
import AiAvatar from '../icons/AiAvatar.vue'; // Adjust path if needed

interface ChatMessage {
    role: 'user' | 'ai';
    content: string;
    status?: 'loading' | 'error' | 'ok';
}

const userInput: Ref<string> = ref('');
const chatHistory: Ref<ChatMessage[]> = ref([
    { role: 'ai', content: "Hi! Ask me about a social media claim or a topic you'd like analyzed.", status: 'ok' }
]);
const isLoading: Ref<boolean> = ref(false);
const apiError: Ref<string | null> = ref(null);
const chatContainer: Ref<HTMLElement | null> = ref(null);

const scrollToBottom = async () => {
    await nextTick();
    if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
};

const formatMessageContent = (content: string): string => {
    let processedContent = content.replace(/\n/g, '<br />');
    processedContent = processedContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    processedContent = processedContent.replace(/\*(.*?)\*/g, '<em>$1</em>');
    return DOMPurify.sanitize(processedContent, {
        USE_PROFILES: { html: true },
        ALLOWED_TAGS: ['strong', 'em', 'br', 'p', 'ul', 'ol', 'li', 'b', 'i'],
        ALLOWED_ATTR: []
    });
};

const handleSendMessage = async (): Promise<void> => {
    const currentInput = userInput.value.trim();
    if (!currentInput || isLoading.value) return;

    chatHistory.value.push({ role: 'user', content: currentInput, status: 'ok' });
    userInput.value = '';
    isLoading.value = true;
    apiError.value = null;
    scrollToBottom();

    chatHistory.value.push({ role: 'ai', content: 'Thinking...', status: 'loading' });
    scrollToBottom();

    try {
        const promptForApi = `As an AI Truth Engine analyzing social media content, critically analyze the following input.
      If it's a claim, assess its likely validity with brief reasoning and flag potential biases or missing perspectives.
      If it's a topic, provide a concise, balanced overview.
      Input: "${currentInput}"`;

        const response = await fetch('/api/ask-gemini', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: promptForApi }),
        });

        const data = await response.json();
        const loadingIndex = chatHistory.value.findIndex(m => m.status === 'loading');
        if (loadingIndex !== -1) chatHistory.value.splice(loadingIndex, 1);

        if (!response.ok) throw new Error(data.error || `Server error: ${response.status}`);
        chatHistory.value.push({ role: 'ai', content: data.reply || "Sorry, I couldn't generate a response.", status: 'ok' });

    } catch (error: any) {
        console.error('Error sending message:', error);
        apiError.value = error.message || 'Failed to get a response.';
        const loadingIndex = chatHistory.value.findIndex(m => m.status === 'loading');
        if (loadingIndex !== -1) {
            chatHistory.value[loadingIndex] = { role: 'ai', content: apiError.value, status: 'error' };
        } else {
            chatHistory.value.push({ role: 'ai', content: apiError.value, status: 'error' });
        }
    } finally {
        isLoading.value = false;
        scrollToBottom();
    }
};
</script>

<style scoped>
/* Styles remain the same */
.animation-delay-200 {
    animation-delay: 0.2s;
}

.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: var(--fallback-b2, oklch(var(--b2) / 1));
    border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: var(--fallback-a, oklch(var(--a) / 1));
    border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: var(--fallback-ac, oklch(var(--ac) / 1));
}

.chat-bubble {
    word-wrap: break-word;
    overflow-wrap: break-word;
}
</style>