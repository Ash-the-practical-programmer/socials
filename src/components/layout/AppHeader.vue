<template>
    <header class="sticky top-0 z-50 bg-base-200/80 backdrop-blur-md shadow-sm">
        <div class="container mx-auto px-4">
            <div class="navbar py-3">
                <div class="navbar-start">
                    <AppLogo />
                </div>
                <div class="navbar-end">
                    <a href="#waitlist" class="btn text-[17px] btn-sm btn-primary hover:shadow-lg transition-shadow">
                        Join Waitlist
                    </a>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
import AppLogo from '../AppLogo.vue';
</script>