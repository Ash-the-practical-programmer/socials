// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'; // Assuming your main landing page content is here or in App.vue
import PrivacyPolicy from '../views/PrivacyPolicy.vue';
import TermsOfService from '../views/TermsOfService.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home // Or your main landing page component
    },
    {
        path: '/privacy-policy',
        name: 'PrivacyPolicy',
        component: PrivacyPolicy,
    },
    {
        path: '/terms-of-service',
        name: 'TermsOfService',
        component: TermsOfService,
    },
    // Add a catch-all for 404 if desired
    // { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/NotFoundView.vue') }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), // For Vite
    routes,
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top
        return { top: 0 }
    }
});

export default router;