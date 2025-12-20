<template>
	<div class="card">
	  <img
			v-if="props.avatarUrl"
			:src="props.avatarUrl"
			class="avatar"
		>
		<div class="avatar-placeholder"></div>
		<h2>{{ props.name }}</h2>
		<p class="role">{{ props.role }}</p>
	</div>
</template>

<script setup lang="ts">

const props = defineProps<{
  name: string;
  role: string;
  avatarUrl?: string;
}>();
</script>
