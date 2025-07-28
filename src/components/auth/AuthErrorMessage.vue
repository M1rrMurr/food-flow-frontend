<script setup>
const propst = defineProps({ message: String });
</script>

<template>
  <div class="text-red-500 font-semibold text-xs">{{ message }}</div>
</template>
