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
                class="bg-blue-dark rounded px-3 py-1 mt-2 font-bold text-white"
            >
                {{ loading ? "..." : "LOGIN" }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { loginAPI } from "@/api/auth";
import { regularInputs } from "@/assets/inputs";
import { useRouter } from "vue-router";

import Logo from "@/assets/icons/logo.vue";
import CloudflareTurnstile from "@/library/cloudflare-turnstile.vue";
import { useCloudflareTurnstile } from "@/stores/turnstile.js";

const router = useRouter();
const cloudflareTurnstile = useCloudflareTurnstile();

const email = ref("daniela@gmail.com");
const password = ref("danika123.");
const loading = ref(false);

const loginHandler = async () => {
    loading.value = true;
    const token = await cloudflareTurnstile.getTurnstileToken();
    try {
        const response = await loginAPI({
            email: email.value,
            password: password.value,
            token,
        });
        console.log("response.success: ", response.success);
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
