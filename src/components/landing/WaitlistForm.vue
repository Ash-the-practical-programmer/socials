<template>
    <form @submit.prevent="handleSubmit" class="max-w-lg mx-auto">
      <div class="join w-full shadow-lg">
        <input
          type="email"
          id="email"
          v-model="email"
          required
          placeholder="Enter your email address"
          class="input input-bordered join-item w-full focus:outline-none focus:ring-offset-2 focus:ring-offset-base-100 transition-shadow duration-200 ease-in-out"
          :disabled="isSubmitting || hasSubmitted"
          aria-label="Email for waitlist"
        />
        <button
          type="submit"
          class="btn btn-accent join-item min-w-[120px]"
          :class="{ 'loading': isSubmitting }"
          :disabled="isSubmitting || hasSubmitted"
        >
          <span v-if="isSubmitting">Joining...</span>
          <span v-else-if="hasSubmitted">Welcome!</span>
          <span v-else>Join Now</span>
        </button>
      </div>
  
      <div v-if="message" role="alert" class="alert mt-4 text-sm py-2 px-3"
        :class="{ 'alert-success': messageType === 'success', 'alert-error': messageType === 'error' }">
        <!-- SVGs for icons remain the same -->
        <svg v-if="messageType === 'success'" xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <svg v-if="messageType === 'error'" xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>{{ message }}</span>
      </div>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const email = ref('');
  const isSubmitting = ref(false);
  const hasSubmitted = ref(false);
  const message = ref('');
  const messageType = ref(''); // 'success' or 'error'
  
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
      // Update the path to your new serverless function name
      const response = await fetch('/api/subscribe-mailerlite', { // <--- UPDATED PATH
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.value }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        // Use error message from serverless function if available
        throw new Error(data.error || `Server error: ${response.status}`);
      }
      
      // Handle cases where MailerLite might return 200 for an update (e.g., already exists but added to group)
      message.value = data.message || "You're on the list! We'll email you with updates. 🎉";
      messageType.value = 'success';
      hasSubmitted.value = true;
      // email.value = ''; // Optionally clear email field
    } catch (error) {
      console.error('Submission error:', error);
      message.value = error.message || 'An unexpected error occurred. Please try again.';
      messageType.value = 'error';
      hasSubmitted.value = false; // Allow retry on error
    } finally {
      isSubmitting.value = false;
    }
  };
  </script>