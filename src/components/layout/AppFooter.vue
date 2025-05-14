<template>
  <footer class="bg-base-200 border-t border-base-300">
    <div class="container mx-auto px-4 py-8 text-center text-base-content/70">
      <div class="mb-4">
        <AppLogo />
      </div>
      <p class="text-sm">
        © {{ new Date().getFullYear() }} SocialSearch AI. All rights reserved.
      </p>
      <p class="text-xs mt-2 opacity-80">
        Intelligent Social Search. Verified Insights.
      </p>
      <div class="mt-3 space-x-4 text-xs">
        <a href="#" class="hover:text-primary">Privacy Policy</a>
        <a href="#" class="hover:text-primary">Terms of Service</a>
      </div>
    </div>
  </footer>
</template>