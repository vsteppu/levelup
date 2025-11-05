import LoginPage from '@/pages/auth/login.vue'
import RegisterPage from '@/pages/auth/register.vue'

const routes = [
    { 
        path: '/login', 
        component: LoginPage 
    },
    {
        path: '/register', 
        component: RegisterPage 
    },
]

export default routes