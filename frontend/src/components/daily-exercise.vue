<template>
    <div
        class="w-full flex-col justify-between items-center bg-light-gray"
    >
        <h1>Daily exercise</h1>
        <div 
            v-for="exercise in exercises"
            class=" flex justify-between"
        >
            <p>{{ sanitizetext(exercise?.name) }}</p>
            {{ exercise?.value }} km
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const sanitizetext = (text) => {
    return (text[0].toUpperCase() + text.slice(1)).replace('_', ' ')
}

const exercises = computed(() => user.value?.daily_exercise)
console.log('exercises: ', exercises.value.squats);
</script>