
<template>
    <button 
        @click="loginHandler()" 
        :class="'w-4 border-l-gray-800'"
    >
        {{ text }}
    </button>
</template>

<script setup>
import { ref, toRefs } from 'vue'

const props = defineProps({
    text:{
        type: String,
        default: 'Button'
    }
})
const { text } = toRefs(props)

const email = ref('daniela@gmail.com')
const password = ref('danika123.')

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
</script>