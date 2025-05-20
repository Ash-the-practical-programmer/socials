<template>
  <form @submit.prevent="handleSubmit" class="max-w-lg mx-auto">
    <div class="join w-full shadow-lg">
      <label class="w-full join-item input h-8">
        <svg class="h-[1.3em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
          </g>
        </svg>
        <input type="email" id="email" v-model="email" required placeholder="Enter your email address"
          class="input text-[18px] input-bordered input-sm join-item w-full focus:outline-none focus:ring-offset-2 focus:ring-offset-base-100 transition-shadow duration-200 ease-in-out"
          :disabled="isSubmitting || hasSubmitted" aria-label="Email for waitlist" />
      </label>
      <div class="validator-hint hidden">Enter valid email address</div>
      <button type="submit" class="btn btn-sm btn-neutral join-item min-w-[120px] text-[18px]"
        :class="{ 'loading': isSubmitting }" :disabled="isSubmitting || hasSubmitted">
        <span v-if="isSubmitting">Joining...</span>
        <span v-else-if="hasSubmitted">Welcome!</span>
        <span v-else>Join Now</span>
      </button>
    </div>

    <div v-if="message" role="alert" class="alert mt-4 text-sm py-1 px-3"
      :class="{ 'alert-success': messageType === 'success', 'alert-error': messageType === 'error' }">
      <!-- SVGs for icons remain the same -->
      <svg v-if="messageType === 'success'" xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-5 w-5"
        fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <svg v-if="messageType === 'error'" xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-5 w-5"
        fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span class="">{{ message }}</span>
    </div>
  </form>
</template>
  
<script setup>
import { ref } from 'vue';

const email = ref('');
const isSubmitting = ref(false);
const hasSubmitted = ref(false);
const message = ref('');
const messageType = ref('');

const handleSubmit = async () => {
  if (!email.value || hasSubmitted.value) return;

  if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    message.value = "Please enter a valid email address.";
    messageType.value = 'error';
    return;
  }

  isSubmitting.value = true;
  message.value = '';
  messageType.value = '';

  try {
    const response = await fetch('https://socials-waitlist.vercel.app/api/send-gmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ emails: email.value }) // ← MATCHES curl example
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `Server error: ${response.status}`);
    }

    message.value = data.message || "Successfully added to waitlist!";
    messageType.value = 'success';
    hasSubmitted.value = true;
  } catch (error) {
    console.error('Error submitting email:', error);
    message.value = error.message || 'Submission failed. Please try again.';
    messageType.value = 'error';
    hasSubmitted.value = false;
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.input {
  @apply outline-none;
}
</style>