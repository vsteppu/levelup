
<template>
    <input type="text" v-model="name" placeholder="input your name">
    <button @click="registerHandler" class="bg-red-600 text-amber-700">register</button>
    <div class="bg-red-300 w-9 h-9"></div>
    <br>
    <button @click="loginHandler()">LOGIN</button>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { registerAPI, userAPI, loginAPI } from '@/api/auth'

const name = ref('daniela')
const email = ref('daniela@gmail.com')
const password = ref('danika123.')

const registerHandler = async() => {
    try{
        const response = await registerAPI({
            name: name.value, 
            email: email.value, 
            password: password.value
        })
        return response
    } catch (err) {
        const error = err
        console.error('error: ', error);
    }
}

const loginHandler = async() => {
    try{
        const response = await loginAPI({
            email: email.value, 
            password: password.value
        })
        return response
    } catch (err) {
        const error = err
        console.error('error: ', error);
    }
}

onMounted(()=> userAPI({email: email.value}))
</script>