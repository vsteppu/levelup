<template>
<div id="turnstileContainer"/>
 </template>

<script setup>
import { onBeforeUnmount, onMounted } from 'vue';
import { useCloudflareTurnstile } from '@/stores/turnstile.js';

const { loadScript, insertWidget, removeWidget } = useCloudflareTurnstile()

onMounted( async() => {
    await loadScript()
    insertWidget()
});

onBeforeUnmount(()=>{
    removeWidget()
})
</script>
