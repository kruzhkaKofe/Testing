<template>
  <button @click="increment" > {{ count }}</button>
</template>

<script setup lang = "ts">
import { ref } from 'vue';
const emit = defineEmits(['limit-reached']);
const count = ref(0);

const increment = () => {
  count.value++;
  if (count.value >= 10) {
    emit('limit-reached', count.value);
  }
}
</script>

Смонтировать компонент через mount (или shallowMount).
Найти кнопку и кликнуть по ней (trigger 'click'). Проверить, что текст изменился на "1".
Кликнуть 10 раз.
Проверить, что событие limit-reached было отправлено (wrapper.emitted()) и payload равен 10.
