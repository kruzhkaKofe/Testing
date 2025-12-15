<template>
  <div>
    <button @click="increase">Нажми меня!</button>

    <span class="count">{{ counter }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const counter = ref(0);

function increase() {
  counter.value++;
}
</script>

<style lang="scss" scoped></style>
