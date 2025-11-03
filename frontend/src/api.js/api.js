import axios from "axios";

const api = '/api'

const registerAPI = async (user) => {
    const response = await axios.post(`${api}/register`, user)
    return response?.data
}

const loginAPI = async (user) => {
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