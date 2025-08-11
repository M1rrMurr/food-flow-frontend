<script setup>
import { computed } from "vue";
import { ref } from "vue";

const props = defineProps({
  inputType: { type: String, default: "text" },
  id: String,
});
const model = defineModel();

const focused = ref(false);
const filled = computed(() => model.value);
</script>

<template>
  <div class="relative">
    <label
      class="absolute text-slate-600 mt-2 translate-x-2 px-1 transition-all duration-200 font-semibold"
      :class="{
        'text-amber-400': focused || filled,
        '-translate-y-4': focused || filled,
        'text-sm': focused || filled,
        'bg-amber-50': focused || filled,
      }"
      :for="id"
      ><slot
    /></label>
    <input
      @focus="
        () => {
          focused = true;
        }
      "
      @focusout="() => (focused = false)"
      :class="{ 'border-2 ': focused, 'border-amber-400': focused }"
      class="border border-amber-200 focus:outline-none rounded h-10 w-72 py-1 px-3 invalid:border-pink-600 invalid:text-pink-800 font-semibold"
      :id="id"
      v-model="model"
      :type="inputType"
    />
  </div>
</template>
