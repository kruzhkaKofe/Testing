<template>
  <input type="text" v-model="inputValue" />
  <button @click="submit">Отправить</button>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  submitForm: [payload: { email: string }];
}>();

const inputValue = ref("");

function submit(): void {
  emit("submitForm", { email: inputValue.value });
}
</script>
