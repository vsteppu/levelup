import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { loginAPI } from "@/api/auth";
import { useAuthState } from "@/composables/auth";
import { useCloudflareTurnstile } from "@/stores/turnstile.js";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore('authStore',()=>{
    const cloudflareTurnstile = useCloudflareTurnstile()
    const router = useRouter()
    const { isAuthenticated } = useAuthState()
    
    const authenticated = ref(isAuthenticated() || false)

    const registerUser = async (user) => {
        const token = await cloudflareTurnstile.getTurnstileToken();
        const { email, password } = user

        const response = await loginAPI({ email, password, token });
        if (response.success) router.push({ path: "/" });
        return response;
    }

    const loginUser = async (user) => {
        const token = await cloudflareTurnstile.getTurnstileToken();
        const { email, password } = user

        const response = await loginAPI({ email, password, token });
        if (response.success) {
            authenticated.value = true
            router.push({ path: "/" })
        }
        return response;
    }

    const logoutUser = () => {
        localStorage.removeItem('user')
        router.push({name: 'login'})

    }

    return {
        authenticated,
        loginUser,
        registerUser,
        logoutUser,
    };
})