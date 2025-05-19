<!-- src/components/AiOverlayButton.vue -->
<script setup>
import { ref } from 'vue'
import AiAvatar from './icons/AiAvatar.vue' // Adjust path as needed
import AiChat from './AiChat.vue'
// State to control chat visibility
const isChatOpen = ref(false)

// Toggle chat visibility
const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value
}
</script>

<template>
  <div>
    <!-- Fixed Circular Button -->
    <button
      class="fixed btn btn-soft bottom-6 right-6 w-[45px] h-[45px] bg-base-200 shadow-lg hover:bg-base-300 transition-all duration-300 hover:scale-110 focus:outline-none z-50 p-0"
      @click="toggleChat"
      aria-label="Open AI Chat"
    >
      <AiAvatar class="w-8 h-8 text-primary" />
    </button>

    <!-- Chat Component (Conditionally Rendered) -->
    <AiChat v-if="isChatOpen" @close="toggleChat" />
  </div>
</template>

<style scoped>
button {
  width: 40px !important;
  height: 40px !important;
  min-width: 40px !important;
  max-width: 40px !important;
}
</style>