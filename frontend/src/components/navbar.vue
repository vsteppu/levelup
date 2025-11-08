
<template>
    <div class="w-full fixed bg-light-gray py-3 px-20 flex justify-between">
        <Logo 
            class="size-8"
        />
        <div 
            v-if="authenticated" 
            class="font-thin text-2xl flex items-center gap-10"
        >
            <router-link 
                :to="{ name: 'home' }"
            >
                Home
            </router-link>
            <button
                @click="logout"
            >
                <ArrowRightStartOnRectangleIcon class="size-6 cursor-pointer"/>
            </button>
        </div>
        <div 
            v-else 
            class="font-thin text-2xl flex items-center gap-10"
        >
            <router-link 
                :to="{ name: 'login' }"
            >
                Login
            </router-link>
            <router-link 
                :to="{ name: 'register'}"
            >
                Register
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth.store";

import Logo from '@/assets/icons/logo.vue'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/vue/24/outline';
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { authenticated } = storeToRefs(authStore)

const logout = async () => {
    authStore.logoutUser()
    authenticated.value = false
}

</script>