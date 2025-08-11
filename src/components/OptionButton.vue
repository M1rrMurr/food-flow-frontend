<script setup>
const props = defineProps({ name: Number | String, id: Number });
const model = defineModel();
</script>

<template>
  <button
    @click="model = id"
    class="w-full bg-lime-100 text-lime-500 px-3 py-1"
  >
    {{ name }}
  </button>
</template>
