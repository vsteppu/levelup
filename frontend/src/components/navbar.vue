
<template>
    <div class="w-full fixed bg-light-gray py-3 px-20 flex justify-between">
        <Logo class="size-8"/>
        <div class="font-thin text-2xl flex items-center gap-10">
            <router-link :to="{ name: 'login' }">Login</router-link>
            <router-link :to="{ name: 'register' }">Register</router-link>
            <Bars2Icon class="size-6"/>
        </div>
    </div>
</template>

<script setup>
import Logo from '@/assets/icons/logo.vue'
import { Bars2Icon } from '@heroicons/vue/24/outline';
</script>