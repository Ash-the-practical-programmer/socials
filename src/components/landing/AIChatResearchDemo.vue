<template>
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