<script setup>
const props = defineProps({ inputType: String, id: String });
const model = defineModel();
</script>

<template>
  <div class="">
    <label :for="id"><slot /></label>
    <input :id="id" v-model="model" :type="inputType" />
  </div>
</template>
