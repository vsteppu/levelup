import axios from "axios";
import { useAuthState } from '@/composables/auth.js'

const api = import.meta.env.VITE_API_URL || '/api'
const { setUser } = useAuthState()

const registerAPI = async (user) => {
    const response = await axios.post(`${api}/register`, user)
    return response?.data
}

const loginAPI = async (user) => {
    const response = await axios.post(`${api}/login`, user)
    if (response?.data?.success) { 
        setUser(response?.data)
    }
    return response?.data
}

const userAPI = async (user) => {
    const response = await axios.post(`${api}/user`, user)
    return response?.data
}


export {
    registerAPI,
    loginAPI,
    userAPI,
}