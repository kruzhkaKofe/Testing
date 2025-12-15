<template>
  <p class="message">
    {{ message }}
  </p>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  name?: string;
}>()

const message = computed<string>(() => {
  return `Привет, ${props.name ?? 'гость'}!`;
})
</script>


<style lang="scss" scoped></style>
