import Home from '@/pages/home.vue'
import LoginPage from '@/pages/auth/login.vue'
import RegisterPage from '@/pages/auth/register.vue'

const routes = [
    {
        path: '/', 
        component: Home,
        name: 'home',
        meta: { requiresAuth: true }
    },
    { 
        path: '/login', 
        component: LoginPage,
        name: 'login',
        meta: { requiresAuth: false }
    },
    {
        path: '/register', 
        component: RegisterPage,
        name: 'register',
        meta: { requiresAuth: false }
    },
]

export default routes