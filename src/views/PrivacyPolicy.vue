<template>
    <div class="container mx-auto px-4 py-8 sm:py-12 prose prose-invert max-w-3xl">
        <h1>Privacy Policy for DeepSocial AI</h1>
        <p>Last updated: [Date]</p>

        <p>Welcome to DeepSocial AI ("us", "we", or "our"). We are committed to protecting your personal information
            and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices
            with regards to your personal information, please contact us at [Your Contact Email].</p>

        <h2>1. INFORMATION WE COLLECT</h2>
        <p>As a user of our waitlist or future services, we may collect the following information:</p>
        <ul>
            <li><strong>Email Address:</strong> When you sign up for our waitlist.</li>
            <li><strong>Usage Data:</strong> Information on how the Service is accessed and used (e.g., IP address,
                browser type, browser version, the pages of our Service that you visit, the time and date of your visit,
                the time spent on those pages, unique device identifiers and other diagnostic data) once the service is
                live.</li>
            <!-- Add more as your app develops -->
        </ul>

        <h2>2. HOW WE USE YOUR INFORMATION</h2>
        <p>We use the information we collect in various ways, including to:</p>
        <ul>
            <li>Provide, operate, and maintain our waitlist and future Service</li>
            <li>Notify you about changes to our Service</li>
            <li>Allow you to participate in interactive features of our Service when you choose to do so</li>
            <li>Provide customer support</li>
            <li>Gather analysis or valuable information so that we can improve our Service</li>
            <li>Monitor the usage of our Service</li>
            <li>Detect, prevent and address technical issues</li>
            <li>Send you updates and marketing communications if you have opted in.</li>
        </ul>

        <!-- Add sections for: -->
        <!-- 3. SHARING YOUR INFORMATION -->
        <!-- 4. DATA RETENTION -->
        <!-- 5. DATA SECURITY -->
        <!-- 6. YOUR DATA PROTECTION RIGHTS (e.g., GDPR, CCPA if applicable) -->
        <!-- 7. COOKIES AND TRACKING TECHNOLOGIES -->
        <!-- 8. CHILDREN'S PRIVACY -->
        <!-- 9. CHANGES TO THIS PRIVACY POLICY -->
        <!-- 10. CONTACT US -->

        <h2>10. CONTACT US</h2>
        <p>If you have any questions about this Privacy Policy, please contact us:</p>
        <p>By email: [Your Contact Email]</p>
        <!-- Add other contact methods if applicable -->
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
onMounted(() => {
    document.title = 'Privacy Policy - DeepSocial AI';
});
</script>

<style scoped>
/* Use Tailwind's prose plugin for nice typography on content pages */
/* Ensure you have @tailwindcss/typography installed and configured in tailwind.config.js */
/* If not using prose, style h1, p, ul, etc. manually or with utility classes */
.prose h1,
.prose h2 {
    color: var(--fallback-nc, oklch(var(--nc) / 1));
    /* Use DaisyUI neutral-content or similar for headings */
}
</style>