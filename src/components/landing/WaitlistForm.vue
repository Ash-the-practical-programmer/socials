<template>
    <form @submit.prevent="handleSubmit" class="max-w-lg mx-auto">
<<<<<<< HEAD
        <div class="join w-full shadow-lg">
            <input type="email" id="email" v-model="email" required placeholder="Enter your email address"
                class="input text-[18px] input-bordered input-sm join-item w-full focus:outline-none focus:ring-offset-2 focus:ring-offset-base-100 transition-shadow duration-200 ease-in-out"
                :disabled="isSubmitting || hasSubmitted" aria-label="Email for waitlist" />
            <button type="submit" class="btn btn-sm btn-accent join-item min-w-[120px] text-[18px]"
                :class="{ 'loading': isSubmitting }" :disabled="isSubmitting || hasSubmitted">
                <span v-if="isSubmitting">Joining...</span>
                <span v-else-if="hasSubmitted">Welcome!</span>
                <span v-else>Join Now</span>
            </button>
        </div>

        <div v-if="message" role="alert" class="alert mt-4 text-sm py-2 px-3"
            :class="{ 'alert-success': messageType === 'success', 'alert-error': messageType === 'error' }">
            <!-- SVGs for icons remain the same -->
            <svg v-if="messageType === 'success'" xmlns="http://www.w3.org/2000/svg"
                class="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg v-if="messageType === 'error'" xmlns="http://www.w3.org/2000/svg"
                class="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ message }}</span>
        </div>
    </form>
</template>

<script setup lang="ts">// Add lang="ts" here
import { ref } from 'vue'
import type { Ref } from 'vue' // Import Ref type for explicit typing

// Define a type for the messageType state
type MessageType = 'success' | 'error' | ''

const email: Ref<string> = ref('')
const isSubmitting: Ref<boolean> = ref(false)
const hasSubmitted: Ref<boolean> = ref(false)
const message: Ref<string> = ref('')
const messageType: Ref<MessageType> = ref('') // Use the defined MessageType

// Define an interface for the expected error structure from the API (optional but good practice)
interface ApiError {
    error?: string;
    // Add other potential error fields if your API returns them
}

// Define an interface for the expected success structure from the API (optional)
interface ApiSuccess {
    message?: string;
    // Add other potential success fields
}

const handleSubmit = async (): Promise<void> => { // Explicitly type the return as Promise<void>
    if (!email.value || hasSubmitted.value) return

    // Basic email validation (client-side)
    if (!/^\S+@\S+\.\S+$/.test(email.value)) {
        message.value = "Please enter a valid email address."
        messageType.value = 'error'
        return
    }

    isSubmitting.value = true
    message.value = ''
    messageType.value = ''

    try {
        const response = await fetch('https://socials-waitlist.vercel.app/api/send-gmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ emails: email.value })
        })

        const data: ApiSuccess | ApiError = await response.json(); // Type the expected response data

        if (!response.ok) {
            // Check if data is an ApiError and has an error property
            const errorMessage = (data as ApiError)?.error || `Server error: ${response.status}`
            throw new Error(errorMessage)
        }

        message.value = (data as ApiSuccess)?.message || "Successfully added to waitlist!"
        messageType.value = 'success'
        hasSubmitted.value = true
    } catch (error: any) { // Catch error as 'any' or 'unknown' and then assert or check its type
        console.error('Error submitting email:', error)
        // Prefer to check error.message if it exists
        message.value = error?.message || 'Submission failed. Please try again.'
        messageType.value = 'error'
        hasSubmitted.value = false // Allow retry on error
    } finally {
        isSubmitting.value = false
    }
}
</script>
=======
      <div class="join w-full shadow-lg">
        <input
          type="email"
          id="email"
          v-model="email"
          required
          placeholder="Enter your email address"
          class="input text-[18px] input-bordered  input-sm join-item w-full focus:outline-none focus:ring-offset-2 focus:ring-offset-base-100 transition-shadow duration-200 ease-in-out"
          :disabled="isSubmitting || hasSubmitted"
          aria-label="Email for waitlist"
        />
        <button
          type="submit"
          class="btn btn-sm btn-accent join-item min-w-[120px] text-[18px]"
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
>>>>>>> origin/main
