<template>
    <footer class="bg-base-200 border-t border-base-300">
        <div class="container mx-auto px-4 py-8 text-center text-base-content/70">
            <div class="mb-4">
                <router-link to="/" class="btn btn-ghost px-2 normal-case">
                    <AppLogo />
                </router-link>
            </div>
            <p class="text-sm">
                © {{ new Date().getFullYear() }} DeepSocial AI. All rights reserved.
            </p>
            <div class="mt-3 space-x-4 text-xs">
                <router-link to="/privacy-policy" class="hover:text-primary">Privacy Policy</router-link>
                <router-link to="/terms-of-service" class="hover:text-primary">Terms of Service</router-link>
            </div>
        </div>
    </footer>
</template>
  
  <script setup>
  import AppLogo from '../AppLogo.vue'
  </script>