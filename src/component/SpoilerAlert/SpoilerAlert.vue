<template>
  <div>
    <div v-if="isShow" class="secret"></div>
    <button @click="toggleShow">Показать секрет</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isShow = ref(false);

function toggleShow() {
  isShow.value = !isShow.value;
}
</script>
