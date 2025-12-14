<template>
    <div class="container">
        <h1>Hello Vue in Vite!</h1>
        <p>{{ message }}</p>
    </div>
</template>

<script setup>
import { ref } from "vue";

const message = ref("Vue is now running in your existing Vite project.");
</script>

<style scoped>
.container {
    font-family: sans-serif;
    padding: 20px;
}
</style>
