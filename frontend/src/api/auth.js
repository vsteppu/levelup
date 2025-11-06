import axios from "axios";

const api = '/api'
//const api = import.meta.env.VITE_API_URL;

const registerAPI = async (user) => {
    const response = await axios.post(`${api}/register`, user)
    return response?.data
}

const loginAPI = async (user) => {
    console.log('user: ', user);
    const response = await axios.post(`${api}/login`, user)
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