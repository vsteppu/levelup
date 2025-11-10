<template>
    <div class="w-full h-screen flex justify-center">
        <cloudflare-turnstile />
        <div class="bg-light-gray w-80 p-4 my-auto flex flex-col gap-2 rounded">
            <div class="flex justify-between items-center">
                <h1 class="text-2xl font-extralight">Login</h1>
                <logo class="size-6" />
            </div>
            <div>
                <h2 class="text-xl font-thin mb-1">Email</h2>
                <input
                    type="text"
                    v-model="email"
                    placeholder="input your email"
                    :class="regularInputs"
                />
            </div>
            <div>
                <h2 class="text-xl font-thin mb-1">Password</h2>
                <input
                    type="password"
                    v-model="password"
                    placeholder="input your password"
                    :class="regularInputs"
                />
            </div>
            <button
                @click="loginHandler()"
                class="bg-blue-dark rounded mt-2 font-bold text-white flex items-center justify-center"
            >
                <LoadingIcon 
                    v-if="loading" 
                    class="size-6 my-3"
                />
                <p v-else 
                    class="my-3"
                >
                    Login
                </p>
            </button>
            <router-link 
                :to="{name: 'register'}"
                class="mx-auto text-blue-dark hover:underline"
            >
                Go to Register
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { regularInputs } from "@/assets/inputs";

import CloudflareTurnstile from "@/library/cloudflare-turnstile.vue";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "vue-router";

import Logo from "@/assets/icons/logo.vue";
import LoadingIcon from '@/assets/icons/loading.vue'

const authStore = useAuthStore();

const email = ref("vurado@gmail.com");
const password = ref("123456Aa.");
const loading = ref(false);

const loginHandler = async () => {
    loading.value = true;
    try{
        await authStore.loginUser({
            email: email.value,
            password: password.value
        })
    } catch (err) {
        throw err
    } finally {
        loading.value = false
    }
};
</script>
