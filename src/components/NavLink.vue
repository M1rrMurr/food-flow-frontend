<script setup>
import { RouterLink } from "vue-router";
defineProps({ to: String });
</script>
<template>
  <div class="group">
    <RouterLink class="text-2xl font-bold text-green-700" :to="to"
      ><slot
    /></RouterLink>
    <div class="h-1 w-0 bg-green-600 group-hover:w-full transition-all"></div>
  </div>
</template>
