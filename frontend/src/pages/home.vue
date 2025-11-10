<template>
    <div class="w-full h-screen flex justify-center items-center">
        <div class="p-3 w-2/3 flex text-4xl flex-col font-extralight justify-center items-center bg-zinc-400">
            <Logo class="size-18 mb-14"/>
            <DailyExercise/>
        </div>
    </div>
</template>

<script setup>
import DailyExercise from '@/components/daily-exercise.vue'

</script>