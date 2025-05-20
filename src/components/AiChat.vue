<!-- frontend/src/components/AiChat.vue -->
<script setup lang="ts">
import { ref, inject, nextTick, onMounted } from 'vue';
import axios from 'axios';
import AiAvatar from './icons/AiAvatar.vue'; // Adjust path as needed

// Inject config with fallback
const config = inject('config', { appName: 'AI Assistant' });

// Emit close event
defineEmits(['close']);

// Chat messages state
const messages = ref<{ role: 'user' | 'ai'; content: string }[]>([]);

// Typing indicator state
const isTyping = ref(false);

// User input state
const userInput = ref('');

// Backend API URL
const API_URL = import.meta.env.VITE_CHAT_API_URL;

// Scroll to bottom of chat
const scrollToBottom = () => {
  nextTick(() => {
    const chatContainer = document.querySelector('.chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  });
};

// Fetch AI response from backend
const fetchAiResponse = async (message: string, isInitial: boolean) => {
  try {
    const response = await axios.post(API_URL, {
      message,
      is_initial: isInitial,
    });
    return response.data.response;
  } catch (error) {
    console.error('Error fetching AI response:', error);
    return 'Sorry, something went wrong. Please try again.';
  }
};

// Show initial AI message with delay
onMounted(async () => {
  isTyping.value = true;
  setTimeout(async () => {
    const initialResponse = await fetchAiResponse('', true);
    messages.value.push({
      role: 'ai',
      content: initialResponse,
    });
    isTyping.value = false;
    scrollToBottom();
  }, 500); // 500ms delay
});

// Handle sending a message
const sendMessage = async () => {
  if (!userInput.value.trim()) return;

  // Add user message instantly
  messages.value.push({
    role: 'user',
    content: userInput.value,
  });

  // Clear input and scroll
  const userMessage = userInput.value;
  userInput.value = '';
  scrollToBottom();

  // Show typing indicator and fetch AI response
  isTyping.value = true;
  setTimeout(async () => {
    const aiResponse = await fetchAiResponse(userMessage, false);
    messages.value.push({
      role: 'ai',
      content: aiResponse,
    });
    isTyping.value = false;
    scrollToBottom();
  }, 500); // 500ms delay
};

// Handle Enter key press
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
};

// Debug: Log when component mounts
console.log('AiChat mounted, config:', config);
</script>

<template>
  <!-- Chat Panel -->
  <div
    class="fixed bottom-24 right-6 w-80 sm:w-96 bg-base-100 border border-base-200 rounded-lg shadow-xl z-50 animate-slide-in-bottom"
  >
    <!-- Header -->
    <div class="flex items-center justify-between p-3 border-b border-base-200">
      <div class="flex items-center">
        <AiAvatar class="w-6 h-6 text-base-content/80 mr-2" />
        <h3 class="text-lg font-medium gradient-text">{{ config.appName }}</h3>
      </div>
      <button
        class="text-base-content/60 hover:text-base-content focus:outline-none"
        @click="$emit('close')"
        aria-label="Close chat"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Messages -->
    <div class="chat-container h-64 overflow-y-auto custom-scrollbar p-3 space-y-3">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="['chat', message.role === 'user' ? 'chat-end' : 'chat-start']"
      >
        <div v-if="message.role === 'ai'" class="chat-image avatar">
          <AiAvatar class="w-5 h-5 text-base-content/80" />
        </div>
        <div
          :class="[
            'chat-bubble text-sm',
            message.role === 'user' ? 'bg-base-300 text-base-content' : 'bg-base-200 text-base-content',
            'rounded-lg px-3 py-2 max-w-[80%]',
          ]"
        >
          {{ message.content }}
        </div>
      </div>
      <!-- Typing Indicator -->
      <div v-if="isTyping" class="chat chat-start">
        <div class="chat-image avatar">
          <AiAvatar class="w-5 h-5 text-base-content/80" />
        </div>
        <div class="chat-bubble bg-base-200 text-base-content rounded-lg px-3 py-2">
          <span class="loading loading-dots loading-xs"></span>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="p-3 border-t border-base-200">
      <textarea
        v-model="userInput"
        class="w-full h-10 resize-none bg-base-100 border border-base-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
        placeholder="Type your question..."
        @keydown="handleKeydown"
      ></textarea>
    </div>
  </div>
</template>

<style scoped>
/* Slide-in Animation */
.animate-slide-in-bottom {
  animation: slide-in-bottom 0.3s ease-out;
}

@keyframes slide-in-bottom {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Chat Bubble Hover */
.chat-bubble {
  transition: background-color 0.2s ease;
}
.chat-bubble:hover {
  @apply bg-opacity-75;
}
</style>