<template>
  <ul v-if="users && users.length">
    <li v-for="user in users">
      {{ user }}
    </li>
  </ul>

  <div v-for="user in users">
    {{ user }}
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';

const users = ref<string[] | null>(null);

async function fetchUsers() {
  const response = await axios.get('/api/users');

  users.value = response as any;
}

onMounted(fetchUsers);
</script>
