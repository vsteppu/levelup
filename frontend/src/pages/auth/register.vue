<template>
    <div class="w-full h-screen flex justify-center">
        <cloudflare-turnstile />
        <div class="bg-light-gray w-80 p-4 my-auto flex flex-col gap-2 rounded">
            <div class="flex justify-between items-center">
                <h1 class="text-2xl font-semibold">Register</h1>
                <logo class="size-6" />
            </div>
            <div>
                <h2 class="text-xl font-thin mb-1">Name</h2>
                <input
                    type="text"
                    v-model="name"
                    placeholder="Your name"
                    :class="regularInputs"
                />
            </div>
            <div>
                <h2 class="text-xl font-thin mb-1">Email</h2>
                <input
                    type="text"
                    v-model="email"
                    placeholder="Your email"
                    :class="regularInputs"
                />
            </div>
            <div>
                <h2 class="text-xl font-thin mb-1">Password</h2>
                <input
                    type="password"
                    v-model="password"
                    placeholder="Your password"
                    :class="regularInputs"
                />
            </div>
            <div>
                <h2 class="text-xl font-thin mb-1">Confirm Password</h2>
                <input
                    type="password"
                    v-model="password"
                    placeholder="Your password"
                    :class="regularInputs"
                />
            </div>
            <button
                @click="registerHandler()"
                class="bg-blue-dark rounded mt-2 font-bold text-white flex items-center justify-center"
            >
                <LoadingIcon 
                    v-if="loading" 
                    class="size-6 my-3"
                />
                <p 
                    v-else 
                    class="my-3"
                >
                    Register
                </p>
            </button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { loginAPI, registerAPI } from "@/api/auth";
import { regularInputs } from "@/assets/inputs";
import { useRouter } from "vue-router";

import Logo from "@/assets/icons/logo.vue";
import CloudflareTurnstile from "@/library/cloudflare-turnstile.vue";
import { useCloudflareTurnstile } from "@/stores/turnstile.js";
import LoadingIcon from '@/assets/icons/loading.vue'

const router = useRouter();
const cloudflareTurnstile = useCloudflareTurnstile();

const name = ref("Vurado");
const email = ref("vurado@gmail.com");
const password = ref("123456Aa.");
const confirmPassword = ref("123456Aa.");
const loading = ref(false);

const registerHandler = async () => {
    loading.value = true;
    const token = await cloudflareTurnstile.getTurnstileToken();
    try {
        if (password.value !== confirmPassword.value) {
            console.error({message: `Passwords don't match`});
            return;
        }

        const response = await registerAPI({
            name: name.value,
            email: email.value,
            password: password.value,
            token,
        });
        
        if (response.success) {
            router.push({ path: "/" });
        }
        return response;
    } catch (err) {
        const error = err;
        console.error("error: ", error);
        loading.value = false;
    } finally {
        loading.value = false;
    }
};
</script>
