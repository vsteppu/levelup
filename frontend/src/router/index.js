import routes from "./routes.js";
import { createRouter, createWebHistory } from "vue-router";
import { useAuthState } from "@/composables/auth.js";
const { isAuthenticated } = useAuthState();

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from) => {
    const authenticated = isAuthenticated();

    if ( authenticated && to.name === 'login') return { name: "home" }
    if (!authenticated && to.meta.requiresAuth === true) return { name: "login" }
});

export default router;
